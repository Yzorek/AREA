import React from 'react';
import {Grid} from "@mui/material";
import Conversation from "./Conversation/Conversation";
import Message from "./Message/Message";

export default function Chat() {
    return <Grid container item xs={12} style={{height: '100%'}}>
        <Conversation/>
        <Message/>
    </Grid>
}