import React from 'react';
import {Divider, Drawer, Grid, Toolbar, Typography} from "@mui/material";
import {drawWith} from "./config";

export default function DrawerArea() {
    return <Drawer
        variant="permanent"
        sx={{
            width: drawWith,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: drawWith, boxSizing: 'border-box', bgcolor: 'rgb(11, 15, 25)' },
        }}
    >
        <Toolbar>
            <Grid container item xs={12} justifyContent={'center'}>
                <Typography color={"white"} variant={'h3'} style={{fontWeight: 'bold'}}>
                    AREA
                </Typography>
            </Grid>
        </Toolbar>
        <Divider color={'gray'}/>
        <Toolbar>
            List Item
        </Toolbar>
    </Drawer>
}