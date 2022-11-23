import { useState, useEffect } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import Events from '../Events/Events'
import Eventcreate from '../Eventcreate/Eventcreate'
import Login from '../login/LoginAdmin'
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';


function Navbar_Admin() {

  const navlinks = [
    { title: "Events", cName: "nav-link", url: "/" },
    { title: "Create Event", cName: "nav-link", url: "/Eventcreate" }
  ]
  const [toggle, setToggle] = useState(false);
  const onToggle = () => setToggle(!toggle);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
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

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl" sx={{backgroundColor: 'black', boxShadow: "0px 2px 20px white"}}>
          <Toolbar disableGutters>
            {/* Unsure how this actually works but this block is to format the fill screensize/desktopmode */}
            {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />you can display an icon here or logo */}
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
                  onClick={item.title === 'Create Event' ? handleCreate : null}>
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography textAlign="center" sx={{color: 'black', }}>{item.title}</Typography>
                    </MenuItem>
                  </Link>

                ))}
              </Menu>
            </Box>

            {/* Navbar for full screen */}
            {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />you can display an icon here or logo */}
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
                <Link className={item.cName} to={item.url} style={{textDecoration: 'none'}}>
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
              <Link className="LogOut" to='/Login'>
              <Button sx={{ color: 'white', fontSize: 'large'}}>LogOut</Button>
              </Link>
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