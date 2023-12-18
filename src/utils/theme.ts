// 1. Import `extendTheme`
import { extendTheme } from "@chakra-ui/react"

// 2. Call `extendTheme` and pass your custom values
export const theme = extendTheme({
	colors: {
		primary: {
			50: '#dbfefe',
			100: '#b6f5f6',
			200: '#8deced',
			300: '#64e3e4',
			400: '#3cdbdd',
			500: '#22c1c3',
			600: '#129698',
			700: '#026c6e',
			800: '#004142',
			900: '#001719',

		},
		secondary:
		{
			50: '#fff7db',
			100: '#ffe6ad',
			200: '#ffd67e',
			300: '#fdc64c',
			400: '#fdb51c',
			500: '#e39c02',
			600: '#b17900',
			700: '#7f5700',
			800: '#4d3400',
			900: '#1d1000',
		}

	},
})