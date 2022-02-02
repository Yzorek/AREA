import React, {useState} from "react";
import {Alert, Button, Grid, Paper, Typography} from "@mui/material";
import TemplateWeather from "./TemplateWeather";
import {Add} from "@mui/icons-material";
import DialogNewSettingsWeather from "./Dialog/DialogNewSettingsWeather";

export default function Weather() {
    const [openNewWeatherSettings, setOpenWeatherSettings] = useState(false);
    const [isReload, setIsReload] = useState(true);

    const handleClose = (isToReload) => {
        setOpenWeatherSettings(false);
        setIsReload(isToReload);
    }

    return <Grid container item xs={12} sx={{p: 4}} spacing={2}>
        <Grid item xs={9}>
            <Typography variant={'h5'} style={{fontWeight: 'bold'}}>
                Weather
            </Typography>
        </Grid>
        <Grid item xs={3}>
            <Button variant={'outlined'} fullWidth color={'primary'} startIcon={<Add/>} onClick={() => setOpenWeatherSettings(true)}>
                Add new weather config
            </Button>
        </Grid>
        <Grid item xs={12}>
            <Alert severity="info" style={{width: '100%'}}>Create your weather profile.</Alert>
        </Grid>
        <Grid item xs={3}>
            <TemplateWeather />
        </Grid>
        <DialogNewSettingsWeather open={openNewWeatherSettings} handleClose={handleClose}/>
    </Grid>
}