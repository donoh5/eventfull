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
      }}
    >
      <Box sx={{ paddingX: '3.5rem', borderRadius: '5px', border: '2px black'}}>{list()}</Box>
    </Box>
  );
};

export default UpcomingEvent;
