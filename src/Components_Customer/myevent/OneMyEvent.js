import React from 'react';
import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useSwipeable } from 'react-swipeable';
import SwipeableViews from 'react-swipeable-views-react-18-fix/lib/SwipeableViews';
import { useTheme } from '@mui/material/styles';
import MobileTickets from './MobileTickets';
import DesktopTickets from './DesktopTickets';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import LocationOnIcon from '@mui/icons-material/LocationOn';

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

function OneMyEvent(props) {
  var date = new Date(props.item.date).toDateString();
  const [expanded, setExpanded] = React.useState(false);

  const redirect = {
    pathname: '/Details/' + props.item.eventID,
    param1: props.item.eventID,
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [ticket, setTicket] = useState([]);

  //axios to get AR codes (NEED TO CHANGE)
  useEffect(function () {
    console.log('one my event');
    axios
      .post(
        `https://eventfull-backend.azurewebsites.net/getQRPerEvent?eventID=` +
          props.item.eventID +
          `&userID=` +
          props.userID
      )
      .then(function ({ data }) {
        setTicket(data);
        console.log(data);
      })
      .catch(function (error) {
        console.log('');
      });
  }, []);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setActiveStep(0);
  };

  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = ticket.length;

  const handleStepChange = (step) => {
    setActiveStep(step);
  };
  const handlers = useSwipeable({
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <>
      {/* For Desktop Interface */}
      <Card
        sx={{
          display: { xs: 'none', md: 'inherit' },
          marginY: { xs: '3.5rem', md: '4rem' },
          marginX: 'auto',
          borderRadius: '5px',
          width: { md: '50vw' },
          boxShadow: '1ch',
        }}
      >
        {/* Event Image */}
        <CardMedia
          sx={{ maxHeight: 300 }}
          component='img'
          src={`data:image/png;base64,${props.item.eventImage}`}
          alt='Event Image'
        />
        {/* Event Details */}
        <CardContent sx={{ backgroundColor: '#495057', color: 'white' }}>
          <Typography sx={{ fontSize: '1.3rem', fontWeight: '500' }}>
            {props.item.eventName}
          </Typography>
          <Typography
            sx={{
              display: 'block',
              fontSize: '0.85rem',
              marginBottom: '.5rem',
            }}
          >
            {date} | {props.item.locationName}
          </Typography>
          <Typography sx={{ display: 'inline', fontSize: '0.9rem' }}>
            {' '}
            View My Tickets
          </Typography>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label='show more'
          >
            <ExpandMoreIcon />
          </ExpandMore>
          <Collapse in={expanded} timeout='auto' unmountOnExit>
            {/* anything in here will be shown in the collapsable area */}
            <CardContent>
              <TableContainer sx={{ pb: '5vh' }}>
                <Table
                  sx={{ minWidth: 650, fontSize: '2vw' }}
                  size='small'
                  aria-label='a dense table'
                >
                  <TableHead>
                    <TableRow sx={{}}>
                      <TableCell align='left'>Ticket Type</TableCell>
                      <TableCell align='left'>Ticket ID</TableCell>
                      <TableCell align='center'></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {ticket.map(function (res, i) {
                      return <DesktopTickets ticket={res} />;
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Collapse>
        </CardContent>
      </Card>

      {/* -------------------------------------------------------- */}

      {/* For mobile interface */}
      <Card
        sx={{
          display: { xs: 'inherit', md: 'none' },
          marginY: '3.5rem',
          marginX: 'auto',
          borderRadius: '5px',
          // width: '40rem',
          maxWidth: '25rem',
        }}
      >
        {/* Event Image */}
        <CardMedia
          onClick={handleOpen}
          sx={{ maxHeight: 200 }}
          component='img'
          src={`data:image/png;base64,${props.item.eventImage}`}
          alt='Event Image'
        />
        {/* Event Details */}
        <CardContent sx={{ backgroundColor: '#495057', color: 'white' }}>
          <Typography sx={{ fontSize: '1.3rem', fontWeight: '500' }}>
            {props.item.eventName}
          </Typography>
          <Typography
            sx={{
              display: 'inline',
              fontSize: '0.85rem',
            }}
          >
            {date} | {props.item.locationName}
          </Typography>
          <Typography
            sx={{
              marginTop: '0.75rem',
              textAlign: 'center',
              fontSize: '0.5rem',
            }}
          >
            Click for QR Code
          </Typography>
        </CardContent>
        <div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box sx={{ maxWidth: 400, flexGrow: 1, backgroundColor: 'white' }}>
              <Paper
                square
                elevation={0}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  height: 50,
                  pl: 2,
                  bgcolor: 'background.default',
                }}
              >
                <Typography sx={{ color: 'black' }}>
                  {props.item.eventName}
                </Typography>
                <Typography sx={{ color: 'black', display: 'flex', ml: '30%' }}>
                  {props.userName}
                </Typography>
              </Paper>
              <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={activeStep}
                onChangeIndex={handleStepChange}
                enableMouseEvents
              >
                {ticket.map(function (res, i) {
                  return <MobileTickets ticket={res} />;
                })}
              </SwipeableViews>
              <Typography
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                Ticket {activeStep + 1} / {maxSteps}
              </Typography>
              <MobileStepper
                steps={maxSteps}
                position='static'
                activeStep={activeStep}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              />
            </Box>
          </Modal>
        </div>
      </Card>
    </>
  );
}

export default OneMyEvent;
