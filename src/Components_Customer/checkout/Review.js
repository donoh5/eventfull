import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import axios from 'axios';

export default function Review(props) {
    const [products, setProducts] = React.useState([]);
    const [subtotal, setSubtotal] = React.useState(0);
    
    const addresses = [props.address.address1, props.address.address2, props.address.city, props.address.state, props.address.zip, props.address.country];

    const payments = [
        { name: 'Card holder', detail: props.payment.cardName },
        { name: 'Card number', detail: 'xxxx-xxxx-xxxx-' + props.payment.cardNumber.slice(-4) },
        { name: 'Expiry date', detail: props.payment.expDate },
    ];

    React.useEffect(function () {
        axios
            .post(`https://eventfull-backend.azurewebsites.net/getCheckoutList?userID=` + props.userID)
            .then(function ({ data }) {
                setProducts(data);
                return data;
            }).then(function ({ data }) {
                axios
                    .post(`https://eventfull-backend.azurewebsites.net/cart-subtotal?userID=` + props.userID)
                    .then(function ({ data }) {
                        setSubtotal(data);
                    })
            })
            .catch(function (error) {
                console.log();
            })
    }, []);

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Order summary
            </Typography>
            <List disablePadding>
                {products.map((product) => (
                    <ListItem key={product.eventName + " (" + product.ticketDescription + ")"} sx={{ py: 1, px: 0 }}>
                        <ListItemText primary={product.eventName + " (" + product.ticketDescription + ")"} secondary={product.discountCode} />
                        <Typography variant="body2">{product.quantity} X ${product.price.toFixed(2)}</Typography>
                    </ListItem>
                ))}
                <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary="Total" />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        ${(subtotal * 1.05).toFixed(2)}
                    </Typography>
                </ListItem>
            </List>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                        Shipping
                    </Typography>
                    <Typography gutterBottom>{props.payment.cardName}</Typography>
                    <Typography gutterBottom>{addresses.join(' ,')}</Typography>
                </Grid>
                <Grid item container direction="column" xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                        Payment details
                    </Typography>
                    <Grid container>
                        {payments.map((payment) => (
                            <React.Fragment key={payment.name}>
                                <Grid item xs={6}>
                                    <Typography gutterBottom>{payment.name}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography gutterBottom>{payment.detail}</Typography>
                                </Grid>
                            </React.Fragment>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}