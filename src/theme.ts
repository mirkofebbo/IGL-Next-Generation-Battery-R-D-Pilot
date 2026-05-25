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
    fontFamily: '"Averta-Regular", "Helvetica", "Arial", sans-serif', 
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 700,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 700,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 700,  
    },
    h6: {
      fontSize: '0.95rem',
      fontWeight: 700,
    },  
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
    },
  },
  components: {
    MuiCard: {
      variants: [
        {
          props: { variant:'elevation' },
          style: {
            width: '100%',
            borderRadius: 16,
            border: `1px solid ${brandColors.aqua}`,
            background: `linear-gradient(180deg, ${brandColors.white} 0%, #f7fbff 100%)`,
            boxShadow: '0 8px 20px rgba(15, 41, 74, 0.08)',
            transition: 'transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease',
            '&:hover': {
              transform: 'translateY(-2px)',
              borderColor: brandColors.blue,
              boxShadow: '0 12px 26px rgba(15, 41, 74, 0.14)',
            },
          },
        },
      ],
    },
  },
});

export default theme;