import React, { useEffect } from 'react';
import Navbar from './Components_Customer/navbar/Navbar';
import Navbar_Admin from './Components_Admin/Navbar/Navbar_Admin';
import Paper from '@mui/material/Paper';
import { ThemeProvider } from '@mui/material/styles';
import { customerTheme } from './GlobalTheme';
import { Box } from '@mui/system';


function App() {
    const [isAdmin, setIsAdmin] = React.useState(false);

    useEffect(function () {
        if (localStorage.getItem('isAdmin') === "true") {
            setIsAdmin(true);
        }
    }, []);

    return (
        <Box sx={{
            minHeight: '100vh',
            minWidth: '100%',
            background: '#111111'
        }}>
            <ThemeProvider theme={customerTheme}>

                {isAdmin === true ? <Navbar_Admin setIsAdmin={setIsAdmin} /> : <Navbar setIsAdmin={setIsAdmin} />}

            </ThemeProvider>
        </Box>
    );
}

export default App;
