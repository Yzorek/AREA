import React from "react";
import {Alert, Button, Grid, Paper, Typography} from "@mui/material";
import TemplateWeather from "./TemplateWeather";
import {Add} from "@mui/icons-material";

export default function Weather() {
    //todo dialog new weather

    return <Grid container item xs={12} sx={{p: 4}} spacing={2}>
        <Grid item xs={9}>
            <Typography variant={'h5'} style={{fontWeight: 'bold'}}>
                Weather
            </Typography>
        </Grid>
        <Grid item xs={3}>
            <Button variant={'outlined'} fullWidth color={'primary'} startIcon={<Add/>}>
                Add new weather config
            </Button>
        </Grid>
        <Grid item xs={12}>
            <Alert severity="info" style={{width: '100%'}}>Create your weather profile.</Alert>
        </Grid>
        <Grid item xs={3}>
            <TemplateWeather />
        </Grid>
    </Grid>
}