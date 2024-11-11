/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";


export default {
	content: ['./src/**/*.{html,js,svelte,ts}', './.storybook/*.ts'],
	theme: {
		extend: {
			colors: {
				'border-gray': '#444444',
				'light-blue': '#E2E8F0'
			}
		}
	},
	plugins: [daisyui],
	daisyui: {
		themes: [
			{
				default: {
					"primary": "#444444",
					"primary-content": '#ffffff',
					"secondary-content": '#181818',
					"secondary": '#1f1f1f',
					"neutral": "#7E7E7E",
					"base-100": "#ffffff",

					"--padding-btn": "0.5rem 1rem", // padding of button
					"--rounded-box": "1rem", // border radius rounded-box utility class, used in card and other large boxes
					"--rounded-btn": "0.5rem", // border radius rounded-btn utility class, used in buttons and similar element
					"--rounded-badge": "1.9rem", // border radius rounded-badge utility class, used in badges and similar
					"--animation-btn": "0.25s", // duration of animation when you click on button
					"--animation-input": "0.2s", // duration of animation for inputs like checkbox, toggle, radio, etc
					"--btn-focus-scale": "0.95", // scale transform of button when you focus on it
					"--border-btn": "1px", // border width of buttons
					"--tab-border": "1px", // border width of tabs
					"--tab-radius": "0.5rem", // border radius of tabs
				},
			},
		],
	}
};
