import React, { useCallback } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {Card, CardContent, Container, TextField, Typography,} from '@mui/material';
import Modal from '@mui/material/Modal';
import CountdownTimer from './CountdownTimer';
import { Box } from '@mui/system';
import CommonButton from '../../Components_Admin/common/CommonButton';
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
    console.log("signup")
    axios
      .post(`https://eventfull-backend.azurewebsites.net/users`, user)
      .then(function ({ data }) {
        setUserConfirm({
          ...userConfirm,
          userID: data.userID,
        });
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
    if (user.password == password2) {
      handleOpen();
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
    console.log("signup")
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
    <Container>
      <Box bgcolor="white"
        component='form'
        sx={{
          '& .MuiTextField-root': {
            m: 1.25,
            width: '15rem',
          },
          '& .MuiInputBase-root': {
            height: '2.5rem',
            fontSize: '13px',
          },
          '& button': { m: 1 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          paddingBottom: '10vh',
          paddingTop: '3vh',
          marginY: '4rem',
          marginX: 'auto',
          border: 1,
          borderColor: 'black',
          maxWidth: { xs: '15rem', md: '700px', lg: '900px' },
          minWidth: '300px',
          boxShadow: '10',
        }}
      >
        <form>
          <Typography
            variant='h5'
            sx={{
              color: 'black',
              textAlign: 'center',
              align: 'center',
              marginBottom: '1.5rem',
            }}
          >
            Create An Account
          </Typography>
          {/* input boxees */}
          <Box sx={{ display: 'grid' }}>
            <TextField
              required
              id='outlined-required'
              label='Email'
              type='text'
              name='email'
              onChange={handleChange}
            />

            <TextField
              required
              id='outlined-required'
              label='Password'
              type='password'
              name='password'
              onChange={handleChange}
            />

            <TextField
              required
              id='outlined-required'
              label='Confirm Password'
              type='password'
              onChange={(e) => SetPassword2(e.target.value)}
            />

            <TextField
              required
              id='outlined-required'
              label='First Name'
              name='firstName'
              onChange={handleChange}
            />

            <TextField
              required
              id='outlined-required'
              label='Last Name'
              name='lastName'
              onChange={handleChange}
            />
          </Box>
        </form>

        <CommonButton onClick={handleSignUp} variant='outlined' size='large'>
          Sign Up
        </CommonButton>

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
        <Card>
          <CardContent>
            <Typography sx={{ fontSize: 12 }} color='text.primary'>
              A confirmation code has been sent to your email. Please enter the
              code in the field below.
            </Typography>
            <TextField
              label='Confirmation Code'
              className='text'
              id='ConCode'
              color='primary'
              fullWidth
              size='Normal'
              variant='filled'
              onChange={onChangeconfirmationCode}
            />
            <br></br>
            <CountdownTimer />
            <br></br>
            <button onClick={confirmCode} className='btn'>
              Submit Code
            </button>
            <button onClick={handleClose} className='btn'>
              Close
            </button>{' '}
            * If you close this window, you will have to sign up again.
          </CardContent>
        </Card>
      </Modal>
    </Container>
  );
}

export default Signup;
