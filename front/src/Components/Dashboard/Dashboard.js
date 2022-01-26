import React, {useState} from "react";
import {Button, Grid, IconButton, Tooltip, Typography} from "@mui/material";
import {Add, AutoFixHigh, AutoFixOff} from "@mui/icons-material";
import DrawerWidget from "./DrawerWidget";
import CardLayout from "./CardLayout";

export default function Dashboard() {
    const [drawerWidgetOpen, setDrawerWidgetOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const handleCloseDrawerWidget = () => {
        setDrawerWidgetOpen(false);
    }

    return <Grid container item xs={12} sx={{p: 4}}>
        <DrawerWidget handleClose={handleCloseDrawerWidget} open={drawerWidgetOpen}/>
        <Grid item xs={6}>
            <Typography style={{fontWeight: 'bold'}} variant={'h3'}>
                Welcome
            </Typography>
        </Grid>
        <Grid container item xs={6} alignItems={'center'} justifyContent={'flex-end'} spacing={2}>
            <Grid item>
                <Tooltip title={isEdit ? 'Remove edit mode' : 'Edit your widget'}>
                    <IconButton onClick={() => setIsEdit(prevState => !prevState)}>
                        {isEdit ? <AutoFixOff/> : <AutoFixHigh/>}
                    </IconButton>
                </Tooltip>
            </Grid>
            <Grid item>
                <Button variant={'outlined'} startIcon={<Add/>} onClick={() => setDrawerWidgetOpen(true)}>
                    Add widget
                </Button>
            </Grid>
        </Grid>
        <CardLayout isEdit={isEdit}/>
    </Grid>
}