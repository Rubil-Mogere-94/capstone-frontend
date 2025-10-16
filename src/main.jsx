import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { red, grey, amber, yellow, blue, green } from '@mui/material/colors'; // Import necessary colors

// Define a basic Material-UI theme
const theme = createTheme({
  palette: {
    primary: {
      main: red[700], // Changed to a strong red
      dark: red[800],
      light: red[500],
    },
    secondary: {
      main: grey[700], // Darker grey for secondary actions
      light: grey[500],
      dark: grey[900],
    },
    info: {
      main: blue[500], // Keeping a blue for info/accents that complement red
      dark: blue[700],
      light: blue[300],
    },
    error: {
      main: red[500], // Keep error as red
    },
    success: {
      main: green[500], // Keep success as green
    },
    warning: {
      main: amber[500], // Adjusted amber
      light: yellow[500], // Adjusted yellow
    },
    grey: { // Custom grey palette for specific shades used
      50: grey[50],
      100: grey[100],
      200: grey[200],
      300: grey[300],
      400: grey[400],
      500: grey[500],
      600: grey[600],
      700: grey[700],
      800: grey[800],
      900: grey[900],
    },
    blue: { // Custom blue palette for specific shades used
      50: blue[50],
      100: blue[100],
      200: blue[200],
      300: blue[300],
      400: blue[400],
      500: blue[500],
      600: blue[600],
      700: blue[700],
    },
    red: { // Custom red palette for specific shades used
      50: red[50],
      100: red[100],
      200: red[200],
      300: red[300],
      400: red[400],
      500: red[500],
      600: red[600],
      700: red[700],
      800: red[800],
      900: red[900],
    },
    green: { // Custom green palette for specific shades used
      100: green[100],
      800: green[800],
    }
  },
  typography: {
    fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StrictMode>,
)