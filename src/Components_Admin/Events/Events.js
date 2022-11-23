import React from 'react';
import OneEvent from './OneEvent';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';

const Event = (props) => {
  const [events, setEvents] = useState([]);
  useEffect(function () {
    console.log("event")
    axios
      .get(`https://eventfull-backend.azurewebsites.net/eventsAdmin`)
      .then(function ({ data }) {
        setEvents(data);
      })
      .catch(function (error) {
        console.log('');
      });
  }, []);

  const list = function () {
    return events.map(function (res, i) {
      return <OneEvent item={res} setEvent={props.setEvent} />;
    });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Box item sx={{ paddingX: '3.5rem' }}>
        {list()}
      </Box>
    </Box>
  );
};

export default Event;
