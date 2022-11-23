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

function CreateDiscount(props) {
    const [discount, setDiscount] = useState({
        discountValue: 0,
        discountCode: '',
        eventID: props.eventID.toString()
    });

    const onChangeDiscountValue = (e) => {
        const { value } = e.target;
        setDiscount({
            ...discount,
            discountValue: value,
            eventID: props.eventID.toString()
        });
    };

    const onChangeDiscountCode = (e) => {
        const { value } = e.target;
        setDiscount({
            ...discount,
            discountCode: value,
            eventID: props.eventID.toString()
        });
    };

    function handleSubmit(e) {
        e.preventDefault();
        console.log("create discount");
        axios
            .post(`https://eventfull-backend.azurewebsites.net/discounts`, discount)
            .then(function ({ data }) {
                if(!data){
                    alert("Discount code already exists")
                }
                else{
                    alert("Discount code created")
                    props.setUpdate(!props.update);
                    props.handleClose();
                }
            })
            .catch(function (error) {
                console.log(error)
            });
    };

    return (
        <div>
            <Modal
                open={props.open}
                onClose={props.handleClose}
                variant="outlined"
            >
                {/* Card to Create Discount Codes */}
                <div>
                    <Card sx={{ width: '40vw', minWidth: '350px', display: 'block', marginLeft: 'auto', marginRight: 'auto', marginTop: '10rem' }}>
                        <CardContent>
                            <IconButton onClick={props.handleClose} sx={{ background: 'black', float: 'right', margin: 0 }}> <CloseIcon sx={{ color: 'white' }} /></IconButton>
                            <Typography sx={{ fontSize: 24, textAlign: 'center' }} color="black">
                                Create Discount
                            </Typography>
                            <Box sx={{ display: 'Grid', justifyContent: 'center', alignItems: 'center' }}>
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Discount Value"
                                    type='number'
                                    onChange={onChangeDiscountValue}
                                    sx={{ marginTop: '10px' }}
                                    InputProps={{ inputProps: { min: 0 } }}
                                />
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Discount Code"
                                    type='text'
                                    onChange={onChangeDiscountCode}
                                    sx={{ marginTop: '10px' }}
                                />
                                <CardActions>
                                    <CommonButton onClick={handleSubmit}>Create Discount</CommonButton>
                                </CardActions>
                            </Box>
                        </CardContent>
                    </Card>
                </div>
            </Modal>
        </div>
    )
}

export default CreateDiscount