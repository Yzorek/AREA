import React from 'react';
import {Grid, Typography} from "@mui/material";

export default function NotificationCenter() {
    return <Grid container item xs={12} sx={{p: 4}}>
        <Grid item xs={12}>
            <Typography style={{fontWeight: 'bold'}} variant={'h5'}>
                Notification Center
            </Typography>
        </Grid>
    </Grid>
}