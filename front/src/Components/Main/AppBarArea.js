import React, {useState} from "react";
import {
    Toolbar,
    AppBar,
    Tooltip,
    IconButton,
    Grid,
    TextField,
    InputAdornment, Avatar, Typography, Paper, Popover, List, ListItemButton, ListItemIcon, ListItemText,
} from "@mui/material";
import {Notifications, ChatBubble, Search, Logout} from "@mui/icons-material";
import {drawWith} from "./config";
import {useNavigate} from "react-router-dom";

export default function AppBarArea() {
    const [onHoverPaper, setOnHoverPaper] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    let navigate = useNavigate()

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return <AppBar position="static" sx={{bgcolor: 'white'}}>
        <Toolbar>
            <Grid container item xs={12}>
                <Grid container item xs={6} alignItems={'center'}>
                    <Grid item xs={7} style={{marginLeft: drawWith + 10}}>
                        <TextField fullWidth size={"small"} label={'Search Bar'} variant={'outlined'} type={'search'}
                                   InputProps={{
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
                        <Paper
                            onClick={handleClick}
                            onMouseEnter={() => setOnHoverPaper(true)}
                            onMouseLeave={() => setOnHoverPaper(false)} variant="outlined" style={{
                            borderRadius: 20,
                            cursor: 'pointer',
                        }} sx={{
                            bgcolor: onHoverPaper && 'dashboard.appBar.hover',
                        }}>
                            <Grid item container xs={12} alignItems={'center'}>
                                <Grid container item xs={9} justifyContent={'center'}>
                                    <Typography>
                                        Damien Maillard
                                    </Typography>
                                </Grid>
                                <Grid item container xs={3} justifyContent={'center'}>
                                    <IconButton style={{paddingTop: 5, paddingBottom: 5}}>
                                        <Avatar/>
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Paper>

                    </Grid>
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

                </Grid>
            </Grid>
        </Toolbar>

        <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
        >
            <List dense style={{width: 175, padding: 0}}>
                <ListItemButton onClick={() => {
                    localStorage.clear();
                    navigate('/Login');
                }}>
                    <ListItemIcon>
                        <Logout/>
                    </ListItemIcon>
                    <ListItemText primary={'Log out'}/>
                </ListItemButton>
            </List>
        </Popover>
    </AppBar>
}