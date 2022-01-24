import React, {useState} from 'react';
import {Button, Checkbox, FormControlLabel, Grid, InputAdornment, Paper, TextField, Typography} from "@mui/material";
import {Cancel, Edit, Password, Save} from "@mui/icons-material";
import AlertError from "../../Tools/AlertError";
import axios from "axios";
import {LoadingButton} from "@mui/lab";

export default function ChangePassword() {
    const [isChangePassword, setIsChangePassword] = useState(false);
    const [lastPass, setLastPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [isError, setIsError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('Error has occurred');
    const [severity, setSeverity] = useState('warning');
    const [isLoading, setIsLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            let body = {
                lastPassword: lastPass,
                newPassword: newPass,
            }
            const response = await axios.put(`${process.env.REACT_APP_DASHBOARD_API}/users/password`, body,
                {
                    'headers': {'Authorization': `Bearer  ${localStorage.getItem('JWT')}`}
                });
            setErrorMsg(response.data.message);
            if (response.status === 200)
                setSeverity('success');
            setIsError(true);
            setIsChangePassword(false);
            setIsLoading(false);
            setShowPassword(false);
            setLastPass('');
            setNewPass('');
        } catch (err) {
            if (err.response) {
                setIsError(true);
                setIsLoading(false);
                setShowPassword(false);
                setLastPass('');
                setNewPass('');
            }
        }
    }

    const handleCancel = () => {
        setIsChangePassword(false);
        setShowPassword(false);
        setLastPass('');
        setNewPass('');
        setSeverity('warning');
    }

    return <Paper elevation={1} sx={{p: 4}}>
        <Grid container item xs={12}>
            <Grid item xs={4}>
                <Typography style={{fontWeight: 'bold', fontSize: 20}}>
                    Change password
                </Typography>
            </Grid>
            <Grid container item xs={8} spacing={2} component={'form'} onSubmit={onSubmit}>
                <Grid item xs={12}>
                    <TextField required disabled={!isChangePassword || isLoading} size={"small"}
                               onChange={(e) => setLastPass(e.target.value)} fullWidth
                               label={isChangePassword ? 'Last Password' : 'Password'} variant={'outlined'}
                               value={isChangePassword ? lastPass : 'ffffffffffffffffffffffffff'} type={showPassword ? 'text' : 'password'}
                               InputProps={{
                                   startAdornment: (
                                       <InputAdornment position="start">
                                           <Password/>
                                       </InputAdornment>
                                   ),
                               }}/>
                </Grid>
                {isChangePassword && <Grid item xs={12}>
                    <TextField required disabled={!isChangePassword || isLoading} size={"small"} fullWidth
                               label={'New Password'} variant={'outlined'} value={newPass}
                               type={showPassword ? 'text' : 'password'} onChange={(e) => setNewPass(e.target.value)} InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Password/>
                            </InputAdornment>
                        ),
                    }}/>
                </Grid>}
                {isChangePassword && <Grid container item xs={12} style={{paddingTop: 0}}>
                    <FormControlLabel control={<Checkbox color={'primary'} checked={showPassword} onChange={() => setShowPassword(prevState => !prevState)} />} label="Show password" />
                </Grid>}
                <Grid container item xs={12} justifyContent={'flex-end'} spacing={2}>
                    {isChangePassword ? <>
                        <Grid item xs={3}>
                            <Button variant={'contained'} startIcon={<Cancel/>} fullWidth color={'secondary'}
                                    onClick={handleCancel}>
                                Cancel
                            </Button>
                        </Grid>
                        <Grid item xs={3}>
                            <LoadingButton loading={isLoading} type={'submit'} variant={'contained'} startIcon={<Save/>} fullWidth color={'primary'}>
                                Save
                            </LoadingButton>
                        </Grid>
                    </> : <Grid item xs={3}>
                        <Button variant={'contained'} startIcon={<Edit/>} fullWidth color={'primary'}
                                onClick={() => setIsChangePassword(true)}>
                            Edit
                        </Button>
                    </Grid>}
                </Grid>
            </Grid>
        </Grid>
        <AlertError isError={isError} setIsError={setIsError} msg={errorMsg} severity={severity}/>
    </Paper>
}