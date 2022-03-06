import React, {useContext, useEffect, useRef, useState} from 'react';
import {Avatar, Grid, IconButton, ListItem, ListItemAvatar, ListItemText, TextField} from "@mui/material";
import RecapConv from "./RecapConv";
import {Send} from "@mui/icons-material";
import MainLoader from "../../Tools/MainLoader";
import axios from "axios";
import AlertError from "../../Tools/AlertError";
import UserContext from "../../Tools/UserContext/UserContext";
import moment from "moment";

function DesignSender({data}) {
    return <Grid container item xs={12} justifyContent={'flex-start'}>
        <Grid item>
            <ListItem>
                <ListItemAvatar>
                    <Avatar alt={data.sender.username} src={data.sender.avatar}/>
                </ListItemAvatar>
                <ListItemText primary={data.msg}
                              secondary={moment(data.date, 'YYYY-MM-DDTHH:mm:ss').format('MMMM Do YYYY, HH:mm:ss')}/>
            </ListItem>
        </Grid>
    </Grid>
}

function DesignReceiver({data}) {
    return <Grid container item xs={12} justifyContent={'flex-end'}>
        <Grid item>
            <ListItem>
                <ListItemText style={{marginRight: 10}} primary={data.msg}
                              secondary={moment(data.date, 'YYYY-MM-DDTHH:mm:ss').format('MMMM Do YYYY, HH:mm:ss')}/>
                <ListItemAvatar>
                    <Avatar alt={data.sender.username} src={data.sender.avatar}/>
                </ListItemAvatar>
            </ListItem>
        </Grid>
    </Grid>
}

export default function Message({selectedIdConv}) {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [msg, setMsg] = useState("")
    const [isError, setIsError] = useState(false);
    let userContext = useContext(UserContext);
    const isMounted = useRef(null)

    useEffect(() => {
        console.log(userContext)
        if (selectedIdConv <= 0)
            return;
        isMounted.current = true
        const source = axios.CancelToken.source();
        setIsLoading(true);
        (async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_DASHBOARD_API}/msg/conversation/${selectedIdConv}`,
                    {
                        cancelToken: source.token,
                        'headers': {'Authorization': `Bearer  ${localStorage.getItem('JWT')}`}
                    })
                if (isMounted && isMounted.current) {
                    console.log(response.data)
                    setData(response.data)
                    setIsLoading(false)
                }
            } catch (err) {
                if (err.response) {
                    setIsError(true)
                    setIsLoading(false)
                }
            }
        })()
        return () => {
            isMounted.current = false
            source.cancel("Component Message got unmounted");
        };
    }, [selectedIdConv])

    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.post(`${process.env.REACT_APP_DASHBOARD_API}/msg/conversation/${selectedIdConv}`, {msg: msg},
                {
                    'headers': {'Authorization': `Bearer  ${localStorage.getItem('JWT')}`}
                })
            data.msg.push({
                id: 1,
                msg: msg,
                date: moment().format('YYYY-MM-DDTHH:mm:ss'),
                sender: userContext,
            })
            setMsg("")
        } catch (err) {
            if (err.response) {
                setIsError(true);
            }
        }
    }

    if (selectedIdConv <= 0)
        return <Grid container item xs={9} display={'block'} style={{height: '100%'}}>
            sheeesh
        </Grid>

    return <Grid container item xs={9} display={'block'} style={{height: '100%'}} component={'form'}
                 onSubmit={onSubmit}>
        <RecapConv isLoading={isLoading} data={data}/>
        {isLoading ? <Grid container item xs={12} style={{height: 'calc(100% - 116px)'}} justifyContent={'center'}
                           alignItems={'center'}>
                <MainLoader/>
            </Grid> :
            <Grid container item xs={12} style={{height: 'calc(100% - 116px)', overflow: 'auto'}} display={'block'}>
                {data && data.msg && data.msg.map(elem => {
                    if (elem.sender.id === userContext.id)
                        return <DesignReceiver data={elem}/>
                    return <DesignSender data={elem}/>
                })}
            </Grid>}
        <Grid container item xs={12} sx={{borderTop: 1, borderColor: 'divider', p: 1}}>
            <Grid item xs={2}/>
            <Grid item xs={8}>
                <TextField variant={'outlined'} required label={'Text'} size={'small'} color={'primary'} fullWidth
                           type={'search'} value={msg} onChange={(e) => setMsg(e.target.value)}/>
            </Grid>
            <Grid item xs={2}>
                <IconButton type={"submit"}>
                    <Send/>
                </IconButton>
            </Grid>
        </Grid>
        <AlertError isError={isError} setIsError={setIsError}/>
    </Grid>
}