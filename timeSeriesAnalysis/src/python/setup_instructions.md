
# Integration Setup Instructions

## Overview
This project integrates a React welcome screen with a Python Dash application for time series analysis.

## Prerequisites
1. Node.js and npm (for React)
2. Python 3.7+ (for Dash)

## Setup Steps

### Step 1: Build the React App
1. Build the React application:
```
npm run build
```
This will create a `dist` folder with the compiled React app.

### Step 2: Install Python Dependencies
1. Create a Python virtual environment (recommended):
```
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install the required Python packages:
```
pip install dash dash-bootstrap-components plotly scipy numpy pandas flask
```

### Step 3: Run the Integrated Application
1. From the project root, run:
```
python src/python/app.py
```

2. Open your browser and navigate to:
```
http://localhost:8050
```

## How it Works
- The React welcome screen is served as a static site by Flask
- When you click "Enter Analysis Dashboard", it navigates to the Dash application
- The Dash app is styled to match the welcome screen's theme
- You can return to the welcome screen using the "Back to Welcome Screen" button

## Customization
- To modify the React welcome screen, edit the files in the `src/components` directory
- To modify the Dash application, edit `src/python/app.py`
