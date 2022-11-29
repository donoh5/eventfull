import * as React from 'react';
import { Link } from 'react-router-dom';
import { Box } from '@mui/system';
import { Container, FormControl, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import axios from 'axios';

const ResetPW = () => {
    const [email, setEmail] = React.useState('');

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const handleClick = (e) => {
        e.preventDefault();
        axios
            .post(`https://eventfull-backend.azurewebsites.net/resetPasswordEmail?email=` + email)
            .then(function ({ data }) {
                if (data) {
                    alert('Email for reset password sent!');
                } else {
                    alert('Invalid email!');
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    return (
        <Box bgcolor="white"
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                backgroundColor: 'white',
                width: { sx: '100%', md: '60ch' },
                minWidth: '30ch',
                ml: 'auto',
                mr: 'auto',
                mt: '15ch',
                p: { sx: '1ch', md: '2vw' },
                pb: { sx: '3ch', md: '4vw' },
                textAlign: 'center',
                borderRadius: '25px',
                border: '5px solid',
                borderColor: 'black',
            }}
        >
            <form>
                <Typography sx={{ fontSize: '3.5ch', pt: '2ch', pb: '2ch' }}>Reset Password </Typography>
                <TextField
                    required
                    id='outlined-required'
                    name='Email'
                    label='Email'
                    type='email'
                    sx={{
                        width: '70%',
                        input: { fontSize: '1.2rem', padding: '0.7rem' },
                        pb: '2vh',
                    }}
                    onChange={handleChange}
                />
                <Button onClick={handleClick} type='submit' sx={{ width: '70%', height: '6ch' }}>Reset</Button>
            </form>

            <Typography sx={{ color: 'black', fontSize: '1.2ch', pt: '2ch' }}>
                Don't have an account?
            </Typography>
            <Link to='/Signup' className='underline'>
                <Typography
                    sx={{ fontSize: '1.2ch', pb: '5ch' }}
                >
                    Sign-up
                </Typography>
            </Link>
        </Box>

    );
};
export default ResetPW;

