import React from 'react';
import OneMyEvent from './OneMyEvent';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Container, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';

const MyEvent = (props) => {
  const [events, setEvents] = useState([]);

  //need to change this axios
  useEffect(function () {
    console.log("myevent")
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
};

export default MyEvent;
