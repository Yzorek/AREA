import React from 'react';
import {Grid, IconButton, TextField} from "@mui/material";
import RecapConv from "./RecapConv";
import {Send} from "@mui/icons-material";
import MainLoader from "../../Tools/MainLoader";

export default function Message({}) {
    return <Grid container item xs={9} display={'block'} style={{height: '100%'}}>
        <RecapConv/>
        <Grid container item xs={12} style={{height: 'calc(100% - 116px)'}} justifyContent={'center'} alignItems={'center'}>
            <MainLoader/>
        </Grid>
        <Grid container item xs={12} sx={{borderTop: 1, borderColor: 'divider', p:1}}>
            <Grid item xs={2}/>
            <Grid item xs={8}>
                <TextField variant={'outlined'} label={'Text'} size={'small'} color={'primary'} fullWidth type={'search'}/>
            </Grid>
            <Grid item xs={2}>
                <IconButton>
                    <Send/>
                </IconButton>
            </Grid>
        </Grid>
    </Grid>
}