import React from 'react'
import FileBase64 from 'react-file-base64'
import { Box, TextField, Typography } from '@mui/material'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';

function EventCreateBase(props) {
    return (
        <>
            <Typography variant="h4"
                sx={{
                    color: "black",
                    textAlign: 'center',
                    align: "center",
                    paddingTop: '1rem',
                    paddingBottom: '1rem'
                }} >Event Information</Typography>
            <Box sx={{
                maxWidth: '380px', alignContent: 'center', alignItems: 'center', display: 'Grid',
            }}>
                <TextField
                    required
                    placeholder='Event Name'
                    name='eventName'
                    type='text'
                    value={props.event.eventName}
                    onChange={props.handleChange}
                />
                <TextField
                    required
                    placeholder="Date"
                    name='date'
                    type='date'
                    value={props.event.date}
                    onChange={props.handleChange}
                />
                <Grid container spacing={0}>
                    <Grid item xs={6}>
                        <TextField
                            required
                            fullWidth
                            placeholder="Start Time"
                            name='startTime'
                            type='time'
                            value={props.event.startTime}
                            onChange={props.handleChange}
                            sx={{ width: '180px' }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            required
                            fullWidth
                            placeholder="End Time"
                            name='endTime'
                            type='time'
                            value={props.event.endTime}
                            onChange={props.handleChange}
                            sx={{ width: '180px' }}
                        />
                    </Grid>
                </Grid>
                <TextField
                    required
                    placeholder="Location Name"
                    name='locationName'
                    type='text'
                    value={props.event.locationName}
                    onChange={props.handleChange}
                />
                <TextField
                    required
                    placeholder="Location Address"
                    name='eventLocation'
                    type='text'
                    value={props.event.eventLocation}
                    onChange={props.handleChange}
                />
                <TextField
                    required
                    placeholder="Capacity"
                    name='eventSize'
                    type="number"
                    value={props.event.eventSize}
                    onChange={props.handleSizeChange}
                />
            </Box>
            <Typography variant="h4"
                sx={{
                    color: "black",
                    textAlign: 'center',
                    align: "center",
                    paddingTop: '1rem'
                }} >Event Description</Typography>
            <TextField
                color='primary'
                multiline
                fullWidth
                size='Normal'
                rows={18}
                name='eventDescription'
                value={props.event.eventDescription}
                onChange={props.handleChange}
                sx={{
                    maxWidth: '50ch',
                    paddingTop: '1.5rem',
                    paddingBottom: '3rem',
                    width: { xs: '40ch', md: '45ch' },
                }}
            />
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: 'column',
                }}>
                <Typography variant="h6"
                    sx={{
                        color: "black",
                        textAlign: 'center',
                        align: "center",
                        paddingTop: '.1rem',

                    }} >Upload Event Image(.png only)</Typography>
                <FileBase64 multiple={false} name='eventImage' onDone={props.onChangeImage.bind(this)}></FileBase64>
            </Box>
            <h4>Active:</h4>

            <Switch
                checked={props.event.activeStatus}
                onChange={props.handleChangeActive}
                inputProps={{ 'aria-label': 'controlled' }}
            />
            <Button onClick={props.submitEvent}>Submit</Button>
        </>
    )
}

export default EventCreateBase