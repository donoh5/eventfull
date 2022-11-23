import React, { useCallback } from 'react';
import axios from 'axios';
import OneCart from './OneCart';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';

const MyCart = (props) => {
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [cartChanged, setCartChanged] = useState(false);
  const [currentDiscount, setCurrentDiscount] = useState('');

  //get all cart items with current userID and get subtotal
  useEffect(
    function () {
      axios
        .get(
          `https://eventfull-backend.azurewebsites.net/cart?userID=` +
            props.userID
        )
        .then(function ({ data }) {
          setCart(data);
          return data;
        })
        .then(function () {
          axios
            .post(
              `https://eventfull-backend.azurewebsites.net/cart-subtotal?userID=` +
                props.userID
            )
            .then(function ({ data }) {
              setSubtotal(data);
            });
        })
        .catch(function (error) {
          console.log();
        });
    },
    [cartChanged]
  );
  const list = function () {
    return cart.map(function (res, i) {
      return (
        <OneCart
          item={res}
          setCartChanged={setCartChanged}
          cartChanged={cartChanged}
        />
      );
    });
  };
  const handleChange = (e) => {
    setCurrentDiscount(e.target.value);
  };
  const applyDiscount = function () {
    axios
      .post(
        `https://eventfull-backend.azurewebsites.net/applyDiscount?userID=` +
          props.userID +
          `&discountCode=` +
          currentDiscount
      )
      .then(function (res, i) {
        console.log(res);
        if (res.data === false) {
          alert('Invalid discount code');
          console.log(res);
        } else {
          document.location.reload(true);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const navigate = useNavigate();
  const redirectCheckout = useCallback(
    () => navigate('/Checkout', { replace: true }),
    [navigate]
  );

  const checkout = function () {
    redirectCheckout();
  };
  if (cart.length < 1) {
    return (
      <div>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            pt: '5vw',
            marginTop: '3vh',
          }}
        >
          <Typography
            sx={{ fontSize: { xs: '4.5ch', md: '6ch' }, color: 'white' }}
          >
            Cart Is Empty
          </Typography>
        </Box>
        <hr
          style={{
            width: '30ch',
            height: '0.5ch',
            backgroundColor: 'white',
            marginTop: '0px',
          }}
        ></hr>
      </div>
    );
  } else {
    return (
      <Box>
        <Box
          sx={{
            width: { md: '95%', lg: '85%' },
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center',
            minWidth: '100ch',
            justifyContent: 'center',
            flexDirection: 'column',
            ml: 'auto',
            mr: 'auto',
            pb: '5ch',
            color: 'black',
          }}
        >
          <Typography
            sx={{
              fontSize: '6ch',
              m: '1%',
              p: '1%',
              textAlign: 'center',
              color: 'white',
            }}
          >
            My Cart
          </Typography>
          <Grid
            container
            sx={{
              maxWidth: { md: '95%', lg: '85%' },
              border: '1px',
              borderStyle: 'solid',
              borderColor: 'black',
              pt: '5ch',
              pl: '2ch',
              pr: '2ch',
              pb: '7ch',
              borderRadius: '25px',
              backgroundColor: 'white',
            }}
          >
            <Grid item xs={9} sx={{ pr: '2ch', borderRight: '1px solid gray' }}>
              <TableContainer
                sx={{
                  pb: '5vh',
                  pt: '2ch',
                  width: { md: '95%', lg: '85%' },
                  alignItems: 'center',
                  justifyContent: 'center',
                  ml: 'auto',
                  mr: 'auto',
                  minWidth: '50ch',
                }}
              >
                <Table
                  sx={{ fontSize: '2vw' }}
                  size='small'
                  aria-label='a dense table'
                >
                  <TableHead>
                    <TableRow
                      sx={{
                        borderBottom: {
                          xs: '3px solid white',
                          md: '3px solid black',
                        },
                        pb: '1ch',
                        pt: '1ch',
                      }}
                    >
                      <TableCell align='left' sx={{ width: '25%', pb: '1ch' }}>
                        {' '}
                        <Typography sx={{ fontSize: '3ch' }}>Event </Typography>
                      </TableCell>
                      <TableCell
                        align='center'
                        sx={{ pr: '0', pl: '0', pb: '1ch', width: '5%' }}
                      >
                        {' '}
                        <Typography sx={{ fontSize: '3ch' }}>Price </Typography>
                      </TableCell>
                      <TableCell
                        align='center'
                        sx={{ pr: '0', pl: '0', pb: '1ch', width: '15%' }}
                      >
                        {' '}
                        <Typography sx={{ fontSize: '3ch' }}>
                          {' '}
                          Ticket
                        </Typography>
                      </TableCell>
                      <TableCell
                        align='center'
                        sx={{ pr: '0', pl: '0', pb: '1ch', width: '5%' }}
                      >
                        {' '}
                        <Typography sx={{ fontSize: '3ch' }}>
                          Quantity{' '}
                        </Typography>
                      </TableCell>
                      <TableCell
                        align='center'
                        sx={{ pr: '0', pl: '0', pb: '1ch', width: '2%' }}
                      ></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>{list()}</TableBody>
                </Table>
              </TableContainer>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'left',
                  justifyContent: 'center',
                  float: 'left',
                  pl: '4vw',
                }}
              >
                <Box
                  component='form'
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                  }}
                >
                  <Typography sx={{ fontSize: '2ch' }}>
                    Discount Code:
                  </Typography>
                  <TextField
                    size='small'
                    sx={{
                      minWidth: '20ch',
                      width: '15vw',
                      pl: '5%',
                      pr: '5%',
                      color: 'white',
                      input: { fontSize: '1rem', p: '0.4rem' },
                    }}
                    onChange={handleChange}
                  ></TextField>
                  <Button onClick={applyDiscount} sx={{ p: '0.5rem' }}>
                    Apply
                  </Button>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={3} sx={{ pl: '2ch' }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  ml: 'auto',
                  mr: 'auto',

                  pt: '2ch',
                  width: '90%',
                  maxWidth: '50ch',
                }}
              >
                <TableContainer
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    ml: 'auto',
                    mr: 'auto',
                    minWidth: '15ch',
                  }}
                >
                  <Table
                    size='small'
                    aria-label='a dense table'
                    sx={{ ml: '0', mr: '0', width: '85%' }}
                  >
                    <TableRow>
                      <TableCell sx={{ fontSize: '2ch', pl: '0', pr: '0' }}>
                        Subtotal:{' '}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: '2ch',
                          textAlign: 'right',
                          pl: '0',
                          pr: '0',
                        }}
                      >
                        $ {subtotal.toFixed(2)}
                      </TableCell>
                    </TableRow>
                    <TableRow sx={{ borderTop: '2px solid gray' }}>
                      <TableCell sx={{ fontSize: '2ch', pl: '0', pr: '0' }}>
                        Taxes:{' '}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: '2ch',
                          textAlign: 'right',
                          pl: '0',
                          pr: '0',
                        }}
                      >
                        ${(subtotal * 0.05).toFixed(2)}
                      </TableCell>
                    </TableRow>
                    <TableRow
                      sx={{
                        borderTopStyle: 'double',
                        borderColor: 'gray',
                        borderTopWidth: '3px',
                      }}
                    >
                      <TableCell
                        sx={{
                          fontSize: '2.5ch',
                          border: '0',
                          pl: '0',
                          pr: '0',
                        }}
                      >
                        Total:{' '}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: '2.5ch',
                          textAlign: 'right',
                          border: '0',
                          pl: '0',
                          pr: '0',
                        }}
                      >
                        ${(subtotal * 1.05).toFixed(2)}{' '}
                      </TableCell>
                    </TableRow>
                  </Table>
                </TableContainer>
                <Button
                  onClick={checkout}
                  sx={{ mt: '1ch', p: '0.5rem', width: '85%' }}
                >
                  Check Out
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box
          sx={{
            display: { xs: 'flex', md: 'none' },
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <Typography
            sx={{
              fontSize: '5ch',
              m: '2%',
              p: '1%',
              textAlign: 'center',
              color: 'white',
            }}
          >
            My Cart
          </Typography>
          <Box
            sx={{
              width: '100%',
              backgroundColor: 'white',
            }}
          >
            {list()}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                pl: '1.5%',
              }}
            >
              <Box
                component='form'
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                  p: '4ch',
                }}
              >
                <Typography sx={{ fontSize: '4vw' }}>Discount Code:</Typography>
                <TextField
                  size='small'
                  sx={{
                    minWidth: '20ch',
                    width: '30vw',
                    pl: '5%',
                    pr: '5%',
                    color: 'white',
                    input: { fontSize: '1.4rem', p: '0.2rem', ml: '0.5ch' },
                  }}
                  onChange={handleChange}
                ></TextField>
                <Button
                  onClick={applyDiscount}
                  sx={{ p: '0.2rem', width: '10ch', fontSize: '3vw' }}
                >
                  Apply
                </Button>
              </Box>
              <Box sx={{ ml: 'auto', mr: 'auto', width: '100% ' }}>
                <TableContainer
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    p: '3ch',
                  }}
                >
                  <Table
                    size='small'
                    aria-label='a dense table'
                    sx={{ ml: 'auto', mr: 'auto', width: '70% ' }}
                  >
                    <TableRow>
                      <TableCell
                        sx={{ pl: '0', pr: '0', maxWidth: '20ch', m: 0 }}
                      >
                        <Typography sx={{ fontSize: '2.8ch', m: 0 }}>
                          Subtotal:{' '}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ textAlign: 'right', pl: '0', pr: '0' }}>
                        <Typography sx={{ fontSize: '2.8ch', m: 0 }}>
                          ${subtotal.toFixed(2)}{' '}
                        </Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow sx={{ borderTop: '2px solid gray' }}>
                      <TableCell sx={{ pl: '0', pr: '0' }}>
                        <Typography sx={{ fontSize: '2.8ch', m: 0 }}>
                          Taxes:
                        </Typography>{' '}
                      </TableCell>
                      <TableCell sx={{ textAlign: 'right', pl: '0', pr: '0' }}>
                        <Typography sx={{ fontSize: '2.8ch', m: 0 }}>
                          ${(subtotal * 0.05).toFixed(2)}
                        </Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow
                      sx={{
                        borderTopStyle: 'double',
                        borderColor: 'gray',
                        borderTopWidth: '3px',
                      }}
                    >
                      <TableCell sx={{ border: '0', pl: '0', pr: '0' }}>
                        <Typography sx={{ fontSize: '2.8ch', m: 0 }}>
                          Total:
                        </Typography>{' '}
                      </TableCell>
                      <TableCell
                        sx={{
                          textAlign: 'right',
                          border: '0',
                          pl: '0',
                          pr: '0',
                        }}
                      >
                        <Typography sx={{ fontSize: '2.8ch', m: 0 }}>
                          ${(subtotal * 1.05).toFixed(2)}
                        </Typography>{' '}
                      </TableCell>
                    </TableRow>
                  </Table>
                </TableContainer>
              </Box>

              <Box sx={{ mb: '5ch' }}>
                <Button
                  onClick={checkout}
                  sx={{
                    p: '0.3rem',
                    pl: '2rem',
                    pr: '2rem',
                    width: '40vw',
                    fontSize: '4vw',
                  }}
                >
                  Check Out
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }
};
export default MyCart;
