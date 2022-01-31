import React from "react";
import {Button, Grid, Typography} from "@mui/material";
import TemplateWeather from "./TemplateWeather";

export default function Weather() {
    //todo dialog new weather

    return <Grid container item xs={12} sx={{p: 4}}>
        <Grid item xs={12}>
            <Typography variant={'h5'} style={{fontWeight: 'bold'}}>
                Weather
            </Typography>
        </Grid>
        <Grid item xs={3}>
            <Button fullWidth>
                Add new weather config
            </Button>
        </Grid>
        <Grid item xs={3}>
            <TemplateWeather />
        </Grid>
    </Grid>
}