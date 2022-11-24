import React, { useEffect } from 'react';
import Navbar from './Components_Customer/navbar/Navbar';
import Navbar_Admin from './Components_Admin/Navbar/Navbar_Admin';
import { ThemeProvider } from '@mui/material/styles';
import { customerTheme } from './GlobalTheme';
import { Box } from '@mui/system';
import backImage from './Assets/EventFull-Background.png';

function App() {
  const [isAdmin, setIsAdmin] = React.useState(false);

  useEffect(function () {
    if (localStorage.getItem('isAdmin') === "true") {
      setIsAdmin(true);
    }
  }, []);


  return (
    <Box style={{
      backgroundImage: `url(${backImage})`,
      minHeight: '100vh',
      backgroundSize: "100%, auto",
      backgroundRepeat: 'repeat-y'
    }} >
      <ThemeProvider theme={customerTheme}>

        {isAdmin === true ? <Navbar_Admin setIsAdmin={setIsAdmin} /> : <Navbar setIsAdmin={setIsAdmin} />}

      </ThemeProvider>
    </Box>
  );
}

export default App;
