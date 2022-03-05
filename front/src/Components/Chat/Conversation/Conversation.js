import React, {useEffect, useRef, useState} from 'react';
import {CircularProgress, Grid, IconButton, InputAdornment, TextField} from "@mui/material";
import axios from "axios";
import AlertError from "../../Tools/AlertError";
import SkeletonConversation from "./SkeletonConversation";
import {AddBox, Edit, Search} from "@mui/icons-material";

export default function Conversation({}) {
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState([]);
    const [isReload, setIsReload] = useState(false)
    const [isError, setIsError] = useState(false)
    const isMounted = useRef(null)

    useEffect(() => {
        if (!isReload)
            return;
        isMounted.current = true
        const source = axios.CancelToken.source();
        setIsLoading(true);
        (async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_KEYBOON_API}/myUrl/toGet`,
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
            source.cancel("Component Chat users table got unmounted");
        };
    }, [isReload])

    return <Grid container item xs={3} style={{height: '100%'}} sx={{borderRight: 1, borderColor: 'divider'}} display={'block'}>
        <Grid container item xs={12} sx={{p: 1, borderBottom: 1, borderColor: 'divider'}}>
            <Grid item xs={10}>
                <TextField disabled={isLoading} variant={'outlined'} label={'Search bar'} size={'small'} color={'primary'} fullWidth type={'search'} InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            {!isLoading ? <Search/> : <CircularProgress style={{height: 20, width: 20}}/>}
                        </InputAdornment>
                    )
                }}/>
            </Grid>
            <Grid container item xs={2} justifyContent={'center'} alignItems={'center'}>
                <IconButton>
                    <AddBox/>
                </IconButton>
            </Grid>
        </Grid>
        <SkeletonConversation/>
        <AlertError isError={isError} setIsError={setIsError}/>
    </Grid>
}