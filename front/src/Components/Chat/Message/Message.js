import React, {useEffect, useRef, useState} from 'react';
import {Grid, IconButton, TextField} from "@mui/material";
import RecapConv from "./RecapConv";
import {Send} from "@mui/icons-material";
import MainLoader from "../../Tools/MainLoader";
import axios from "axios";
import AlertError from "../../Tools/AlertError";

export default function Message({selectedIdConv}) {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const isMounted = useRef(null)

    useEffect(() => {
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

    if (selectedIdConv <= 0)
        return <Grid container item xs={9} display={'block'} style={{height: '100%'}}>
            sheeesh
        </Grid>

    return <Grid container item xs={9} display={'block'} style={{height: '100%'}}>
        <RecapConv isLoading={isLoading} data={data}/>
        <Grid container item xs={12} style={{height: 'calc(100% - 116px)'}} justifyContent={'center'} alignItems={'center'}>
            <MainLoader/>
        </Grid>
        <Grid container item xs={12} sx={{borderTop: 1, borderColor: 'divider', p:1}}>
            <Grid item xs={2}/>
            <Grid item xs={8}>
                <TextField variant={'outlined'} label={'Text'} size={'small'} color={'primary'} fullWidth type={'search'}/>
            </Grid>
            <Grid item xs={2}>
                <IconButton>
                    <Send/>
                </IconButton>
            </Grid>
        </Grid>
        <AlertError isError={isError} setIsError={setIsError}/>
    </Grid>
}