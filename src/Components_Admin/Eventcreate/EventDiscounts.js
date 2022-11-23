import React, { useState, useEffect } from 'react'
import axios from 'axios';
import OneDiscountCreate from './OneDiscountCreate';
import CreateDiscount from './CreateDiscount';
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

function EventDiscounts(props) {
    //Modal open and close 
    const [open, setOpen] = useState(false);

    // Discount Modal Open and Close
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [data, setData] = useState([]);
    const [update, setUpdate] = useState(false);

    useEffect(function () {
        console.log("event discount");
        axios
            .post(`https://eventfull-backend.azurewebsites.net/discountsPerEvent?eventID=` + props.eventID)
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

    const discountList = function () {
        return data.map(function (res, i) {
            return (
                <OneDiscountCreate
                    item={res} setUpdate={setUpdate} update={update}
                />
            );
        });
    };

    return (
        <>
            {/* Discount Code Section */}
            <div>
                <Card sx={{
                    width: '40vw',
                    display: 'block', marginLeft: 'auto', marginRight: 'auto', marginTop: '20px',
                    minWidth: '350px', maxWidth: '750px'
                }}>
                    <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography sx={{ fontSize: 24 }} color="black">
                            Discount Codes
                        </Typography>
                        {/* Delete Discount Code Button */}
                        {/* <button> <img className='close-button' src={image} alt='delete button' /> </button> */}
                        <TableContainer component={Paper} sx={{ marginTop: "10px" }}>
                            <Table sx={{ minWidth: 250 }} aria-label="simple table">
                                <TableBody>
                                    <TableRow
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 }, color: "black" }}
                                    >
                                        <TableCell>Discount Value</TableCell>
                                        <TableCell>Discount Code/Name</TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                    {discountList()}
                                    <TableRow
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 }, color: 'black' }}
                                    >
                                        <TableCell colSpan={4} align='center'>
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
            <CreateDiscount open={open} handleClose={handleClose} eventID={props.eventID} setUpdate={setUpdate} update={update} />
        </>
    )
}

export default EventDiscounts