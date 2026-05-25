import { createTheme } from '@mui/material/styles';

// 1. Global variables for the exact brand colors from the guidelines
export const brandColors = {
  blue: '#0000FF',     // Core Blue
  green: '#18A48C',
  purple: '#9A1BBE',
  red: '#EB003B',
  orange: '#FF6E47',
  darkGrey: '#646363',
  navy: '#0F294A',
  aqua: '#97D9E3',
  violet: '#A59BEE',
  pink: '#F6A4B7',
  yellow: '#FDB633',
  sand: '#D2C9C0',
  white: '#FFFFFF',
  black: '#000000',
};

// 2. Tell TypeScript about our new custom 'brand' palette object
declare module '@mui/material/styles' {
  interface Palette {
    brand: typeof brandColors;
  }
  interface PaletteOptions {
    brand?: typeof brandColors;
  }
}

// 3. Generate the MUI Theme
const theme = createTheme({
  palette: {
    // Map standard MUI roles to your primary colors
    primary: {
      main: brandColors.blue, // "At the centre of our colour palette is a vibrant electric blue"
    },
    secondary: {
      main: brandColors.navy, 
    },
    error: {
      main: brandColors.red,
    },
    warning: {
      main: brandColors.yellow,
    },
    success: {
      main: brandColors.green,
    },
    info: {
      main: brandColors.aqua,
    },
    // Make ALL brand colors accessible via theme.palette.brand
    brand: brandColors, 
  },
  typography: {
    // Optional: The guidelines use a clean sans-serif. 
    // You can set your custom font family here if you have one.
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif', 
  },
});

export default theme;