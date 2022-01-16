import React from "react";
import {
    Toolbar,
    AppBar,
    Tooltip,
    IconButton,
    Grid,
    TextField,
    InputAdornment,
} from "@mui/material";
import {Notifications, ChatBubble, Search} from "@mui/icons-material";
import {drawWith} from "./config";

export default function AppBarArea() {

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

                </Grid>
            </Grid>
        </Toolbar>
    </AppBar>
}