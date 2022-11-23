import React, { useState } from 'react'
import axios from 'axios';
import EditTicket from './EditTicket';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Button } from '@mui/material';

function OneTicketCreate(props) {
    const onClickDelete = () => {
        axios
            .delete(`https://eventfull-backend.azurewebsites.net/ticketType?ticketTypeID=` + props.item.ticketTypeID)
            .then(function ({ data }) {
                props.setUpdate(!props.update);
                alert("Ticket deleted");
            })
            .catch(function (error) {
                console.log(error)
            });
    };

    //Modal open and close 
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 }, color: 'black' }}
            >
                <TableCell>{props.item.ticketDescription}</TableCell>
                <TableCell>{props.item.price}</TableCell>
                <TableCell>{props.item.maxAmount}</TableCell>
                <TableCell>
                    <Button onClick={handleOpen}>
                        Edit
                    </Button>
                </TableCell>
                <TableCell>
                    <Button onClick={onClickDelete}>
                        Delete
                    </Button>
                </TableCell>
            </TableRow>
            <EditTicket open={open} handleClose={handleClose} ticket={props.item} setUpdate={props.setUpdate} update={props.update} />
        </>
    )
}

export default OneTicketCreate
