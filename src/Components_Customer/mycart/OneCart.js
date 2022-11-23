import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { SettingsBackupRestoreSharp } from '@mui/icons-material';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { Box } from '@mui/system';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';



function OneCart(props) {

  const [count, setCount] = useState(props.item.quantity);
  const [ticketDesc, setTicketDesc] = useState({})
  const [event, setEvent] = useState({});
  const [loaded, setLoaded] = useState(false);


  //dont let count exceed max tickets
  const updateCount = (plus) => {
    if (plus) {
      if (count === parseInt(ticketDesc.maxAmount)) {
        alert("Only " + ticketDesc.maxAmount + ' tickets available');
      }
      else {
        setCount(count + 1);
      }
    } else {
      if (count == 1) {
        setCount(1);
      } else {
        setCount(count - 1);

      }
    }
  };

  useEffect(function () {
    if(loaded){
        console.log("one cart")
    axios
      .put(`https://eventfull-backend.azurewebsites.net/cart?userID=` + props.item.userID + `&ticketTypeID=` + props.item.ticketTypeID + `&quantity=` + count)
      .then(function ({ data }) {
        props.setCartChanged(!props.cartChanged)
      })
      .catch(function (error) {
        console.log();
      })
    }
  }, [count]);

  useEffect(function () {
    console.log("one cart")
    console.log(props.item.ticketTypeID)
    axios
      .post(`https://eventfull-backend.azurewebsites.net/getTicket?ticketTypeID=` + props.item.ticketTypeID)
      .then(function ({ data }) {
        setTicketDesc(data);
        setLoaded(true);
      })
      .catch(function (error) {
        console.log();
      })
  }, []);

  useEffect(function () {
    if(loaded){
        console.log("one cart")
        console.log(ticketDesc.eventID)
        axios
          .post(`https://eventfull-backend.azurewebsites.net/event?eventID=` + ticketDesc.eventID)
          .then(function ({ data }) {
            setEvent(data)
          })
          .catch(function (error) {
            console.log();
          })
    }
  }, [ticketDesc]);



  const deleteItem = () => {
    console.log("one cart")
    axios
      .delete(`https://eventfull-backend.azurewebsites.net/cart?userID=` + props.item.userID + `&ticketTypeID=` + props.item.ticketTypeID)
      .then(function ({ data }) {
        console.log(data)
        alert('Item deleted')
        document.location.reload(true)
      })
      .catch(function (error) {
        console.log(error)
      })
  }



  return (
    <>
      <TableRow sx={{ display: { xs: 'none', md: 'table-row' }, pl: '1vw', pr: '1vw', borderBottom: "2px solid gray", height: '11vh'}}>
        <TableCell >
          <Typography sx={{ fontSize: '2ch' }}>{event.eventName}</Typography>
          <Typography sx={{ color: 'red', opacity: '0.5', fontStyle: 'italic' }}>{props.item.discountCode}</Typography>
        </TableCell>
        <TableCell align="center" sx={{ pl: '0', pr: '0', pt: '1rem', pb: '1rem' }}><Typography sx={{ fontSize: '1.5' }}>${ticketDesc.price}</Typography></TableCell>
        <TableCell align="center" sx={{ pl: '0', pr: '0', pt: '1rem', pb: '1rem' }}><Typography sx={{ fontSize: '1.5' }}>{ticketDesc.ticketDescription}</Typography></TableCell>
        <TableCell align="center" sx={{
          borderBottom: 'none'
        }}>
          <Box sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: 'row',
          }}>
            <RemoveCircleOutlineIcon onClick={() => updateCount(false)} />

            <Typography sx={{ width: '5ch', fontSize: '2.5ch', m: '0' }}>{count}</Typography>
            <AddCircleOutlineIcon onClick={() => updateCount(true)} />

          </Box>
        </TableCell>
        <TableCell align="right" sx={{ pl: '0', pr: '0' }}>
          <Box sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <HighlightOffIcon onClick={deleteItem} />
          </Box>
        </TableCell>
      </TableRow>
      <Box sx={{ display: { xs: 'content', md: 'none' } }}>
        <TableContainer sx={{ pt: '1ch', pb: '1ch' }}>
          <Table size="small" aria-label="a dense table" sx={{ ml: '0', mr: '0', width: '100%' }}>
            <TableRow sx={{pt: '3ch', pb: '3ch'}} >
              <TableCell sx={{ width: '60%' }}>
                <Box>
                  <Typography sx={{ fontSize: '2.2ch' }}>{event.eventName}</Typography>
                  <Typography>{ticketDesc.ticketDescription} x ${ticketDesc.price}</Typography>

                  <Typography>{props.item.discountCode}</Typography>
                </Box>

              </TableCell>
              <TableCell sx={{ p: '0', mt: '0', mb: '0' }}>


                <Box sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: 'row',
                }}>
                  <RemoveCircleOutlineIcon onClick={() => updateCount(false)} sx={{ fontSize: '5ch' }} />
                  <Typography sx={{ fontSize: '4ch', pl: '1ch', pr: '1ch' }}>{count}</Typography>
                  <AddCircleOutlineIcon onClick={() => updateCount(true)} sx={{ fontSize: '5ch' }} />



                </Box>
              </TableCell>
              <TableCell sx={{ pl: '2ch', pr: '2ch' }}>
                <Box sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: 'row',
                }}>
                  <HighlightOffIcon onClick={deleteItem} sx={{ fontSize: '4ch' }} />
                </Box>
              </TableCell>
            </TableRow>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}

export default OneCart;


