import React, { useCallback } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, Container, TextField, Typography, } from '@mui/material';
import Modal from '@mui/material/Modal';
import CountdownTimer from './CountdownTimer';
import { Box } from '@mui/system';

import Button from '@mui/material/Button';

function Signup() {
  // user object for creating new user
  const [user, setUser] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });

  // password validation
  const [password2, SetPassword2] = useState('');

  // user object for confirm code
  const [userConfirm, setUserConfirm] = useState({
    userID: '',
    accountType: '',
  });

  // update user object
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  // create new user
  const createUser = function () {
    axios
      .post(`https://eventfull-backend.azurewebsites.net/users`, user)
      .then(function ({ data }) {
        if(data){
            handleOpen();
            setUserConfirm({
              ...userConfirm,
              userID: data.userID,
            });
        }
        else{
            handleClose();
            alert("Email already exists");
        }
      })
      .catch(function (error) {
        console.log('');
      });
  };

  // modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //Sends Confirmation email and opens Confirmation Code Modal
  const handleSignUp = (e) => {
    e.preventDefault();
    //check
    if (user.password === password2) {
      createUser();
    } else {
      alert('Passwords do not match');
    }
  };

  // update confirmation code locally
  const onChangeconfirmationCode = (e) => {
    const { value } = e.target;
    setUserConfirm({
      ...userConfirm,
      accountType: value,
    });
  };

  // confirm user
  const confirmCode = function () {
    axios
      .put(
        `https://eventfull-backend.azurewebsites.net/confirmSignUp`,
        userConfirm
      )
      .then(function ({ data }) {
        if (data) {
          handleClose();
          redirectLogin();
        } else {
          alert('Invalid code');
        }
      })
      .catch(function (error) {
        console.log('');
      });
  };

  // redirect to login page after signup
  const navigate = useNavigate();
  const redirectLogin = useCallback(
    () => navigate('/Login', { replace: true }),
    [navigate]
  );

  return (
    <Box>
      <Box
        component='form'
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          paddingBottom: { xs: '2ch', md: '5vh' },
          paddingTop: { xs: '2ch', md: '5vh' },
          pl: '0',
          pr: '0',
          marginY: { xs: '4ch', md: '10vh' },
          marginX: 'auto',
          border: '5px solid',
          borderColor: 'black',
          borderRadius: '25px',
          width: { xs: '100%', sm: '40vw' },
          maxWidth: '60ch',
          minWidth: { sm: '50ch' },
          height: '100%',
          backgroundColor: 'white'
        }}
      >

        <Typography sx={{ fontSize: '4ch', pb: '2ch' }}>
          Create An Account
        </Typography>
        {/* input boxees */}
        <Box component='form'
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            width: '30ch',
          }}>
          <form>
            <TextField
              required
              id='outlined-required'
              label='Email'
              type='text'
              name='email'
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
              label='Password'
              type='password'
              name='password'
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
              label='Confirm Password'
              type='password'
              onChange={(e) => SetPassword2(e.target.value)}
              sx={{
                width: '100%',
                input: { fontSize: '1.2rem', padding: '0.7rem' },
                pb: '2vh',
              }}
            />

            <TextField
              required
              id='outlined-required'
              label='First Name'
              name='firstName'
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
              label='Last Name'
              name='lastName'
              onChange={handleChange}
              sx={{
                width: '100%',
                input: { fontSize: '1.2rem', padding: '0.7rem' },
                pb: '2vh',
              }}
            />

          </form>
          <Button onClick={handleSignUp} variant='outlined' sx={{ width: '100%', height: '6ch' }}>
            <Typography sx={{ fontSize: '2ch' }}>Create Account</Typography>
          </Button>
        </Box>




        <Container
          sx={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '1.5rem',
          }}
        >
          <Typography sx={{ color: 'black', fontSize: '13px' }}>
            Already have an account?
          </Typography>
          <Link to='/Login' className='underline'>
            <Typography
              sx={{ color: 'black', fontSize: '13px', marginLeft: '0.5rem' }}
            >
              Log in
            </Typography>
          </Link>
        </Container>
      </Box>

      <Modal open={open} variant='outlined' className='confirmation-email'>
        <Card sx={{
          textAlign: 'center',
          align: 'center',
          width: {xs: '100%', md: '60ch'},
          minWidth: '40ch',
          ml: 'auto',
          mr: 'auto',
          mt: '10ch',
          p: '2ch'
        }}>
          <CardContent sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            align: 'center',
            ml: 'auto',
            mr: 'auto'
          }}>
            <Typography sx={{ fontSize: '2ch' }}>
              A confirmation code has been sent to your email. Please enter the
              code in the field below.
            </Typography><br></br>
            <TextField
              label='Confirmation Code'
              className='text'
              id='ConCode'
              color='primary' fullWidth
              size='Normal'
              variant='filled'
              onChange={onChangeconfirmationCode}
            />
            <br></br>
            <CountdownTimer />
            <br></br>
            <br></br>
            <Button onClick={confirmCode} type='submit' sx={{width: '45%', height: '6ch'}}>
              <Typography>Submit Code</Typography>
            </Button ><br></br>
            <Button onClick={handleClose} type='submit' sx={{width: '45%', height: '6ch'}}>
              <Typography>Close</Typography>
            </Button ><br></br>
            <Typography>
            *If you close this window, you will have to sign up again.
            </Typography>
            
          </CardContent>
        </Card>
      </Modal>
    </Box>
  );
}

export default Signup;
