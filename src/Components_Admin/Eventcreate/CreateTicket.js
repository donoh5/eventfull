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

function CreateTicket(props) {
    const [ticket, setTicket] = useState({
        ticketDescription: '',
        price: 0,
        maxAmount: 0,
        eventID: props.eventID.toString()
    });

    //Created ticket information
    const onChangeTicketName = (e) => {
        const { value } = e.target;
        setTicket({
            ...ticket,
            ticketDescription: value,
            eventID: props.eventID.toString()
        });
    };

    const onChangeTicketPrice = (e) => {
        const { value } = e.target;
        setTicket({
            ...ticket,
            price: value,
            eventID: props.eventID.toString()
        });
    };

    const onChangeSetAmount = (e) => {
        const { value } = e.target;
        setTicket({
            ...ticket,
            maxAmount: value,
            eventID: props.eventID.toString()
        });
    };

    //Prevent Refresh
    function handleSubmit(e) {
        e.preventDefault();
        console.log("create ticket");
        axios
            .post(`https://eventfull-backend.azurewebsites.net/ticketType`, ticket)
            .then(function ({ data }) {
                if (!data) {
                    alert("Ticket creation failed")
                }
                else {
                    alert("Ticket created");
                    props.setUpdate(!props.update);
                    props.handleClose();
                }
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
                                Create Ticket
                            </Typography>
                            <Box sx={{ display: 'Grid', justifyContent: 'center', alignItems: 'center' }}>
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="TicketName"
                                    type='text'
                                    onChange={onChangeTicketName}
                                    sx={{ marginTop: '10px' }}
                                />
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Ticket Price"
                                    type='number'
                                    onChange={onChangeTicketPrice}
                                    sx={{ marginTop: '10px' }}
                                    InputProps={{ inputProps: { min: 0 } }}
                                />
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Quantity"
                                    type='number'
                                    onChange={onChangeSetAmount}
                                    sx={{ marginTop: '10px' }}
                                    InputProps={{ inputProps: { min: 0 } }}
                                />
                                <CardActions>
                                    <CommonButton onClick={handleSubmit}>Create Ticket</CommonButton>
                                </CardActions>
                            </Box>
                        </CardContent>
                    </Card>
                </div>
            </Modal>
        </div>
    )
}

export default CreateTicket