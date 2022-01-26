import React from 'react';
import {Grid, IconButton, Tooltip} from "@mui/material";
import {Cancel, Settings} from "@mui/icons-material";

export default function WidgetAction({handleRemoveItem, handleOpenSettings}) {
    return <Grid container item xs={12} justifyContent={'flex-end'} style={{height: 0}}>
        <Grid item style={{position: 'relative', left: 20, top: -20}}>
            <Tooltip title={'Widget settings'}>
                <IconButton onClick={handleOpenSettings}>
                    <Settings/>
                </IconButton>
            </Tooltip>
        </Grid>
        <Grid item style={{position: 'relative', left: 20, top: -20}}>
            <Tooltip title={'Delete this widget'}>
                <IconButton onClick={() => handleRemoveItem(0)}>
                    <Cancel style={{color: 'red'}}/>
                </IconButton>
            </Tooltip>
        </Grid>
    </Grid>
}