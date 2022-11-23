import React, { useEffect, useState } from 'react'
import axios from 'axios';
import CreateTicket from './CreateTicket'
import OneTicketCreate from './OneTicketCreate';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Typography } from '@mui/material';
import { IconButton } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function EventTickets(props) {
    //Modal open and close 
    const [open, setOpen] = useState(false);

    //Ticket Modal Open and Close
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [update, setUpdate] = useState(false);
    const [data, setData] = useState([]);

    useEffect(function () {
        console.log("event ticket");
        axios
            .post(`https://eventfull-backend.azurewebsites.net/getTickets?eventID=` + props.eventID)
            .then(function ({ data }) {
                setData(data)
            })
            .catch(function (error) {
                console.log(error)
            });
    }, [update]);

    useEffect(function () {
        setUpdate(true);
    }, []);

    const ticketList = function () {
        return data.map(function (res, i) {
            return (
                <OneTicketCreate
                    item={res} setUpdate={setUpdate} update={update}
                />
            );
        });
    };

    return (
        <>
            {/* Card to hold created tickets */}
            <div>
                <Card sx={{
                    width: '40vw',
                    display: 'block', marginLeft: 'auto', marginRight: 'auto',
                    minWidth: '350px', maxWidth: '750px'
                }}>
                    <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography sx={{ fontSize: 24, color: 'black' }} >
                            Tickets
                        </Typography>
                        {/* Delete Ticket Button */}
                        {/* <button> <img className='close-button' src={image} alt='close button' /> </button> */}
                        <TableContainer component={Paper} sx={{ marginTop: "10px" }} >
                            <Table sx={{
                                minWidth: 250,
                                color: 'black'
                            }}
                                aria-label="simple table">
                                <TableBody>
                                    <TableRow
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 }, color: 'black' }}
                                    >
                                        <TableCell>Ticket Name</TableCell>
                                        <TableCell>Ticket Price</TableCell>
                                        <TableCell>Amount</TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                    {ticketList()}
                                    <TableRow
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 }, color: 'black' }}
                                    >
                                        <TableCell colSpan={5} align='center'>
                                            <IconButton onClick={handleOpen} sx={{}}>
                                                <AddCircleIcon sx={{
                                                    fontSize: { xs: "6vw", md: "2vw", lg: "2vw", color: "black" }
                                                }} />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </CardContent>
                </Card>
            </div>
            {/* Button to open Dicount Creation modal */}
            {/* Discount Code Section */}
            <CreateTicket open={open} handleClose={handleClose} eventID={props.eventID} setUpdate={setUpdate} update={update} />
        </>
    )
}

export default EventTickets