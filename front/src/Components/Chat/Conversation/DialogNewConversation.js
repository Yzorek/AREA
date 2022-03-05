import React, {useContext, useEffect, useRef, useState} from 'react';
import {
    Alert, Avatar, Checkbox,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    InputAdornment, List, ListItem, ListItemAvatar, ListItemText,
    TextField
} from "@mui/material";
import {LoadingButton, Skeleton} from "@mui/lab";
import {Search} from "@mui/icons-material";
import TutorialContext from "../../Tools/TutorialContext/TutorialContext";
import axios from "axios";
import AlertError from "../../Tools/AlertError";

function SkeletonUserNewConv() {
    return [1, 2, 3, 4, 5].map(item => <ListItem button key={`Skeleton user new conv - ${item}`} sx={{
        [`&:hover`]: {
            bgcolor: 'gray.200',
        },
    }} secondaryAction={<Checkbox disabled={true}/>}>
        <ListItemAvatar>
            <Skeleton variant="circular" width={40} height={40}/>
        </ListItemAvatar>
        <ListItemText primary={
            <Skeleton style={{width: '90%'}}/>
        }/>
    </ListItem>)
}

export default function DialogNewConversation({open, handleClose}) {
    const [data, setData] = useState([])
    const [selectedUser, setSelectedUser] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false)
    const isMounted = useRef(null)
    let tutorialMode = useContext(TutorialContext);

    useEffect(() => {
        if (!open)
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
            source.cancel("Component Dialog new conv got unmounted");
        };
    }, [open])


    function handleCloseDialog(isToReload) {
        handleClose(isToReload)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        handleClose(true)
    }

    return <Dialog component={'form'} open={open} onClose={() => handleCloseDialog(false)} onSubmit={onSubmit} fullWidth
                   maxWidth={'sm'}>
        <DialogTitle>
            New conversation
        </DialogTitle>
        <DialogContent>
            {tutorialMode.isActive && <Grid container item xs={12}>
                <Alert severity="info" style={{width: '100%'}}>Selected your friend.</Alert>
            </Grid>}
            <Grid item xs={12} sx={{p: 1}}>
                <TextField disabled={isLoading} variant={'outlined'} label={'Search bar'} size={'small'}
                           color={'primary'} fullWidth type={'search'} InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            {!isLoading ? <Search/> : <CircularProgress style={{height: 20, width: 20}}/>}
                        </InputAdornment>
                    )
                }}/>
            </Grid>
            <Grid container item xs={12}>
                <List style={{width: "100%", overflow: 'auto', height: 200}}>
                    {isLoading ? <SkeletonUserNewConv/> : data.map(item => <ListItem button key={`User new conv - ${item.id}`} sx={{
                        [`&:hover`]: {
                            bgcolor: 'gray.200',
                        },
                    }} secondaryAction={<Checkbox disabled={true}/>}>
                        <ListItemAvatar>
                            <Avatar alt={item.username} src={item.avatar}/>
                        </ListItemAvatar>
                        <ListItemText primary={item.username}/>
                    </ListItem>)}
                </List>
            </Grid>
        </DialogContent>
        <DialogActions>
            <LoadingButton disabled={!selectedUser.length} loading={isLoading} variant={'contained'} fullWidth color={"primary"} type={'submit'}>
                Create
            </LoadingButton>
        </DialogActions>
        <AlertError setIsError={setIsError} isError={isError}/>
    </Dialog>
}