import React, {useEffect, useState} from 'react';
import {Avatar, Button, Grid, IconButton, InputAdornment, Paper, TextField, Tooltip, Typography} from "@mui/material";
import {Badge, Cancel, Edit, Email, Person, Save} from "@mui/icons-material";
import {LoadingButton, Skeleton} from "@mui/lab";
import AlertError from "../../Tools/AlertError";
import axios from "axios";

const TYPE_LOCAL = 'local'

function SkeletonBasicDetails() {
    return <Paper elevation={1} sx={{p: 4}}>
        <Grid container item xs={12}>
            <Grid item xs={4}>
                <Typography style={{fontWeight: 'bold', fontSize: 20}}>
                    Basic Details
                </Typography>
            </Grid>
            <Grid container item xs={8} spacing={2}>
                <Grid item xs={2}>
                    <Skeleton variant="circular" width={60} height={60}/>
                </Grid>
                <Grid container item xs={12} alignItems={'center'}>
                    <Skeleton variant="rectangular" width={'100%'} height={40}/>
                </Grid>
                <Grid item xs={6}>
                    <Skeleton variant="rectangular" width={'100%'} height={40}/>
                </Grid>
                <Grid item xs={6}>
                    <Skeleton variant="rectangular" width={'100%'} height={40}/>
                </Grid>
                <Grid item xs={12}>
                    <Skeleton variant="rectangular" width={'100%'} height={40}/>
                </Grid>
            </Grid>
        </Grid>
    </Paper>
}

export default function BasicDetails({hotReload, data, isLoading}) {
    const [isEdit, setIsEdit] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isError, setIsError] = useState(false);
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");

    const handleCancelEdit = () => {
        setIsEdit(false);
    }

    useEffect(() => {
        if (!isLoading && data) {
            setUsername(data.username);
            setFirstName(data.firstName);
            setLastName(data.lastName);
            setEmail(data.email);
        }
    }, [isLoading, data])

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            let body = {
                username: username,
                firstName: firstName,
                lastName: lastName,
                avatar: data.avatar,
                email: email
            }
            setIsSaving(true);
            await axios.put(`${process.env.REACT_APP_DASHBOARD_API}/users/me`, body,
                {
                    'headers': {'Authorization': `Bearer  ${localStorage.getItem('JWT')}`}
                });
            setIsEdit(false);
            setIsSaving(false);
            hotReload();
        } catch (err) {
            if (err.response) {
                setIsError(true);
                setIsSaving(false);
                setIsEdit(false);
            }
        }
    }

    if (isLoading || !data)
        return <SkeletonBasicDetails/>

    return <Paper elevation={1} sx={{p: 4}}>
        <Grid container item xs={12}>
            <Grid item xs={4}>
                <Typography style={{fontWeight: 'bold', fontSize: 20}}>
                    Basic Details
                </Typography>
            </Grid>
            <Grid container item xs={8} spacing={2} component={'form'} onSubmit={onSubmit}>
                <Grid item xs={2}>
                    <Avatar sx={{width: 60, height: 60}} alt={data.username} src={data.avatar}/>
                </Grid>
                {!isEdit && <Grid container item xs={4} alignItems={'center'}>
                    <Tooltip title={'Edit your basic information'}>
                        <IconButton onClick={() => setIsEdit(true)}>
                            <Edit/>
                        </IconButton>
                    </Tooltip>
                </Grid>}
                <Grid container item xs={12} alignItems={'center'} justifyContent={'flex-start'}>
                    {isEdit ? <TextField value={username} onChange={(e) => setUsername(e.target.value)} disabled={isSaving} required size={'small'} fullWidth variant={'outlined'}
                                         label={'Username'} InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Person/>
                            </InputAdornment>
                        ),
                    }}/> : <>
                        <Grid item xs={1}>
                            <Person/>
                        </Grid>
                        <Grid container item xs={10}>
                            <Typography>
                                {data.username}
                            </Typography>
                        </Grid>
                    </>}
                </Grid>
                <Grid container item xs={6} alignItems={'center'} justifyContent={'space-between'}>
                    {isEdit ? <TextField value={firstName} onChange={(e) => setFirstName(e.target.value)} disabled={isSaving} required size={'small'} fullWidth variant={'outlined'}
                                         label={'Firstname'} InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Badge/>
                            </InputAdornment>
                        ),
                    }}/> : <>
                        <Grid item xs={1}>
                            <Badge/>
                        </Grid>
                        <Grid item xs={10}>
                            <Typography>
                                {data.firstName} {data.lastName}
                            </Typography>
                        </Grid>
                    </>}
                </Grid>
                <Grid container item xs={6} alignItems={'center'} justifyContent={'space-between'}>
                    {isEdit && <TextField value={lastName} onChange={(e) => setLastName(e.target.value)} disabled={isSaving} required size={'small'} fullWidth variant={'outlined'}
                                          label={'Lastname'} InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Badge/>
                            </InputAdornment>
                        ),
                    }}/>}
                </Grid>
                <Grid container item xs={12} alignItems={'center'} justifyContent={'flex-start'}>
                    {isEdit ? <TextField value={email} disabled={TYPE_LOCAL !== data.auth || isSaving} type={'mail'} onChange={(e) => setEmail(e.target.value)} required size={'small'} fullWidth variant={'outlined'}
                                         label={'Mail'} InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Email/>
                            </InputAdornment>
                        ),
                    }}/> : <>
                        <Grid item xs={1}>
                            <Email/>
                        </Grid>
                        <Grid item xs={10}>
                            <Typography>
                                {data.email}
                            </Typography>
                        </Grid>
                    </>}
                </Grid>
                {isEdit && <Grid container item xs={12} alignItems={'center'} justifyContent={'flex-end'} spacing={2}>
                    <Grid item xs={3}>
                        <Button variant={'contained'} fullWidth color={'secondary'} startIcon={<Cancel/>}
                                onClick={handleCancelEdit}>
                            Cancel
                        </Button>
                    </Grid>
                    <Grid item xs={3}>
                        <LoadingButton loading={isSaving} type={"submit"} variant={'contained'} fullWidth
                                       color={'primary'} startIcon={<Save/>}>
                            Save
                        </LoadingButton>
                    </Grid>
                </Grid>}
            </Grid>
        </Grid>
        <AlertError setIsError={setIsError} isError={isError}/>
    </Paper>
}