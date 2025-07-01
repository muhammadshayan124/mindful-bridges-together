
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
			fontFamily: {
				'inter': ['Inter', 'sans-serif'],
				'quicksand': ['Quicksand', 'sans-serif'],
				'open-sans': ['Open Sans', 'sans-serif'],
			},
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
				// MindfulBuddy Design System
				'mindful': {
					'background-light': '#F7FAFC',
					'background-dark': '#1A202C',
					'bot-bubble-start': '#BEE3F8',
					'bot-bubble-end': '#90CDF4',
					'user-bubble': '#FED7D7',
					'parent-sidebar': '#2B6CB0',
					'parent-primary': '#3182CE',
					'success': '#68D391',
					'warning': '#F6AD55',
					'accent': '#9F7AEA',
					'mint': '#48BB78',
					'send-button': '#38BDF8',
					'dark-bot': '#2B6CB0',
					'dark-user': '#9B2C2C',
					'dark-input': '#2D3748',
					'dark-border': '#4A5568',
					'dark-accent': '#63B3ED',
					'parent-bg': '#EDF2F7',
					'parent-card': '#FFFFFF',
					'parent-border': '#CBD5E0',
					'parent-header': '#1A365D',
					'parent-dark-bg': '#2D3748',
					'parent-dark-text': '#F7FAFC',
					'parent-dark-sidebar': '#1A365D',
				}
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
				'typing-bounce': {
					'0%, 60%, 100%': { transform: 'translateY(0)' },
					'30%': { transform: 'translateY(-8px)' }
				},
				'gentle-pulse': {
					'0%, 100%': { opacity: '1', transform: 'scale(1)' },
					'50%': { opacity: '0.8', transform: 'scale(1.02)' }
				},
				'fade-in-up': {
					'0%': { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'scale-in': {
					'0%': { opacity: '0', transform: 'scale(0.95)' },
					'100%': { opacity: '1', transform: 'scale(1)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'typing-bounce': 'typing-bounce 1.4s infinite ease-in-out',
				'gentle-pulse': 'gentle-pulse 3s ease-in-out infinite',
				'fade-in-up': 'fade-in-up 0.3s ease-out',
				'scale-in': 'scale-in 0.2s ease-out'
			},
			backgroundImage: {
				'child-gradient': 'linear-gradient(135deg, #F7FAFC 0%, #E6FFFA 50%, #F0FFF4 100%)',
				'child-dark-gradient': 'linear-gradient(135deg, #1A202C 0%, #2D3748 50%, #1A365D 100%)',
				'bot-bubble-gradient': 'linear-gradient(135deg, #BEE3F8 0%, #90CDF4 100%)',
				'parent-gradient': 'linear-gradient(135deg, #EDF2F7 0%, #F7FAFC 100%)',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
