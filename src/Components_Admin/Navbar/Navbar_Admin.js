import { useState, useCallback } from 'react'
import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import Events from '../Events/Events'
import Eventcreate from '../Eventcreate/Eventcreate'
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';

function Navbar_Admin(props) {

  const navlinks = [
    { title: "Events", cName: "nav-link", url: "/" },
    { title: "Create Event", cName: "nav-link", url: "/Eventcreate" },
    { title: "Logout", cName: "nav-link", url: "/" }
  ]
  const [toggle, setToggle] = useState(false);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [event, setEvent] = useState({});
  const [isEdit, setIsEdit] = useState(false)

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCreate = () => {
    setEvent({});
  };

  const handleLogout = () => {
    redirectLogout();
    localStorage.clear();
    props.setIsAdmin(false);
    window.location.reload();
  };

    // redirect to login page after signup
    const navigate = useNavigate();
    const redirectLogout = useCallback(
      () => navigate('/', { replace: true }),
      [navigate]
    );

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl" sx={{backgroundColor: 'black', boxShadow: "0px 2px 20px white"}}>
          <Toolbar disableGutters>
            <Typography
              variant="h4"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'Arial',
                fontWeight: 700,
                letterSpacing: '.2rem',
                color: 'white',
                textDecoration: 'none',
              }}
            >
              EventFull
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              {/* This block minimizes the navbar opens and make it into a menu bar when screen is smaller/mobile */}
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {/* The mapping to the navback links and pages */}
                {navlinks.map((item) => (
                  <Link className={item.cName} to={item.url} style={{textDecoration: 'none'}} 
                  onClick={item.title === 'Logout' ? handleLogout : item.title === 'Create Event' ? handleCreate : null}>
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography textAlign="center" sx={{color: 'black', }}>{item.title}</Typography>
                    </MenuItem>
                  </Link>

                ))}
              </Menu>
            </Box>

            {/* Navbar for full screen */}
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'Arial',
                fontWeight: 700,
                letterSpacing: '.2rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              EventFull
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {/* The mapping to the navback links and pages */}
              {navlinks.map((item) => (
                <Link className={item.cName} to={item.url} style={{textDecoration: 'none'}}
                onClick={item.title === 'Logout' ? handleLogout : item.title === 'Create Event' ? handleCreate : null}>
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 3, mx: 1, color: 'white', display: 'block', fontSize: 'large' }}
                  >
                    {item.title}
                  </Button>
                </Link>
              ))}
            </Box>
            <Box sx={{ flexGrow: 0 }}>
                <Button sx={{ color: 'white', fontSize: 'large'}}>ADMIN</Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Routes>
        <Route path='/' element={<Events setEvent={setEvent}/>} />
        <Route path='Eventcreate' element={<Eventcreate isEdit={isEdit} event={event} setIsEdit={setIsEdit} setEvent={setEvent}/>} />
        <Route path='EventEdit' element={<Eventcreate isEdit={true} event={event}/>}/>
      </Routes>
    </>
  )
}

export default Navbar_Admin