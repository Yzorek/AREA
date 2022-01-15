import React from 'react';
import {Box, Grid} from "@mui/material";
import AppBarArea from "./AppBarArea";
import DrawerArea from "./DrawerArea";

export default function Main() {
    return <Grid container item xs={12}>
        <AppBarArea />
        <DrawerArea />
        <Box component="main" sx={{ flexGrow: 1 }}>
            jijij
        </Box>
    </Grid>
}