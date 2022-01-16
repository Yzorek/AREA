import React, {useState} from 'react';
import {
    Divider,
    Drawer,
    Grid,
    Toolbar,
    Typography,
    List,
    ListSubheader,
    ListItemButton,
    ListItemIcon, ListItemText, Box, IconButton, Avatar, Tooltip
} from "@mui/material";
import {drawWith, GENERAL_DASHBOARD, GENERAL_PROFILE} from "./config";
import {Dashboard, Logout, Person} from "@mui/icons-material";
import {DEFAULT_PAGE} from "./config";
import {useNavigate} from "react-router-dom";

function ClassicListItemButtonNav({idSelected, onSelectedChange, id, label, icon, redirectTo}) {
    let navigate = useNavigate();

    return <ListItemButton onClick={() => {
        onSelectedChange(id);
        navigate(redirectTo);
    }} sx={{
        [`&:hover`]: {
            bgcolor: 'rgba(255, 255, 255, 0.08)',
            borderRadius: '10px',
            marginLeft: '5px',
            marginRight: '5px'
        },
    }}>
        <ListItemIcon sx={{color: idSelected === id ? 'secondary.main' : 'rgb(209, 213, 219)'}}>
            {icon}
        </ListItemIcon>
        <ListItemText primary={label} sx={{color: idSelected === id ? 'secondary.main' : 'rgb(209, 213, 219)'}}/>
    </ListItemButton>
}

export default function DrawerArea() {
    const [idSelected, setIdSelected] = useState(DEFAULT_PAGE)
    let navigate = useNavigate();

    const onSelectedChange = (id) => {
        setIdSelected(id)
    }

    return <Drawer
        variant="permanent"
        open={true}
        sx={{
            width: drawWith,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {width: drawWith, boxSizing: 'border-box', bgcolor: 'primary.main'},
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
        <Box sx={{overflow: 'auto'}}>
            <List
                subheader={
                    <ListSubheader sx={{bgcolor: 'rgb(11, 15, 25)', color: 'rgb(107, 114, 128)', fontWeight: 'bold'}}>
                        General
                    </ListSubheader>
                }
            >
                <ClassicListItemButtonNav redirectTo={'Dashboard'} icon={<Dashboard/>} id={GENERAL_DASHBOARD}
                                          label={'Dashboard'} idSelected={idSelected}
                                          onSelectedChange={onSelectedChange}/>
                <ClassicListItemButtonNav redirectTo={'Profile'} icon={<Person/>} id={GENERAL_PROFILE} label={'Profile'}
                                          idSelected={idSelected} onSelectedChange={onSelectedChange}/>
            </List>
        </Box>

        <Box style={{
            width: '100%',
            position: 'absolute',
            bottom: 'env(safe-area-inset-bottom)'
        }} sx={{
            p: 1,
            borderTop: 1,
            borderColor: 'gray'
        }}>
            <Grid container item xs={12} justifyContent={'space-around'} alignItems={'center'}>
                <Grid item>
                    <Avatar alt="Remy Sharp"/>
                </Grid>
                <Grid item>
                    <Typography color={'rgb(209, 213, 219)'} variant="button">
                        Damien Maillard
                    </Typography>
                </Grid>
                <Grid item>
                    <Tooltip title={'Log out'}>
                        <IconButton onClick={() => {
                            localStorage.clear()
                            navigate('/Login')
                        }} style={{color: 'rgb(209, 213, 219)'}}>
                            <Logout/>
                        </IconButton>
                    </Tooltip>
                </Grid>
            </Grid>
        </Box>
    </Drawer>
}