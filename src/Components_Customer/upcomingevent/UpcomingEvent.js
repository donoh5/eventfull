import React from 'react';
import OneEvent from './OneEvent';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box } from '@mui/material';

const UpcomingEvent = (props) => {
    const [events, setEvents] = useState([]);
    useEffect(function () {
        axios
            .get(`https://eventfull-backend.azurewebsites.net/events`)
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
            return <OneEvent item={res} setEventID={props.setEventID} />;
        });
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: 'auto'
            }}
        >
            <Box sx={{ borderRadius: '5px', border: '2px black', height: 'auto' }}>{list()}</Box>
        </Box>
    );
};

export default UpcomingEvent;
