import React from 'react';
import {FormControlLabel, Grid, Radio} from "@mui/material";

export default function DisplayTheme({color, name, isChecked}) {
    return <Grid container item xs={12} sx={{border: 1, borderColor: 'divider'}} style={{borderRadius: 5}}>
        <Grid container item xs={12} style={{height: 130}}>
            <div style={{width: '20%', height: '100%', background: color.palette.dashboard.drawer.background, borderRadius: '5px 0px 0px 0px'}}>
                <div style={{width: '100%', textAlign: 'center', fontWeight: 'bold', height: '8%', borderBottom: '1px solid gray', fontSize: 8, color: 'white'}}>
                    ULYS
                </div>
                <div style={{borderRadius: 5, marginTop: 10, marginLeft: 4, width: '80%', height: 5, background: color.palette.dashboard.drawer.buttonSelected}}/>
                <div style={{borderRadius: 5, marginTop: 10, marginLeft: 4, width: '80%', height: 5, background: color.palette.dashboard.drawer.titleList}}/>
                <div style={{borderRadius: 5, marginTop: 10, marginLeft: 4, width: '80%', height: 5, background: color.palette.dashboard.drawer.titleList}}/>
                <div style={{borderRadius: 5, marginTop: 10, marginLeft: 4, width: '80%', height: 5, background: color.palette.dashboard.drawer.titleList}}/>
                <div style={{borderRadius: 5, marginTop: 10, marginLeft: 4, width: '80%', height: 5, background: color.palette.dashboard.drawer.titleList}}/>
                <div style={{borderRadius: 5, marginTop: 10, marginLeft: 4, width: '80%', height: 5, background: color.palette.dashboard.drawer.titleList}}/>
                <div style={{borderRadius: 5, marginTop: 10, marginLeft: 4, width: '80%', height: 5, background: color.palette.dashboard.drawer.titleList}}/>
            </div>
            <div style={{width: '80%', height: '8%', borderBottom: '1px solid gray', display: 'flex'}}>
                <div style={{width: 50, height: '50%', marginTop: 3, marginLeft: 5, borderRadius: 5, background: 'lightgray'}}/>
                <div style={{width: 5, height: '50%', marginTop: 3, marginLeft: 70, borderRadius: 5, background: 'lightgray'}}/>
                <div style={{width: 5, height: '50%', marginTop: 3, marginLeft: 5, borderRadius: 5, background: 'lightgray'}}/>
                <div style={{width: 5, height: '50%', marginTop: 3, marginLeft: 5, borderRadius: 5, background: 'lightgray'}}/>
            </div>
        </Grid>
        <Grid item xs={12} style={{padding: '0px 10px'}} sx={{borderTop: 1, borderColor: 'divider'}}>
            <FormControlLabel value="female" control={<Radio size="small" checked={isChecked}/>} label={name}/>
        </Grid>
    </Grid>
}