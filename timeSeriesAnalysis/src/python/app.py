import numpy as np
from scipy.interpolate import BSpline, splrep
import plotly.graph_objects as go
import dash
from dash import dcc, html
from dash.dependencies import Input, Output, State
import dash_bootstrap_components as dbc
import pandas as pd
import flask
import os

# Get the absolute path to the dist directory
current_dir = os.path.dirname(os.path.abspath(__file__))
dist_path = os.path.join(os.path.dirname(os.path.dirname(current_dir)), 'dist')
print(f"Static files directory: {dist_path}")

# Initialize Flask server and configure it to serve the React app
server = flask.Flask(__name__)
server.static_folder = dist_path

# Initialize the Dash app with dark theme and use the Flask server
app = dash.Dash(__name__,
                server=server,
                external_stylesheets=[dbc.themes.DARKLY],
                url_base_pathname='/dashboard/')

# Define the layout
app.layout = dbc.Container([
    dbc.NavbarSimple(
        brand="Time Series Analysis",
        brand_style={'color': '#3aa5ff'},  # Match the blue from welcome screen
        dark=True,
        color='#030a17',  # Match deep blue from welcome screen
    ),

    dbc.Row([
        # Sidebar
        dbc.Col([
            html.Div([
                html.H4("Parameters", style={'color': '#46e991', 'marginTop': '20px'}),
                # Match green from welcome screen
                dcc.Slider(
                    id='num-curves',
                    min=10,
                    max=200,
                    step=1,
                    value=80,
                    marks={i: str(i) for i in [10, 50, 100, 150, 200]},
                    tooltip={'placement': 'bottom'},
                ),
                html.Label("Number of Curves", style={'color': 'white', 'marginTop': '10px'}),

                dcc.Slider(
                    id='noise-level',
                    min=0.1,
                    max=1.0,
                    step=0.1,
                    value=0.5,
                    marks={i / 10: str(i / 10) for i in range(1, 11)},
                    tooltip={'placement': 'bottom'},
                ),
                html.Label("Noise Level", style={'color': 'white', 'marginTop': '10px'}),

                dcc.Slider(
                    id='nbasis',
                    min=10,
                    max=50,
                    step=1,
                    value=20,
                    marks={i: str(i) for i in [10, 20, 30, 40, 50]},
                    tooltip={'placement': 'bottom'},
                ),
                html.Label("Number of Basis Functions", style={'color': 'white', 'marginTop': '10px'}),

                dbc.Button(
                    "Generate New Data",
                    id='generate-data',
                    color='primary',  # Will use the theme's primary color
                    className='mt-3',
                ),

                html.Hr(style={'borderColor': '#3aa5ff'}),  # Match blue from welcome screen

                html.H4("Analysis Options", style={'color': '#46e991'}),  # Match green from welcome screen
                dbc.Checkbox(
                    id='show-noisy',
                    label="Show Noisy Data",
                    value=True,
                    style={'color': 'white'}
                ),
                dbc.Checkbox(
                    id='show-smooth',
                    label="Show Smoothed Curves",
                    value=True,
                    style={'color': 'white'}
                ),

                html.Div([
                    dbc.Button(
                        "Back to Welcome Screen",
                        id='back-button',
                        color='secondary',
                        className='mt-4',
                        href='/',
                    ),
                ], className='mt-auto')

            ], style={
                'backgroundColor': '#0d1c3f',  # Match navy from welcome screen
                'padding': '20px',
                'borderRadius': '5px',
                'height': '100%',
                'display': 'flex',
                'flexDirection': 'column'
            }),
        ], width=3),

        # Main Panel
        dbc.Col([
            dcc.Graph(
                id='time-series-plot',
                style={'height': '400px'},
                config={'displayModeBar': False}
            ),
            dcc.Graph(
                id='smoothed-plot',
                style={'height': '400px'},
                config={'displayModeBar': False}
            ),
        ], width=9),
    ]),
], fluid=True, style={'backgroundColor': '#030a17', 'minHeight': '100vh'})  # Match deep blue from welcome screen


# Callback to generate and update data
@app.callback(
    [Output('time-series-plot', 'figure'),
     Output('smoothed-plot', 'figure')],
    [Input('generate-data', 'n_clicks'),
     Input('num-curves', 'value'),
     Input('noise-level', 'value'),
     Input('nbasis', 'value'),
     Input('show-noisy', 'value'),
     Input('show-smooth', 'value')],
    prevent_initial_call=False
)
def update_plots(n_clicks, num_curves, noise_level, nbasis, show_noisy, show_smooth):
    # Generate time points
    n = 500
    time = np.linspace(0, 2 * np.pi, n)

    # Generate base sine wave
    base_sine = np.sin(time)

    # Generate noisy curves
    noisy_curves = np.array([
        base_sine + np.random.normal(0, noise_level, n)
        for _ in range(num_curves)
    ])

    # Smooth the curves using B-splines
    smoothed_curves = np.zeros_like(noisy_curves)
    for i in range(num_curves):
        # Fit B-spline
        tck = splrep(time, noisy_curves[i], k=3, t=np.linspace(0, 2 * np.pi, nbasis - 4)[1:-1])
        # Evaluate B-spline
        smoothed_curves[i] = BSpline(*tck)(time)

    # Create figures
    noisy_fig = go.Figure()
    smooth_fig = go.Figure()

    if show_noisy:
        for i in range(num_curves):
            noisy_fig.add_trace(
                go.Scatter(
                    x=time,
                    y=noisy_curves[i],
                    mode='lines',
                    line=dict(color='#3aa5ff', width=1),  # Match blue from welcome screen
                    opacity=0.3,
                    showlegend=False
                )
            )

    if show_smooth:
        for i in range(num_curves):
            smooth_fig.add_trace(
                go.Scatter(
                    x=time,
                    y=smoothed_curves[i],
                    mode='lines',
                    line=dict(color='#46e991', width=1),  # Match green from welcome screen
                    opacity=0.3,
                    showlegend=False
                )
            )

    # Update layout for both figures
    layout = dict(
        plot_bgcolor='rgba(0,0,0,0)',
        paper_bgcolor='rgba(0,0,0,0)',
        font=dict(color='#FFFFFF'),
        xaxis=dict(
            title='Time',
            gridcolor='#333333',
            zerolinecolor='#333333'
        ),
        yaxis=dict(
            title='Value',
            gridcolor='#333333',
            zerolinecolor='#333333'
        ),
        margin=dict(l=50, r=20, t=50, b=50),
    )

    noisy_fig.update_layout(
        title=dict(text='Noisy Functional Data', font=dict(color='#FFFFFF')),
        **layout
    )

    smooth_fig.update_layout(
        title=dict(text='Smoothed Functional Data', font=dict(color='#FFFFFF')),
        **layout
    )

    return noisy_fig, smooth_fig


# Route for the React app (welcome screen)
@server.route('/', defaults={'path': ''})
@server.route('/<path:path>')
def serve_react(path):
    if path.startswith('dashboard'):
        return app.index()
    try:
        if path == "" or path == "/":
            return flask.send_from_directory(dist_path, 'index.html')
        return flask.send_from_directory(dist_path, path)
    except:
        return flask.send_from_directory(dist_path, 'index.html')

if __name__ == '__main__':
    if not os.path.exists(dist_path):
        print(f"Error: Static files directory not found at {dist_path}")
        print("Please make sure to build the React app first using 'npm run build'")
        exit(1)
        
    print(f"Serving static files from: {dist_path}")
    print("Welcome screen will be available at: http://localhost:8050/")
    print("Dashboard will be available at: http://localhost:8050/dashboard/")
    app.run(debug=True, port=8050)
