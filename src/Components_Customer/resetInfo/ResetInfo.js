import React, { useEffect, useState } from 'react'
import { Box } from '@mui/system';
import { TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import axios from 'axios';


function ResetInfo(props) {

    //user object
    const [user, setUser] = useState({
      firstName: props.username,
      lastName: props.userLastName,
      email: props.userEmail
    });

    useEffect(function () {
        console.log("resetInfo")
        axios
            .post(`https://eventfull-backend.azurewebsites.net/userByID?userID=` + props.userID)
            .then(function ({ data }) {
                setUser(data)
                console.log(data)
            })
            .catch(function (error) {
                console.log(error)
            })
    }, []);

    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [currentPassword, setCurrentPassword] = useState();

    //update user object
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value,
        });
    };

    const onChangeCurrentPassword = (e) => {
        const { value } = e.target;
        setCurrentPassword(value);
    };

    const onChangePassword = (e) => {
        const { value } = e.target;
        setPassword(value);
    };

    const onChangeConfirmPassword = (e) => {
        const { value } = e.target;
        setConfirmPassword(value);
    };

    const [updated, setUpdated] = useState(false);

    useEffect(function () {
        if (updated) {
            console.log("resetInfo")
            axios
                .put(`https://eventfull-backend.azurewebsites.net/users`, user)
                .then(function () {
                    console.log('Update successful')
                    alert('Account updated')
                    props.setUsername(user.firstName)
                })
                .catch(function (error) {
                    console.log(error)
                })
        }
    }, [updated])

    function handleSubmit(e) {
        e.preventDefault();
        //update info but not password
        if (currentPassword === user.password && password == null) {
            console.log("resetInfo")
            axios
                .put(`https://eventfull-backend.azurewebsites.net/users`, user)
                .then(function () {
                    console.log('Update successful')
                    alert('Account updated')
                    props.setUsername(user.firstName)
                })
                .catch(function (error) {
                    console.log(error)
                })
        }
        //update info including password
        else if (currentPassword === user.password && password === confirmPassword) {
            setUpdated(!updated)
            setUser({
                ...user,
                password: confirmPassword
            });
        }
        //database password and input current password don't match
        else if (currentPassword !== user.password) {
            alert("Old password is wrong")
        }
        //new passwords don't match
        else if (password !== confirmPassword) {
            alert("New passwords don't match")
        }
        else (
            alert('Invalid password(s)')
        )
    }

    return (

        <Box component="form"
            sx={{
                '& .MuiTextField-root': { m: 2, width: '70%', maxWidth: '80%' },
                '& button': { m: 1 },
                display: 'flex',
                alignItems: "center",
                justifyContent: "center",
                flexDirection: 'column',
                mt: '5ch',
                pt: '3ch',
                pb: '3ch',
                width: '40vw',
                minWidth: '42ch',
                marginLeft: 'auto',
                marginRight: 'auto',
                borderRadius: '15px',
                backgroundColor: 'white'

            }}>
            <Typography variant="h4"
                sx={{
                    color: "black",
                    textAlign: 'center',
                    align: "center",
                    paddingBottom: '1ch',
                    paddingTop: '1ch',
                    pl: '1ch',
                    pr: '1ch'
                }} >Edit User Information</Typography>

            <TextField
                required
                id="outlined-required"
                name="firstName"
                placeholder="First Name"
                value={user.firstName}
                onChange={handleChange}
            />

            <TextField
                required
                id="outlined-required"
                name="lastName"
                placeholder="Last Name"
                value={user.lastName}
                onChange={handleChange}
            />

            <TextField
                required
                id="outlined-required"
                type="email"
                name="email"
                placeholder="Email"
                value={user.email}
                onChange={handleChange}
            />

            <TextField
                required
                id="outlined-required"
                label="Current Password"
                type="password"
                name='oldPassword'
                onChange={onChangeCurrentPassword}
            />

            <TextField
                required
                id="outlined-required"
                label="New Password"
                type="password"
                name="password"
                onChange={onChangePassword}
            />

            <TextField
                required
                id="outlined-required"
                label="Confirm New Password"
                type="password"
                onChange={onChangeConfirmPassword}

            /> <br></br>
            <Button onClick={handleSubmit} variant="outlined" size="large" sx={{ pl: '12ch', pr: '12ch' }} ><Typography sx={{ fontSize: '3ch' }}>Save</Typography></Button>
        </Box>

    )
}

export default ResetInfo
