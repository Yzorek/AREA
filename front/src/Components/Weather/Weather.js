import React from "react";
import {Grid, Typography} from "@mui/material";

export default function Weather() {
    return <Grid container item xs={12} sx={{p: 4}}>
        <Grid item xs={12}>
            <Typography variant={'h5'} style={{fontWeight: 'bold'}}>
                Weather
            </Typography>
        </Grid>
    </Grid>
}