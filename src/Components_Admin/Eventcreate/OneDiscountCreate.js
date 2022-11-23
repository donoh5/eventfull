import React, { useState } from 'react'
import axios from 'axios';
import EditDiscount from './EditDiscount';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Button } from '@mui/material';

function OneDiscountCreate(props) {
    const onClickDelete = () => {
        axios
            .delete(`https://eventfull-backend.azurewebsites.net/discount?discountCode=` + props.item.discountCode)
            .then(function ({ data }) {
                props.setUpdate(!props.update);
                alert("Discount code deleted");
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
                sx={{ '&:last-child td, &:last-child th': { border: 0 }, color: "black" }}
            >
                <TableCell>{props.item.discountValue + "% Off"}</TableCell>
                <TableCell>{props.item.discountCode}</TableCell>
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
            <EditDiscount open={open} handleClose={handleClose} discount={props.item} setUpdate={props.setUpdate} update={props.update} />
        </>
    )
}

export default OneDiscountCreate
