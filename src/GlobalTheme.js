import { createTheme } from '@mui/material/styles';

export const customerTheme = createTheme({
  components: {
    MuiTypography: {
      defaultProps: {
        fontFamily: 'sans-serif',
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: 'black',
          fontFamily: 'sans-serif',
          color: 'white',
          '&:hover': {
            backgroundColor: 'black',
            borderColor: 'white',
            color: ' #EDBD16',
          },
          duration: '2s',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& label.Mui-focused': {
            color: 'black',
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: 'black',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'black',
            },
            '&:hover fieldset': {
              borderColor: 'black',
            },
            '&.Mui-focused fieldset': {
              borderColor: ' #EDBD16 ',
            },
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontFamily: 'Noto Sans',
        },
      },
    },
    MuiStepper: {
      styleOverrides: {
        root: {
          '& .MuiStepIcon-active': {
            color: ' #EDBD16 ',
          },
          '& .MuiStepIcon-completed': {
            color: ' #EDBD16 ',
          },
        },
      },
    },
  },
});
