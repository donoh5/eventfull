import { Box, Container } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { SettingsBackupRestoreSharp } from '@mui/icons-material';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Divider } from '@mui/material';

function SelectTicket(props) {
  const [count, setCount] = useState(0);
  const updateCount = (plus) => {
    if (plus) {
      if (count === parseInt(props.item.maxAmount)) {
        alert('Only ' + props.item.maxAmount + ' tickets available');
      } else {
        setCount(count + 1);
      }
    } else {
      if (count < 1) {
        setCount(0);
      } else {
        setCount(count - 1);
      }
    }
  };

  useEffect(() => {
    setCount(0);
  }, [props.addedTicket]);

  useEffect(() => {
    if (count === 0) {
      delete props.dictTickets[props.item.ticketTypeID];
    } else {
      props.dictTickets[props.item.ticketTypeID] = count;
    }
  }, [count]);

  return (
    <Container className='SelectTickets'>
      <Box>
        <Grid container sx={{ marginBottom: '0.25rem' }}>
          <Grid item xs={8}>
            <Typography>{props.item.ticketDescription}</Typography>
            <Typography sx={{ fontSize: 'small' }}>
              ${props.item.price.toFixed(2)}
            </Typography>
          </Grid>
          <Grid
            item
            xs={1}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <RemoveIcon onClick={() => updateCount(false)} />
          </Grid>
          <Grid
            item
            xs={2}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography>{count}</Typography>
          </Grid>
          <Grid
            item
            xs={1}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <AddIcon onClick={() => updateCount(true)} />
          </Grid>
        </Grid>
      </Box>
      <Divider color='white' sx={{ height: '1', marginY: '0.75rem' }} />
    </Container>
  );
}

export default SelectTicket;

