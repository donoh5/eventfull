import React, { useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import SelectTicket from './SelectTicket';
import { useEffect } from 'react';
import { DatasetLinked, DateRange } from '@mui/icons-material';
import Container from '@mui/material/Container';
import { CardActionArea, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { flexbox } from '@mui/system';
import { Box, ThemeProvider, createTheme } from '@mui/system';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import DateRangeIcon from '@mui/icons-material/DateRange';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Stack from '@mui/material/Stack';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

function Details(props) {
    const [eventData, setEventData] = useState({});
    const [stringDate, setStringDate] = useState('');
    const [eventTickets, setEventTickets] = useState([]);
    const [dateNum, setDateNum] = useState();
    const [dateMon, setDateMon] = useState();
    var dictTickets = {};
    const [addedTicket, setAddedTicket] = useState(false);
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    useEffect(function () {
        console.log("details")
        axios
            .post(
                `https://eventfull-backend.azurewebsites.net/event?eventID=` +
                props.eventID
            )
            .then(function ({ data }) {
                setEventData(data);
                var tempstringDate = new Date(data.date).toDateString();
                setStringDate(tempstringDate);

                // Getting Date Number & Month
                var tempMonth = new Date(data.date).toDateString().split(' ');
                setDateMon(tempMonth[1]);
                var tempNumber = new Date(data.date).getDate();
                setDateNum(tempNumber);
            })
            .catch(function (error) {
                console.log();
            });

        console.log("details")
        axios
            .post(
                `https://eventfull-backend.azurewebsites.net/getTickets?eventID=` +
                props.eventID
            )
            .then(function ({ data }) {
                setEventTickets(data);
            })
            .catch(function (error) {
                console.log();
            });
    }, []);

    useEffect(function () {

    }, []);

    const list = function () {
        return eventTickets.map(function (res, i) {
            return (
                <SelectTicket
                    item={res}
                    dictTickets={dictTickets}
                    addedTicket={addedTicket}
                />
            );
        });
    };

    const addToCart = () => {
        const dictSize = Object.keys(dictTickets).length;

        var i = 1;
        for (var key in dictTickets) {
            console.log("details")
            axios
                .post(
                    `https://eventfull-backend.azurewebsites.net/cart?userID=` +
                    props.userID +
                    `&ticketTypeID=` +
                    key +
                    `&quantity=` +
                    dictTickets[key]
                )
                .then(function ({ data }) {
                    if (i === dictSize) {
                        alert('Tickets added to cart');
                        setAddedTicket(!addedTicket);
                    } else {
                        i++;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    };

    if (props.logInStatus) {
        return (
            <>
                <Box
                    sx={{
                        border: 'none',
                        boxShadow: 'none',
                        maxWidth: { sx: '30', md: '60rem' },
                        pt: '5ch',
                        margin: 'auto',
                        marginBottom: { md: '1.5rem' },
                    }}
                >
                    <Box sx={{ backgroundColor: '#111111' }}>
                        <Stack
                            direction={{ xs: 'colum', md: 'row' }}
                            spacing={{ xs: 1, sm: 2, md: 4 }}
                        >
                            {/* Event Image */}
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <CardMedia
                                    sx={{
                                        maxWidth: { xs: '30rem', md: '60rem' },
                                        marginBottom: '1rem',
                                    }}
                                    component='img'
                                    src={`data:image/png;base64,${eventData.eventImage}`}
                                    alt='Event Image'
                                />
                            </div>

                            <Box>
                                <CardContent>
                                    {/* Event detail */}
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Box sx={{ display: 'flex' }}>
                                            {/* Date */}
                                            <Box sx={{ color: 'white', marginRight: '0.25rem' }}>
                                                <Typography
                                                    sx={{
                                                        color: 'coral',
                                                        fontSize: '33px',
                                                    }}
                                                >
                                                    {dateNum}
                                                </Typography>
                                                <Typography sx={{ textAlign: 'center', marginTop: 0 }}>
                                                    {dateMon}
                                                </Typography>
                                            </Box>
                                            {/* Title */}
                                            <Typography
                                                sx={{
                                                    marginLeft: '1rem',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    fontSize: '1.5rem',
                                                    color: 'white',
                                                }}
                                            >
                                                {eventData.eventName}
                                            </Typography>
                                        </Box>
                                    </div>

                                    <Box
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <CardContent sx={{ marginTop: '1rem' }}>
                                            {/* Date Time Location */}
                                            <Typography
                                                sx={{
                                                    fontSize: '13px',
                                                    margin: '0.25 rem',
                                                    color: 'white',
                                                }}
                                            >
                                                <Container sx={{ display: 'block' }}>
                                                    <Box sx={{ display: 'flex', marginBottom: '1rem' }}>
                                                        <DateRangeIcon
                                                            sx={{
                                                                color: 'coral',
                                                                marginRight: '1rem',
                                                            }}
                                                        />
                                                        <Box>
                                                            <Typography>Date</Typography>
                                                            {stringDate}
                                                        </Box>
                                                    </Box>

                                                    <Box sx={{ display: 'flex', marginBottom: '1rem' }}>
                                                        <AccessTimeIcon
                                                            sx={{ color: 'coral', marginRight: '1rem' }}
                                                        />
                                                        <Box>
                                                            <Typography>Time</Typography>
                                                            Starts: {eventData.startTime}
                                                            <br />
                                                            Ends: {eventData.endTime}
                                                        </Box>
                                                    </Box>

                                                    <Box sx={{ display: 'flex' }}>
                                                        <LocationOnIcon
                                                            sx={{
                                                                color: 'coral',
                                                                marginRight: '1rem',
                                                            }}
                                                        />
                                                        <Box>
                                                            <Typography>Location</Typography>
                                                            {eventData.locationName}
                                                            <br />
                                                            {eventData.eventLocation}
                                                        </Box>
                                                    </Box>
                                                </Container>
                                            </Typography>
                                        </CardContent>
                                    </Box>
                                </CardContent>
                            </Box>
                        </Stack>
                    </Box>

                    <Box sx={{ backgroundColor: '#111111' }}>
                        <Box sx={{ textAlign: 'center', color: 'white' }}>
                            <Typography>More Details</Typography>
                            <ExpandMore
                                expand={expanded}
                                onClick={handleExpandClick}
                                aria-expanded={expanded}
                                aria-label='show more'
                            >
                                <ExpandMoreIcon sx={{ color: 'white' }} />
                            </ExpandMore>
                        </Box>

                        <Box
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                maxWidth: { xs: '30rem', md: '50rem' },
                                color: 'white',
                            }}
                        >
                            <Collapse
                                in={expanded}
                                collapsedSize={5}
                                sx={{
                                    maxWidth: { xs: '30rem', md: '50rem' },
                                    marginX: { xs: '1.5rem', md: '3rem' },
                                    marginBottom: '2rem',
                                }}
                            >
                                <Typography sx={{ textAlign: 'justify' }}>
                                    {eventData.eventDescription}Look If you had one shot, or one
                                    opportunity To seize everything you ever wanted One moment
                                    Would you capture it or just let it slip?Look If you had one
                                    shot, or one opportunity To seize everything you ever wanted
                                    One moment Would you capture it or just let it slip?Look If
                                    you had one shot, or one opportunity To seize everything you
                                    ever wanted One moment Would you capture it or just let it
                                    slip?Look If you had one shot, or one opportunity To seize
                                    everything you ever wanted One moment Would you capture it or
                                    just let it slip?Look If you had one shot, or one opportunity
                                    To seize everything you ever wanted One moment Would you
                                    capture it or just let it slip?Look If you had one shot, or
                                    one opportunity To seize everything you ever wanted One moment
                                    Would you capture it or just let it slip?Look If you had one
                                    shot, or one opportunity To seize everything you ever wanted
                                    One moment Would you capture it or just let it slip?Look If
                                    you had one shot, or one opportunity To seize everything you
                                    ever wanted One moment Would you capture it or just let it
                                    slip?Look If you had one shot, or one opportunity To seize
                                    everything you ever wanted One moment Would you capture it or
                                    just let it slip?Look If you had one shot, or one opportunity
                                    To seize everything you ever wanted One moment Would you
                                    capture it or just let it slip?Look If you had one shot, or
                                    one opportunity To seize everything you ever wanted One moment
                                    Would you capture it or just let it slip?
                                </Typography>
                            </Collapse>
                        </Box>
                    </Box>

                    {/* Ticket */}
                    <Container sx={{ backgroundColor: '#111111' }}>
                        <Box
                            sx={{
                                '& button': { m: 1 },
                                color: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'column',
                                marginX: 'auto',
                                maxWidth: { xs: '15rem', md: '700px', md: '900px' },
                                minWidth: '300px',
                                paddingBottom: '2rem',
                            }}
                        >
                            {list()}
                            <Button
                                onClick={() => addToCart()}
                                sx={{
                                    backgroundColor: 'black',
                                    color: 'white',
                                }}
                            >
                                Add to Cart
                            </Button>
                        </Box>
                    </Container>
                </Box>
            </>
        );
    } else {
        return (
            <>
                <Card
                    sx={{
                        border: 'none',
                        boxShadow: 'none',
                        maxWidth: { sx: '30', md: '60rem' },
                        margin: 'auto',
                        marginTop: { md: '1.5rem' },
                    }}
                >
                    <Box sx={{ backgroundColor: '#111111' }}>
                        <Stack
                            direction={{ xs: 'colum', md: 'row' }}
                            spacing={{ xs: 1, sm: 2, md: 4 }}
                        >
                            {/* Event Image */}
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <CardMedia
                                    sx={{
                                        maxWidth: { xs: '30rem', md: '60rem' },
                                        marginBottom: '1rem',
                                    }}
                                    component='img'
                                    src={`data:image/png;base64,${eventData.eventImage}`}
                                    alt='Event Image'
                                />
                            </div>

                            <Box>
                                <CardContent>
                                    {/* Event detail */}
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Box sx={{ display: 'flex' }}>
                                            {/* Date */}
                                            <Box sx={{ color: 'white', marginRight: '0.25rem' }}>
                                                <Typography
                                                    sx={{
                                                        color: 'coral',
                                                        fontSize: '33px',
                                                    }}
                                                >
                                                    {dateNum}
                                                </Typography>
                                                <Typography sx={{ textAlign: 'center', marginTop: 0 }}>
                                                    {dateMon}
                                                </Typography>
                                            </Box>
                                            {/* Title */}
                                            <Typography
                                                sx={{
                                                    marginLeft: '1rem',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    fontSize: '1.5rem',
                                                    color: 'white',
                                                }}
                                            >
                                                {eventData.eventName}
                                            </Typography>
                                        </Box>
                                    </div>

                                    <Box
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <CardContent sx={{ marginTop: '1rem' }}>
                                            {/* Date Time Location */}
                                            <Typography
                                                sx={{
                                                    fontSize: '13px',
                                                    margin: '0.25 rem',
                                                    color: 'white',
                                                }}
                                            >
                                                <Container sx={{ display: 'block' }}>
                                                    <Box sx={{ display: 'flex', marginBottom: '1rem' }}>
                                                        <DateRangeIcon
                                                            sx={{
                                                                color: 'coral',
                                                                marginRight: '1rem',
                                                            }}
                                                        />
                                                        <Box>
                                                            <Typography>Date</Typography>
                                                            {stringDate}
                                                        </Box>
                                                    </Box>

                                                    <Box sx={{ display: 'flex', marginBottom: '1rem' }}>
                                                        <AccessTimeIcon
                                                            sx={{ color: 'coral', marginRight: '1rem' }}
                                                        />
                                                        <Box>
                                                            <Typography>Time</Typography>
                                                            Starts: {eventData.startTime}
                                                            <br />
                                                            Ends: {eventData.endTime}
                                                        </Box>
                                                    </Box>

                                                    <Box sx={{ display: 'flex' }}>
                                                        <LocationOnIcon
                                                            sx={{
                                                                color: 'coral',
                                                                marginRight: '1rem',
                                                            }}
                                                        />
                                                        <Box>
                                                            <Typography>Location</Typography>
                                                            {eventData.locationName}
                                                            <br />
                                                            {eventData.eventLocation}
                                                        </Box>
                                                    </Box>
                                                </Container>
                                            </Typography>
                                        </CardContent>
                                    </Box>
                                </CardContent>
                            </Box>
                        </Stack>
                    </Box>

                    <Box sx={{ backgroundColor: '#111111' }}>
                        <Box sx={{ textAlign: 'center', color: 'white' }}>
                            <Typography>More Details</Typography>
                            <ExpandMore
                                expand={expanded}
                                onClick={handleExpandClick}
                                aria-expanded={expanded}
                                aria-label='show more'
                            >
                                <ExpandMoreIcon sx={{ color: 'white' }} />
                            </ExpandMore>
                        </Box>

                        <Box
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                maxWidth: { xs: '30rem', md: '50rem' },
                                color: 'white',
                            }}
                        >
                            <Collapse
                                in={expanded}
                                collapsedSize={5}
                                sx={{
                                    maxWidth: { xs: '30rem', md: '50rem' },
                                    marginX: { xs: '1.5rem', md: '3rem' },
                                    marginBottom: '2rem',
                                }}
                            >
                                <Typography sx={{ textAlign: 'justify' }}>
                                    {eventData.eventDescription}Look If you had one shot, or one
                                    opportunity To seize everything you ever wanted One moment
                                    Would you capture it or just let it slip?Look If you had one
                                    shot, or one opportunity To seize everything you ever wanted
                                    One moment Would you capture it or just let it slip?Look If
                                    you had one shot, or one opportunity To seize everything you
                                    ever wanted One moment Would you capture it or just let it
                                    slip?Look If you had one shot, or one opportunity To seize
                                    everything you ever wanted One moment Would you capture it or
                                    just let it slip?Look If you had one shot, or one opportunity
                                    To seize everything you ever wanted One moment Would you
                                    capture it or just let it slip?Look If you had one shot, or
                                    one opportunity To seize everything you ever wanted One moment
                                    Would you capture it or just let it slip?Look If you had one
                                    shot, or one opportunity To seize everything you ever wanted
                                    One moment Would you capture it or just let it slip?Look If
                                    you had one shot, or one opportunity To seize everything you
                                    ever wanted One moment Would you capture it or just let it
                                    slip?Look If you had one shot, or one opportunity To seize
                                    everything you ever wanted One moment Would you capture it or
                                    just let it slip?Look If you had one shot, or one opportunity
                                    To seize everything you ever wanted One moment Would you
                                    capture it or just let it slip?Look If you had one shot, or
                                    one opportunity To seize everything you ever wanted One moment
                                    Would you capture it or just let it slip?
                                </Typography>
                            </Collapse>
                        </Box>
                    </Box>

                    {/* Ticket */}
                    <Container
                        sx={{
                            backgroundColor: '#111111',
                            paddingBottom: '2rem',
                        }}
                    >
                        <Box
                            sx={{
                                '& button': { m: 1 },
                                color: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'column',
                                marginX: 'auto',
                                maxWidth: { xs: '15rem', md: '700px', md: '900px' },
                                minWidth: '300px',
                            }}
                        >
                            {list()}
                            <Link to='/Login'>
                                <Button
                                    sx={{
                                        backgroundColor: 'white',
                                        color: 'black',
                                    }}
                                >
                                    LogIn to Buy Tickets
                                </Button>
                            </Link>
                        </Box>
                    </Container>
                </Card>
            </>
        );
    }
}

export default Details;
