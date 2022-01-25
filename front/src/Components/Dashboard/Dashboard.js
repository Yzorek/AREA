import React, {useState} from "react";
import {Button, Grid, IconButton, Paper, Tooltip, Typography} from "@mui/material";
import {Add, AutoFixHigh, AutoFixOff} from "@mui/icons-material";
import { Responsive as ResponsiveGridLayout } from "react-grid-layout";
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { withSize } from "react-sizeme";
import DrawerWidget from "./DrawerWidget";

function getFromLS(key) {
    let ls = {};
    if (global.localStorage) {
        try {
            ls = JSON.parse(global.localStorage.getItem("rgl-8")) || {};
        } catch (e) {
        }
    }
    return ls[key];
}

export default function Dashboard() {
    const [drawerWidgetOpen, setDrawerWidgetOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const [layouts, setLayouts] = useState(
        getFromLS("layouts")
    );

    const onLayoutChange = (_, allLayouts) => {
        setLayouts(allLayouts);
    };

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
        <Grid container item xs={12} style={{marginTop: 20}}>
            <ResponsiveGridLayout
                className="layout"
                layouts={layouts}
                breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
                cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}
                rowHeight={60}
                width={1100}
                onLayoutChange={onLayoutChange}
            >
                <div
                    key={`1 - 1`}
                    className="widget"
                    data-grid={{w: 5, h: 5, x: 0, y: Infinity}}
                >
                    <Paper style={{height: '100%', width: "100%"}} elevation={6}>
                        <Grid container item xs={12} justifyContent={'space-between'} alignItems={'center'}
                              style={{background: 'whitesmoke', borderRadius: '5px 5px 0px 0px'}}>
                            <Grid item>
                                <Typography style={{fontWeight: 'bold'}}>
                                   test
                                </Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                </div>
            </ResponsiveGridLayout>
        </Grid>

    </Grid>
}