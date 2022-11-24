import { useState, useEffect, useCallback } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import MyEvent from '../myevent/MyEvent';
import MyCart from '../mycart/MyCart';
import Details from '../details/Details';
import Login from '../login/Login';
import Signup from '../signup/Signup';
import UpcomingEvent from '../upcomingevent/UpcomingEvent';
import ResetPW from '../resetPW/ResetPW';
import ResetInfo from '../resetInfo/ResetInfo';
import MobileTickets from '../myevent/MobileTickets';
import DesktopTickets from '../myevent/DesktopTickets';
import LoginAdmin from '../login/LoginAdmin';
import Checkout from '../checkout/Checkout';
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
import Logo from '../../Assets/EventFull-Logo.png';

function Navbar(props) {
  const navlinks = [
    { title: 'Upcoming Events', cName: 'nav-link', url: '/' },
    { title: 'Login', cName: 'nav-link', url: '/Login' },
  ];

  const navlinksLoggedIn = [
    { title: 'My Events', cName: 'nav-link', url: '/MyEvent' },
    { title: 'My Cart', cName: 'nav-link', url: '/MyCart' },
    { title: 'Upcoming Events', cName: 'nav-link', url: '/UpcomingEvent' },
    { title: 'Logout', cName: 'nav-link', url: '/Logout' },
  ];

  useEffect(function () {
    if (
      localStorage.getItem('userID') != null &&
      localStorage.getItem('logInTime') != null &&
      Date.parse(localStorage.getItem('logInTime')) >=
        new Date().setMinutes(new Date().getMinutes() - 10)
    ) {
      setLogInStatus(true);
      setUserID(localStorage.getItem('userID'));
      setUsername(localStorage.getItem('userName'));
    } else {
      localStorage.clear();
    }
  }, []);

  const [toggle, setToggle] = useState(false);
  const onToggle = () => setToggle(!toggle);

  const [username, setUsername] = useState('');
  const [userLastName, setUserLastName] = useState('');
  const [userID, setUserID] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [logInStatus, setLogInStatus] = useState(false);
  const [eventID, setEventID] = useState('');

  const handleLogout = (e) => {
    setLogInStatus(false);
    setUsername('');
    setUserID('');
    setEventID('');
    redirectLogout();
    localStorage.clear();
    window.location.reload();
  };

  // redirect to login page after signup
  const navigate = useNavigate();
  const redirectLogout = useCallback(
    () => navigate('/', { replace: true }),
    [navigate]
  );

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const adminURL = '4XEtq0il8U6V';

  if (logInStatus) {
    return (
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
                  <Link to='/UpcomingEvent' style={{ textDecoration: 'none' }}>
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
                    {navlinksLoggedIn.map((item) => (
                      <Link
                        className={item.cName}
                        to={item.url}
                        onClick={item.title === 'Logout' ? handleLogout : null}
                        style={{ textDecoration: 'none' }}
                      >
                        <Button
                          onClick={handleCloseNavMenu}
                          sx={{
                            my: 3,
                            color: 'white',
                            display: 'block',
                            fontSize: 'small',
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: '2ch',
                              paddingLeft: 3,
                            }}
                          >
                            {item.title}
                          </Typography>
                        </Button>
                      </Link>
                    ))}
                  </Box>
                </Grid>
                <Grid item xs={2} sx={{ m: 'auto' }}>
                  <Box>
                    <Link to='/ResetInfo'>
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
                          {username}
                        </Typography>
                      </Button>
                    </Link>
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
                      <Link to='/ResetInfo' style={{ textDecoration: 'none' }}>
                        <Typography
                          sx={{
                            fontSize: '2ch',
                            color: 'black',
                            marginLeft: '1rem',
                            textDecoration: 'underline',
                          }}
                        >
                          {username}
                        </Typography>
                      </Link>
                      {/* The mapping to the navback links and pages */}
                      {navlinksLoggedIn.map((item) => (
                        <Link
                          className={item.cName}
                          to={item.url}
                          onClick={
                            item.title === 'Logout' ? handleLogout : null
                          }
                          style={{ textDecoration: 'none' }}
                        >
                          <MenuItem onClick={handleCloseNavMenu}>
                            <Typography
                              textAlign='center'
                              sx={{ color: 'black' }}
                            >
                              {item.title}
                            </Typography>
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
                  <Link to='/UpcomingEvent' style={{ textDecoration: 'none' }}>
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
                </Grid>
              </Grid>
            </Toolbar>
          </Container>
        </AppBar>
        <Routes>
          <Route exact path='/' element={<UpcomingEvent />} />
          <Route path='/MyCart' element={<MyCart userID={userID} />} />
          <Route
            path='/MyEvent'
            element={<MyEvent userID={userID} userName={username} />}
          />
          <Route
            path='/Details/:eventId'
            element={
              <Details
                eventID={eventID}
                logInStatus={logInStatus}
                userID={userID}
              />
            }
          />
          <Route
            path='/UpcomingEvent'
            element={<UpcomingEvent setEventID={setEventID} />}
          />
          <Route path='/Logout' element={<UpcomingEvent />} />
          <Route path='/Signup' element={<Signup />} />
          <Route path='/ResetPW' element={<ResetPW />} />
          <Route
            path='/ResetInfo'
            element={
              <ResetInfo
                userID={userID}
                userLastName={userLastName}
                userEmail={userEmail}
                username={username}
                setUsername={setUsername}
              />
            }
          />
          <Route path='/MobileTickets' element={<MobileTickets />} />
          <Route path='/DesktopTickets' element={<DesktopTickets />} />
          <Route path='/Checkout' element={<Checkout userID={userID} />} />
        </Routes>
      </Box>
    );
  } else {
    return (
      <Box sx={{ width: 'auto', height: 'auto'}}>
        <AppBar position='static'>
          <Container
            maxWidth='100%'
            style={{
              paddingLeft: '0px',
              paddingRight: '0px',
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

                <Grid item xs={10}>
                  <Box
                    sx={{
                      flexGrow: 1,
                      display: { xs: 'none', md: 'flex' },
                      justifyContent: 'right',
                    }}
                  >
                    {/* The mapping to the navback links and pages */}
                    {navlinks.map((item) => (
                      <Link
                        className={item.cName}
                        to={item.url}
                        onClick={item.title === 'Logout' ? handleLogout : null}
                        style={{ textDecoration: 'none' }}
                      >
                        <Button
                          onClick={handleCloseNavMenu}
                          sx={{
                            my: 3,
                            mx: 1,
                            color: 'white',
                            display: 'block',
                            fontSize: 'large',
                          }}
                        >
                          <Typography
                            xs={{
                              fontSize: '2ch',
                              paddingLeft: 3,
                            }}
                          >
                            {item.title}
                          </Typography>
                        </Button>
                      </Link>
                    ))}
                  </Box>
                </Grid>
              </Grid>

              <Grid
                container
                sx={{ display: { xs: 'flex', md: 'none' }, ml: '1%', mr: '1%' }}
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
                  <Box
                    sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                  >
                    <IconButton
                      size='large'
                      aria-label='account of current user'
                      aria-controls='menu-appbar'
                      aria-haspopup='true'
                      onClick={handleOpenNavMenu}
                      color='inherit'
                    >
                      <MenuIcon />
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
                      {/* The mapping to the navback links and pages */}
                      {navlinks.map((item) => (
                        <Link
                          className={item.cName}
                          to={item.url}
                          onClick={
                            item.title === 'Logout' ? handleLogout : null
                          }
                          style={{ textDecoration: 'none' }}
                        >
                          <MenuItem onClick={handleCloseNavMenu}>
                            <Typography
                              textAlign='center'
                              sx={{ color: 'black' }}
                            >
                              {item.title}
                            </Typography>
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
                  <Box></Box>
                </Grid>
              </Grid>
            </Toolbar>
          </Container>
        </AppBar>

        <Routes style={{height: '100vh', width: 'auto'}}>
          <Route
            exact
            path='/'
            element={<UpcomingEvent setEventID={setEventID} />}
          />
          <Route
            path='/Details/:eventId'
            element={<Details eventID={eventID} logInStatus={logInStatus} />}
          />
          <Route 
            path='/Login'
            element={
              <Login
                setUserName={setUsername}
                setUserID={setUserID}
                setLogInStatus={setLogInStatus}
                setUserLastName={setUserLastName}
                setUserEmail={setUserEmail} 
              />
            }
          />
          <Route path='/Signup' element={<Signup />} />
          <Route path='/ResetPW' element={<ResetPW />} />
          <Route path='/ResetInfo' element={<ResetInfo />} />
          <Route
            path={'/' + adminURL}
            element={
              <LoginAdmin
                setUserName={setUsername}
                setUserID={setUserID}
                setLogInStatus={setLogInStatus}
                setUserLastName={setUserLastName}
                setUserEmail={setUserEmail}
                setIsAdmin={props.setIsAdmin}
              />
            }
          />
        </Routes>
      </Box>
    );
  }
}

export default Navbar;
