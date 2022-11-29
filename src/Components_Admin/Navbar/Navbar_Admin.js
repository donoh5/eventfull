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
import { Grid } from '@mui/material';
import Logo from '../../Assets/EventFull-Logo.png'

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
      <Box sx={{ maxWidth: '100%' }}>
        <AppBar position='static'>
          <Container
            maxWidth='100%'
            style={{
              paddingLeft: '0px',
              paddingRight: '0px',
              maxWidth: '100%',
            }}
            sx={{
              backgroundColor: 'black',
              boxShadow: '0px 0.5px 15px #778da9',
              height: { xs: '3.5rem', md: '5rem' },
            }}
          >
            <Toolbar disableGutters>
              <Grid
                container
                sx={{ display: { xs: 'none', md: 'flex' }, marginX: '1rem' }}
              >
                <Grid
                  item
                  xs={2}
                  sx={{
                    display: 'flex',
                    alignItem: 'center',
                    m: 'auto',
                  }}
                >
                  <Link to='/' style={{ textDecoration: 'none' }}>
                    <img
                      alt='Logo'
                      src={Logo}
                      width={180}
                      style={{ position: 'relative' }}
                    />
                  </Link>
                </Grid>

                <Grid item xs={8}>
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    {/* The mapping to the navback links and pages */}
                    {navlinks.map((item) => (
                  <Link className={item.cName} to={item.url} style={{textDecoration: 'none'}} 
                  onClick={item.title === 'Logout' ? handleLogout : item.title === 'Create Event' ? handleCreate : null}>
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography textAlign="center" sx={{color: 'white', fontSize: '3ch' }}>{item.title}</Typography>
                    </MenuItem>
                  </Link>
                    ))}
                  </Box>
                </Grid>
                <Grid item xs={2} sx={{ m: 'auto' }}>
                  <Box>
                   
                      <Button
                        sx={{
                          color: 'white',
                          fontSize: 'small',
                          float: 'right',
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: '2ch',
                          }}
                        >
                          Admin
                        </Typography>
                      </Button>
                   
                  </Box>
                </Grid>
              </Grid>

              {/* Mobile Size */}
              <Grid
                container
                sx={{
                  marginX: '0.25rem',
                  display: {
                    xs: 'flex',
                    md: 'none',
                  },
                }}
              >
                <Grid
                  item
                  xs={2.5}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: ' left',
                  }}
                >
                  <Box>
                    <IconButton
                      size='small'
                      aria-label='account of current user'
                      aria-controls='menu-appbar'
                      aria-haspopup='true'
                      onClick={handleOpenNavMenu}
                      color='inherit'
                    >
                      <MenuIcon sx={{ fontSize: '3ch' }} />
                    </IconButton>
                    {/* This block minimizes the navbar opens and make it into a menu bar when screen is smaller/mobile */}
                    <Menu
                      id='menu-appbar'
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
                        display: { xs: 'flex', md: 'none' },
                      }}
                    >
                    
                        <Typography
                          sx={{
                            fontSize: '2ch',
                            color: 'black',
                            marginLeft: '1rem',
                            textDecoration: 'underline',
                          }}
                        >
                        
                        </Typography>
                     
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
                </Grid>
                <Grid
                  item
                  xs={7}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: ' center',
                  }}
                >
                  <Link to='/' style={{ textDecoration: 'none' }}>
                    <img
                      alt='Logo'
                      src={Logo}
                      width={150}
                      style={{ position: 'relative' }}
                    />
                  </Link>
                </Grid>
                <Grid
                  item
                  xs={2.5}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'right',
                  }}
                >
                  <Typography
                          sx={{
                            fontSize: '1ch',
                            marginRight: 1
                          }}
                        >
                          ADMIN
                        </Typography>
                </Grid>
              </Grid>
            </Toolbar>
          </Container>
        </AppBar>
        <Routes>
         
                                        
        <Route path='/' element={<Events setEvent={setEvent}/>} />
        <Route path='Eventcreate' element={<Eventcreate isEdit={isEdit} event={event} setIsEdit={setIsEdit} setEvent={setEvent}/>} />
        <Route path='EventEdit' element={<Eventcreate isEdit={true} event={event}/>}/>
        </Routes>
      </Box> 
    </>
  )
}

export default Navbar_Admin

