import * as React from 'react';
import { Link } from 'react-router-dom';
import { Box } from '@mui/system';
import { Container, FormControl, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';

const ResetPW = () => {
  return (
    <Container>
      <Box bgcolor="white"
        sx={{
          '& .MuiTextField-root': { m: 1.5, width: '15rem' },
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
            Reset Password
          </Typography>
          <Box sx={{ display: 'grid' }}>
            <TextField
              required
              id='outlined-required'
              name='Email'
              label='Email'
              type='email'
              // onChange={handleChange}
            />
          </Box>
        </form>
        <Button type='submit'>Send Password Reset</Button>
        <Typography sx={{ color: 'black', fontSize: '13px' }}>
          Don't have an account?
        </Typography>
        <Link to='/Signup' className='underline'>
          <Typography
            sx={{ color: 'black', fontSize: '13px', marginLeft: '0.5rem' }}
          >
            Sign-up
          </Typography>
        </Link>
      </Box>
    </Container>
  );
};
export default ResetPW;

