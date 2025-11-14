import { createTheme } from '@mui/material/styles';

const colors = {
  black: '#212529',
  darkGrey: '#343A40',
  midGrey: '#495057',
  middleGrey: '#6C757D',
  lightGrey: '#ADB5BD',
};

export const theme = createTheme({
  palette: {
    mode: 'light',

    primary: {
      main: colors.midGrey,
    },

    secondary: {
      main: colors.middleGrey,
    },

    background: {
      default: '#f8f9fa',
      paper: '#ffffff',
    },

    text: {
      primary: colors.black,
      secondary: colors.darkGrey,
    },

    divider: colors.lightGrey,
  },

  typography: {
    fontFamily: `'Inter', 'Roboto', sans-serif`,
  },
});
