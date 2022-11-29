import React from 'react';
import OneMyEvent from './OneMyEvent';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Container, Typography } from '@mui/material';


const MyEvent = (props) => {
    const [events, setEvents] = useState([]);

    useEffect(function () {
        axios
            .post(
                `https://eventfull-backend.azurewebsites.net/myEvent?userID=` +
                props.userID
            )
            .then(function ({ data }) {
                setEvents(data);
            })
            .catch(function (error) {
                console.log('');
            });

        if (localStorage.getItem('logInTime') != null &&
            Date.parse(localStorage.getItem('logInTime')) >=
            new Date().setMinutes(new Date().getMinutes() - 10)) {
            localStorage.setItem('logInTime', new Date().toString());
        }
    }, []);

    const list = function () {
        return events.map(function (res, i) {
            return (
                <OneMyEvent
                    item={res}
                    setEventID={props.setEventID}
                    userID={props.userID}
                    userName={props.userName}
                />
            );
        });
    };
    if (list.length < 1) {
        return (

            <Typography sx={{
                fontSize: { xs: '3ch', md: '10ch' },
                textDecorationLine: 'underline',
                color: 'white',
                textAlign: 'center',
                pt: { xs: '4ch', md: '2ch' },
                width: '80%',
                ml: 'auto',
                mr: 'auto'
            }}>Oh No!<br /> Looks like you dont have any tickets for any events!</Typography>
        );
    }
    else {
        return (
            <Container
                maxWidth={false}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Box>{list()}</Box>
            </Container>
        );
    }

};

export default MyEvent;
