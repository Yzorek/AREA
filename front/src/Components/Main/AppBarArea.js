import React, {useContext, useState} from "react";
import {
    Toolbar,
    AppBar,
    Tooltip,
    IconButton,
    Grid,
    TextField,
    InputAdornment,
    Avatar,
    Typography,
    Popover,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    CircularProgress,
    ListItem, Divider, ListItemAvatar
} from "@mui/material";
import {
    Notifications,
    ChatBubble,
    Search,
    Logout,
    Person,
    Settings,
    Palette,
    Power,
    PowerOff
} from "@mui/icons-material";
import {drawWith} from "./config";
import {useNavigate} from "react-router-dom";
import UserContext from "../Tools/UserContext/UserContext";
import socketContext from "../Tools/SocketContext/SocketContext";

let status = [
    {
        id: 1,
        label: 'Online',
        color: 'green',
    },
    {
        id: 2,
        label: 'Inactive',
        color: 'yellow',
    },
    {
        id: 3,
        label: 'Absent',
        color: 'red',
    }
]

export default function AppBarArea({isLoading}) {
    const [anchorEl, setAnchorEl] = useState(null);
    let userContext = useContext(UserContext);
    let navigate = useNavigate();
    let socket = useContext(socketContext)

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
                        <TextField disabled={isLoading || !userContext} fullWidth size={"small"} label={'Search Bar'}
                                   variant={'outlined'} type={'search'}
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
                    {isLoading || !userContext ? <Grid item>
                        <CircularProgress style={{width: 25, height: 25}}/>
                    </Grid> : <Grid item>
                        <Tooltip title="Chat">
                            <IconButton>
                                <ChatBubble/>
                            </IconButton>
                        </Tooltip>
                    </Grid>}

                    {isLoading || !userContext ? <Grid item>
                        <CircularProgress style={{width: 25, height: 25}}/>
                    </Grid> : <Grid item>
                        <Tooltip title="Notifications">
                            <IconButton>
                                <Notifications/>
                            </IconButton>
                        </Tooltip>
                    </Grid>}

                    {isLoading || !userContext ? <Grid item>
                        <CircularProgress style={{width: 25, height: 25}}/>
                    </Grid> : <Grid item>
                        <Tooltip title="Open Profile">
                            <IconButton onClick={handleClick}>
                                <Avatar alt={userContext.username} src={userContext.avatar}/>
                            </IconButton>
                        </Tooltip>
                    </Grid>}
                </Grid>
            </Grid>
        </Toolbar>

        {userContext && <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
        >
            <List dense style={{width: 300, padding: 0}}>
                <ListItem alignItems="flex-start"
                          secondaryAction={
                              <Tooltip title={!socket ? 'Socket is disconnected' : 'Socket is connected'}>
                                  <IconButton>
                                      {!socket ? <PowerOff/> : <Power/>}
                                  </IconButton>
                              </Tooltip>
                          }>
                    <ListItemAvatar>
                        <Avatar alt={userContext.username} src={userContext.avatar}/>
                    </ListItemAvatar>
                    <ListItemText
                        primary={userContext.username}
                        secondary={
                            <Typography
                                variant="caption"
                                color="gray"
                            >
                                {userContext.firstName} {userContext.lastName}
                            </Typography>
                        }
                    />
                </ListItem>
                <Divider/>
                <ListItemButton onClick={() => {
                    handleClose();
                    navigate('/App/Profile/Me');
                }}>
                    <ListItemIcon>
                        <Person/>
                    </ListItemIcon>
                    <ListItemText primary={'Profile'}/>
                </ListItemButton>
                <ListItemButton onClick={() => {
                    handleClose();
                    navigate('/App/Profile/Settings');
                }}>
                    <ListItemIcon>
                        <Settings/>
                    </ListItemIcon>
                    <ListItemText primary={'Settings'}/>
                </ListItemButton>
                <ListItemButton onClick={() => {
                    handleClose();
                    navigate('/App/Profile/Theme');
                }}>
                    <ListItemIcon>
                        <Palette/>
                    </ListItemIcon>
                    <ListItemText primary={'Theme'}/>
                </ListItemButton>
                <Divider/>
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
        </Popover>}
    </AppBar>
}