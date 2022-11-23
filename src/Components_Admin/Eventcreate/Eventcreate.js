import React, { useState, useEffect } from 'react'
import axios from 'axios'
import EventTickets from './EventTickets'
import EventDiscounts from './EventDiscounts'
import EventCreateBase from './EventCreateBase'
import { Box, Typography } from '@mui/material'

function Eventcreate(props) {
    const [event, setEvent] = useState({
        eventID: '',
        eventName: '',
        eventLocation: '',
        locationName: '',
        eventSize: 0,
        eventDescription: '',
        date: '',
        startTime: '',
        endTime: '',
        eventImage: '',
        activeStatus: true
    });

    useEffect(function () {
        if (props.isEdit === true) {
            setEvent({
                ...event,
                eventID: props.event.eventID,
                eventName: props.event.eventName,
                eventLocation: props.event.eventLocation,
                locationName: props.event.locationName,
                eventSize: props.event.eventSize,
                eventDescription: props.event.eventDescription,
                date: props.event.date.substring(0, 10),
                startTime: props.event.startTime,
                endTime: props.event.endTime,
                eventImage: props.event.eventImage,
                activeStatus: props.event.activeStatus
            });
        }
        else{
            setEvent({
                ...event,
                eventID: '',
                eventName: '',
                eventLocation: '',
                locationName: '',
                eventSize: 0,
                eventDescription: '',
                date: '',
                startTime: '',
                endTime: '',
                eventImage: '',
                activeStatus: true
            });
        }
    }, [props.isEdit])

    //update event object
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEvent({
            ...event,
            [name]: value,
        });
    };

    //handle event capacity change
    const handleSizeChange = (e) => {
        const { value } = e.target;
        setEvent({
            ...event,
            eventSize: parseInt(value),
        });
    };

    //handle image upload
    const onChangeImage = function (File) {
        if(File.size.split(" ")[0] > 500){
            alert("Image size must be less than 500kb");
        }
        else{
            var imageString = File.base64
            var comma = imageString.indexOf(',')
            var newImageString = imageString.substring(comma + 1, imageString.length)
            setEvent({
                ...event,
                eventImage: newImageString
            });
        }
    }

    //change active status of event
    const handleChangeActive = (e) => {
        setEvent({
            ...event,
            activeStatus: e.target.checked,
        });
    };
 
    const submitEvent = () => {
        if (props.isEdit === false) {
            console.log("create event");
            axios
                .post(`https://eventfull-backend.azurewebsites.net/createEvent`, event)
                .then(function ({ data }) {
                    alert("Event created");
                    return props.setEvent(data);
                })
                .then(function () {
                    props.setIsEdit(true);
                })
                .catch(function (error) {
                    console.log(error)
                });
        }
        // isEdit === true
        else {
            console.log("create event");
            axios
                .put(`https://eventfull-backend.azurewebsites.net/updateEvent`, event)
                .then(function ({ data }) {
                    alert("Event details upated")
                })
                .catch(function (error) {
                    console.log(error)
                });
        }
    }

    if (props.isEdit === false) {
        return (
            <>
                <Typography sx={{
                    textAlign: 'center',
                    fontSize: { xs: '10vw', md: ' 8vw', lg: '6vw' },
                    color: 'black',
                    padding: '2rem'
                }}></Typography>
                <Box component="form" bgcolor="lightgrey"
                    sx={{
                        '& button': { m: 1 },
                        border: 1,
                        borderColor: 'black',
                        maxWidth: { xs: '380px', md: '700px', lg: '900px' },
                        minWidth: '380px',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        boxShadow: '10',
                        display: 'Grid',
                        justifyContent: 'center',
                        justifyItems: 'center',
                        paddingBottom: '1rem'
                    }}>
                    <EventCreateBase event={event} handleChange={handleChange} handleSizeChange={handleSizeChange}
                        onChangeImage={onChangeImage} handleChangeActive={handleChangeActive} submitEvent={submitEvent} />
                </Box>
            </>
        )
    }
    else {
        return (
            <>
                <Typography sx={{
                    textAlign: 'center',
                    fontSize: { xs: '10vw', md: ' 8vw', lg: '6vw' },
                    color: 'black',
                    padding: '2rem'
                }}></Typography>
                <Box component="form" bgcolor="lightgrey"
                    sx={{
                        '& button': { m: 1 },
                        border: 1,
                        borderColor: 'black',
                        maxWidth: { xs: '380px', md: '700px', lg: '900px' },
                        minWidth: '380px',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        boxShadow: '10',
                        display: 'Grid',
                        justifyContent: 'center',
                        justifyItems: 'center',
                        paddingBottom: '1rem'
                    }}>
                    <EventCreateBase event={event} handleChange={handleChange} handleSizeChange={handleSizeChange}
                        onChangeImage={onChangeImage} handleChangeActive={handleChangeActive} submitEvent={submitEvent} />
                    <EventTickets eventID={event.eventID} />
                    <EventDiscounts eventID={event.eventID} />
                </Box>
            </>
        )
    }
}

export default Eventcreate
