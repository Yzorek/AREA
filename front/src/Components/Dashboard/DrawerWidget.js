import React, {useState} from 'react';
import {Button, Drawer, Grid, IconButton, InputAdornment, TextField} from "@mui/material";
import {ArrowForwardIos, Save, Search} from "@mui/icons-material";

export default function DrawerWidget({open, handleClose}) {
    const [search, setSearch] = useState('');

    return <Drawer
        anchor={'right'}
        open={open}
        onClose={handleClose}
        sx={{
            width: 350,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {width: 350, boxSizing: 'border-box'},
        }}
    >
        <Grid container item xs={12} display={'block'}>
            <Grid container item xs={12} sx={{borderBottom: 1, borderColor: 'divider', p: 1}}>
                <IconButton onClick={handleClose}>
                    <ArrowForwardIos/>
                </IconButton>
            </Grid>
            <Grid item xs={12} style={{height: 'calc(100% - 110px)'}}>
                <Grid item xs={12} sx={{p: 1}}>
                    <TextField label={'Search'} type={'search'} fullWidth value={search} onChange={(e) => setSearch(e.target.value)} variant={'outlined'}
                               InputProps={{
                                   startAdornment: (
                                       <InputAdornment position="start">
                                           <Search/>
                                       </InputAdornment>
                                   ),
                               }}/>
                </Grid>
                hover thing
            </Grid>
            <Grid item xs={12} sx={{borderTop: 1, borderColor: 'divider', p: 1}}>
                <Button variant="outlined" fullWidth startIcon={<Save/>}>
                    Save
                </Button>
            </Grid>
        </Grid>
    </Drawer>
}