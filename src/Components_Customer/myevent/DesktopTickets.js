import React from 'react';
import {useEffect, useState} from 'react'
import axios from 'axios'
import Button from '@mui/material/Button';
import TableCell from '@mui/material/TableCell';
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