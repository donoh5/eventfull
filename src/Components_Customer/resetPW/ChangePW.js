import * as React from 'react';
import { Box } from '@mui/system';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ChangePW() {
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    // redirect to login page after signup
    const navigate = useNavigate();
    const redirectLogin = React.useCallback(
        () => navigate('/Login', { replace: true }),
        [navigate]
    );

    const onSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword || password === '') {
            alert('Passwords do not match!');
        } else {
            axios
                .post(`https://eventfull-backend.azurewebsites.net/resetPassword?userID=`
                    + window.location.pathname.substring(10) + '&newPw=' + password)
                .then(function ({ data }) {
                    if (data) {
                        alert('Password changed!');
                        redirectLogin();
                    } else {
                        alert('Password change failed!');
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    };

    console.log();

    return (
        <Box
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
                p: '5vw',
                pb: { sx: '3ch', md: '4vw' },
                textAlign: 'center',
                borderRadius: '25px',
                border: '5px solid',
                borderColor: 'black',
            }}>
            <form>
                <Typography sx={{ fontSize: '4ch', p: '2ch' }}>Password Reset</Typography>
                <TextField
                    required
                    type={'password'}
                    id='outlined-required'
                    label='Password'
                    name='password'
                    sx={{
                        width: '100%',
                        input: { fontSize: '1.2rem', padding: '0.7rem' },
                        pb: '2vh',
                    }}
                    onChange={handlePasswordChange}
                /><br></br>
                <TextField
                    required
                    type={'password'}
                    id='outlined-required'
                    label='Confirm Password'
                    name='passwordConfirm'
                    sx={{
                        width: '100%',
                        input: { fontSize: '1.2rem', padding: '0.7rem' },
                        pb: '2vh',
                    }}
                    onChange={handleConfirmPasswordChange}
                /><br></br>
                <Button type='submit' onClick={onSubmit} sx={{ width: '100%', height: '6ch' }}>
                    <Typography>Change Password</Typography>
                </Button>
            </form>
        </Box>
    );
}

export default ChangePW;
