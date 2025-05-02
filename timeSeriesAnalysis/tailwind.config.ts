
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				data: {
					blue: '#3aa5ff',
					green: '#46e991',
					red: '#ff5b79',
					purple: '#a177ff',
					navy: '#0d1c3f',
					'dark-blue': '#061328',
					'deep-blue': '#030a17'
				}
			},
			fontFamily: {
				sans: ['"Inter"', 'sans-serif'],
				mono: ['"IBM Plex Mono"', 'monospace'],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				'fade-up': {
					'0%': { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'pulse-glow': {
					'0%, 100%': { 
						opacity: '1',
						boxShadow: '0 0 15px rgba(58, 165, 255, 0.7), 0 0 30px rgba(58, 165, 255, 0.4), 0 0 45px rgba(58, 165, 255, 0.1)'
					},
					'50%': { 
						opacity: '0.7',
						boxShadow: '0 0 5px rgba(58, 165, 255, 0.4), 0 0 15px rgba(58, 165, 255, 0.2), 0 0 25px rgba(58, 165, 255, 0.1)'
					}
				},
				'shimmer': {
					'0%': { backgroundPosition: '-500px 0' },
					'100%': { backgroundPosition: '500px 0' }
				},
				'chart-line-animation': {
					'0%': { strokeDashoffset: '1000' },
					'100%': { strokeDashoffset: '0' }
				},
				'scale-in': {
					'0%': { transform: 'scale(0.9)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.7s ease-out forwards',
				'fade-up': 'fade-up 0.7s ease-out forwards',
				'pulse-glow': 'pulse-glow 3s infinite',
				'shimmer': 'shimmer 2s infinite linear',
				'chart-line': 'chart-line-animation 2s ease-out forwards',
				'scale-in': 'scale-in 0.5s ease-out forwards'
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'chart-grid': 'linear-gradient(rgba(70, 130, 180, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(70, 130, 180, 0.1) 1px, transparent 1px)',
				'chart-grid-dark': 'linear-gradient(rgba(58, 165, 255, 0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(58, 165, 255, 0.07) 1px, transparent 1px)',
				'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
				'shimmer-gradient': 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0) 100%)'
			},
			backgroundSize: {
				'chart-grid-size': '20px 20px'
			},
			boxShadow: {
				'glow-blue': '0 0 15px rgba(58, 165, 255, 0.7), 0 0 30px rgba(58, 165, 255, 0.4), 0 0 45px rgba(58, 165, 255, 0.1)',
				'glow-green': '0 0 15px rgba(70, 233, 145, 0.7), 0 0 30px rgba(70, 233, 145, 0.4), 0 0 45px rgba(70, 233, 145, 0.1)',
				'neo-brutalism': '5px 5px 0px 0px rgba(0,0,0,0.9)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
