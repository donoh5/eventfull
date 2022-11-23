import React, { Component } from 'react';
import {useEffect, useState} from 'react'
import axios from 'axios'
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
function MobileTickets(props) {
  const [ticketDesc, setTicketDesc] = useState('');

  useEffect(function(){
    console.log("mobile tickets")
    axios
      .post(`https://eventfull-backend.azurewebsites.net/ticketDesc?ticketTypeID=` + props.ticket.ticketTypeID)
      .then(function({data}){
        setTicketDesc(data)
      })
      .catch(function(error){
        console.log(error)
      })
    }, [])
  
  return ( 
    <div>
      <Box sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: 'column',
        backgroundColor: 'white'
      }}>
        <Typography >{ticketDesc}</Typography>
            <img
              component='img'
              src={`data:image/png;base64,${props.ticket.ticketQRID}`}
              alt='QRCode'
            />
            <Typography>{props.ticket.ticketID}</Typography>
            </Box>
    </div>


   );
}

export default MobileTickets;