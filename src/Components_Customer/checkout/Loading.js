import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';

function Loading() {
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom textAlign={"center"}>
                Your order is being processed...
            </Typography>
            <Grid container spacing={3} direction="column" alignItems="center" justifyContent="center" 
            style={{ marginTop: 10, marginBottom: 20 }}>
                <Grid item xs={12}>
                    <CircularProgress />
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default Loading