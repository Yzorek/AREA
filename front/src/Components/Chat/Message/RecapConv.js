import React from 'react';
import {Grid, IconButton, ListItem, ListItemAvatar, ListItemText} from "@mui/material";
import {Skeleton} from "@mui/lab";
import {Menu} from "@mui/icons-material";

export default function RecapConv({}) {
    return <Grid container item xs={12} style={{height: 57}} sx={{borderBottom: 1, borderColor: 'divider'}}>
        <ListItem style={{width: '100%'}} secondaryAction={
            <IconButton edge="end" aria-label="delete">
                <Menu/>
            </IconButton>
        }>
            <ListItemAvatar>
                <Skeleton variant="circular" width={40} height={40} />
            </ListItemAvatar>
            <ListItemText primary={
                <Skeleton style={{width: '90%'}}/>
            }/>

        </ListItem>
    </Grid>
}