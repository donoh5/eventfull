import React, { Component } from 'react';
import {useEffect, useState} from 'react'
import axios from 'axios'
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


function DesktopTickets(props) {
    const [ticketDesc, setTicketDesc] = useState('');

    useEffect(function(){
        console.log("desktop tickets")
      axios
        .post(`https://eventfull-backend.azurewebsites.net/ticketDesc?ticketTypeID=` + props.ticket.ticketTypeID)
        .then(function({data}){
          setTicketDesc(data)
        })
        .catch(function(error){
          console.log(error)
        })
      }, [])

      const sendTicket = function(){
        console.log("desktop tickets")
        axios
          .post(`https://eventfull-backend.azurewebsites.net/sendEmail?ticketID=` + props.ticket.ticketID)
          .then(function({data}){
            alert("Ticket Emailed.")
            console.log(data)
          })
          .catch(function(error){
            console.log(error)
          })
      }

    return ( 

            <TableRow>
            <TableCell>{ticketDesc}</TableCell>
            <TableCell>{props.ticket.ticketID}</TableCell>
            <TableCell align='right'><Button onClick={sendTicket}>Email Ticket</Button></TableCell>
          </TableRow>




     );
}

export default DesktopTickets;