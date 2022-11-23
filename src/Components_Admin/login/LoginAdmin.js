import { useCallback } from 'react';
import * as React from 'react';
import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Container } from '@mui/system';
import {
  autocompleteClasses,
  FormControl,
  TextField,
  Typography,
} from '@mui/material';
import CommonButton from '../common/CommonButton';
import Button from '@mui/material/Button';

function LoginAdmin(props) {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { type, value } = e.target;
    setUser({
      ...user,
      [type]: value,
    });
  };

  const redirectLogin = useCallback(
    () => navigate('/UpcomingEvent', { replace: true }),
    [navigate]
  );

  const loginUser = function () {
    console.log("login");
    axios
      .put(`https://eventfull-backend.azurewebsites.net/login`, user)
      .then(function ({ data }) {
        if (data.split(',')[0] != 'T') {
          alert('Invalid email or password');
        } else {
          props.setUserID(data.split(',')[1]);
          props.setUserName(data.split(',')[2]);
          props.setLogInStatus(true);
          localStorage.setItem('userID', data.split(',')[1]);
          localStorage.setItem('userName', data.split(',')[2]);
          localStorage.setItem('logInTime', new Date().toString());
          console.log(data);
          redirectLogin();
        }
      })
      .catch(function (error) {
        console.log('');
      });
  };

  return (
    <Box
      component='form'
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        paddingBottom: { xs: '2ch', md: '5vh' },
        paddingTop: { xs: '2ch', md: '5vh' },
        marginY: { xs: '4ch', md: '10vh' },
        marginX: 'auto',
        border: '5px solid',
        borderColor: 'black',
        borderRadius: '25px',
        width: { xs: '40ch', sm: '40vw' },
        maxWidth: '60ch',
        minWidth: { sm: '50ch' },
        height: '100%',
        backgroundColor: 'white'
      }}
    >
      <Typography
        variant='h5'
        sx={{
          color: 'black',
          textAlign: 'center',
          align: 'center',
          marginBottom: '1rem',
          fontSize: { xs: '6ch', md: '5ch' },
        }}
      >
        Login
      </Typography>

      <Box
        component='form'
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          width: '30ch',
        }}
      >
        {/* input boxees */}
        <TextField
          required
          id='outlined-required'
          name='email'
          label='Email'
          type='email'
          onChange={handleChange}
          sx={{
            width: '100%',
            input: { fontSize: '1.2rem', padding: '0.7rem' },
            pb: '2vh',
          }}
        />
        <TextField
          required
          id='outlined-required'
          name='password'
          label='Password'
          type='password'
          onChange={handleChange}
          sx={{
            width: '100%',
            input: { fontSize: '1.2rem', padding: '0.7rem' },
            pb: '2vh',
             
            
          }}
        />
        {/* Log in */}
        <Button
          onClick={loginUser}
          sx={{ width: 'inherit', height: '4.2ch', fontSize: '20px', color: 'white', backgroundColor: 'black', '&:hover': {backgroundColor: 'black', borderColor: 'white'} }}
        >
          <Typography>Login</Typography>
        </Button>
    
      </Box>
    </Box>
  );
}

export default LoginAdmin;
