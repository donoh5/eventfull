import React from 'react';
import AppAdmin from './AppAdmin';
import AppCustomer from './AppCustomer';
import Paper from '@mui/material/Paper';
import { ThemeProvider } from '@mui/material/styles';
import { customerTheme } from './GlobalTheme';
import { Box } from '@mui/system';


function App() {
  return (
    <Box sx={{
      minHeight: '100vh', 
      minWidth: '100%',
      background: '#111111'}}>
    <ThemeProvider theme={customerTheme}>

      {/* <AppAdmin /> */}
      <AppCustomer />


      </ThemeProvider>
    </Box>
  );
}

export default App;
