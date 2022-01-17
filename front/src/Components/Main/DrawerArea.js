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
    ListItemIcon, ListItemText, Box
} from "@mui/material";
import {drawWith, GENERAL_DASHBOARD, GENERAL_PROFILE} from "./config";
import {Dashboard, Person} from "@mui/icons-material";
import {DEFAULT_PAGE} from "./config";
import {useNavigate} from "react-router-dom";

function ClassicListItemButtonNav({idSelected, onSelectedChange, id, label, icon, redirectTo}) {
    let navigate = useNavigate();

    return <ListItemButton onClick={() => {
        onSelectedChange(id);
        navigate(redirectTo);
    }} sx={{
        [`&:hover`]: {
            bgcolor: 'dashboard.drawer.hover',
            borderRadius: '10px',
            marginLeft: '5px',
            marginRight: '5px'
        },
    }}>
        <ListItemIcon sx={{color: idSelected === id ? 'dashboard.drawer.buttonSelected' : 'dashboard.drawer.button'}}>
            {icon}
        </ListItemIcon>
        <ListItemText primary={label} sx={{color: idSelected === id ? 'dashboard.drawer.buttonSelected' : 'dashboard.drawer.button'}}/>
    </ListItemButton>
}

export default function DrawerArea() {
    const [idSelected, setIdSelected] = useState(DEFAULT_PAGE)

    const onSelectedChange = (id) => {
        setIdSelected(id)
    }

    return <Drawer
        variant="permanent"
        open={true}
        sx={{
            width: drawWith,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {width: drawWith, boxSizing: 'border-box', bgcolor: 'dashboard.drawer.background'},
        }}
    >
        <Toolbar>
            <Grid container item xs={12} justifyContent={'center'}>
                <Typography color={"white"} variant={'h3'} style={{fontWeight: 'bold'}}>
                    ULYS
                </Typography>
            </Grid>
        </Toolbar>
        <Divider color={'gray'}/>
        <Box sx={{overflow: 'auto'}}>
            <List
                dense
                subheader={
                    <ListSubheader sx={{bgcolor: 'dashboard.drawer.background', color: 'dashboard.drawer.titleList', fontWeight: 'bold'}}>
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


    </Drawer>
}