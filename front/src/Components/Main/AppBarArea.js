import React, {useState} from "react";
import {
    Toolbar,
    AppBar,
    Tooltip,
    IconButton,
    Avatar,
    Grid,
    TextField,
    InputAdornment,
    Popover,
    List, ListItemButton, ListItemText, ListItemIcon, Divider
} from "@mui/material";
import {Notifications, ChatBubble, Search} from "@mui/icons-material";
import {drawWith} from "./config";
import {Person, Logout} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";

function PopoverSettings({anchorEl, handleClose}) {
    let navigate = useNavigate();

    return <Popover
        style={{marginTop: 10}}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
        }}
    >
        <List style={{width: '100%', padding: 0}} dense>
            <ListItemButton onClick={() => navigate('Profile')}>
                <ListItemIcon>
                    <Person/>
                </ListItemIcon>
                <ListItemText primary={'Profile'}/>
            </ListItemButton>
            <Divider variant={'middle'}/>
            <ListItemButton onClick={() => {
                localStorage.clear()
                navigate('/Login')
            }}>
                <ListItemIcon>
                    <Logout/>
                </ListItemIcon>
                <ListItemText primary={'Log out'}/>
            </ListItemButton>
        </List>
    </Popover>
}

export default function AppBarArea() {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleOpenSettings = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseSettings = () => {
        setAnchorEl(null);
    };

    return <AppBar position="static" sx={{bgcolor: 'white'}}>
        <Toolbar>
            <Grid container item xs={12}>
                <Grid container item xs={6}>
                    <Grid item xs={7} style={{marginLeft: drawWith + 10}}>
                        <TextField fullWidth size={"small"} label={'Search Bar'} variant={'outlined'} type={'search'} InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Search/>
                                </InputAdornment>
                            )
                        }}/>
                    </Grid>
                </Grid>
                <Grid container item xs={6} justifyContent={'flex-end'} alignItems={'center'} spacing={2}>
                    <Grid item>
                        <Tooltip title="Chat">
                            <IconButton>
                                <ChatBubble/>
                            </IconButton>
                        </Tooltip>
                    </Grid>

                    <Grid item>
                        <Tooltip title="Notifications">
                            <IconButton>
                                <Notifications/>
                            </IconButton>
                        </Tooltip>
                    </Grid>

                    <Grid item>
                        <Tooltip title="Open settings">
                            <IconButton sx={{p: 0}} onClick={handleOpenSettings}>
                                <Avatar alt="Remy Sharp"/>
                            </IconButton>
                        </Tooltip>
                    </Grid>

                </Grid>
            </Grid>
        </Toolbar>
        <PopoverSettings anchorEl={anchorEl} handleClose={handleCloseSettings}/>
    </AppBar>
}