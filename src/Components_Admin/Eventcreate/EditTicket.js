import React, { useState } from 'react'
import axios from 'axios';
import Modal from '@mui/material/Modal';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import CommonButton from '../common/CommonButton';
import { IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';

function EditTicket(props) {
    const [ticket, setTicket] = useState({
        ticketTypeID: props.ticket.ticketTypeID,
        ticketDescription: props.ticket.ticketDescription,
        price: props.ticket.price,
        maxAmount: props.ticket.maxAmount,
        eventID: props.ticket.eventID
    });

    //Created ticket information
    const onChangeTicketName = (e) => {
        const { value } = e.target;
        setTicket({
            ...ticket,
            ticketDescription: value
        });
    };

    const onChangeTicketPrice = (e) => {
        const { value } = e.target;
        setTicket({
            ...ticket,
            price: value
        });
    };

    const onChangeSetAmount = (e) => {
        const { value } = e.target;
        setTicket({
            ...ticket,
            maxAmount: value
        });
    };

    //Prevent Refresh
    function handleSubmit(e) {
        e.preventDefault();
        axios
            .put(`https://eventfull-backend.azurewebsites.net/ticketType`, ticket)
            .then(function ({ data }) {
                alert("Ticket updated")
                props.setUpdate(!props.update);
                props.handleClose();
            })
            .catch(function (error) {
                console.log(error)
            });
    }

    return (
        <div>
            <Modal
                open={props.open}
                onClose={props.handleClose}
                variant="outlined"
            >
                {/* Card to Create tickets */}
                <div>
                    <Card sx={{ width: '40vw', minWidth: '350px', display: 'Grid', marginLeft: 'auto', marginRight: 'auto', marginTop: '10rem' }}>
                        <CardContent>
                            <IconButton onClick={props.handleClose} sx={{ background: 'black', float: 'right', margin: 0 }}> <CloseIcon sx={{ color: 'white' }} /></IconButton>
                            <Typography sx={{ fontSize: 24, textAlign: 'center' }} color="black">
                                Update Ticket
                            </Typography>
                            <Box sx={{ display: 'Grid', justifyContent: 'center', alignItems: 'center' }}>
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="TicketName"
                                    type='text'
                                    value={ticket.ticketDescription}
                                    onChange={onChangeTicketName}
                                    sx={{ marginTop: '10px' }}
                                />
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Ticket Price"
                                    type='number'
                                    value={ticket.price}
                                    onChange={onChangeTicketPrice}
                                    sx={{ marginTop: '10px' }}
                                    InputProps={{ inputProps: { min: 0 } }}
                                />
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Quantity"
                                    type='number'
                                    value={ticket.maxAmount}
                                    onChange={onChangeSetAmount}
                                    sx={{ marginTop: '10px' }}
                                    InputProps={{ inputProps: { min: 0 } }}
                                />
                                <CardActions>
                                    <CommonButton onClick={handleSubmit}>Update Ticket</CommonButton>
                                </CardActions>
                            </Box>
                        </CardContent>
                    </Card>
                </div>
            </Modal>
        </div>
    )
}

export default EditTicket