import React from 'react';
import {Grid} from "@mui/material";
import DialogWeather from "./DialogWeather";

export default function Weather({openSettings, setOpenSettings}) {

    const handleCloseSettings = () => {
        setOpenSettings(false)
    }

    return <Grid container item xs={12}>
        Weather widget
        <DialogWeather open={openSettings} handleClose={handleCloseSettings}/>
    </Grid>
}