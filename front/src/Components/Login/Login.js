import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import {Button, Divider, Grid, IconButton, InputAdornment, Paper, Snackbar, TextField, Typography} from "@mui/material";
import {Email, Create, Lock, Visibility, VisibilityOff} from "@mui/icons-material";
import {Alert, LoadingButton} from '@mui/lab';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isBlindPass, setIsBlindPass] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    let navigate = useNavigate();

    async function onSubmit(e) {
        e.preventDefault();

        try {
            setIsLoading(true);
            let body = {
                email: email,
                password: password
            }
            const response = await axios.post(`${process.env.REACT_APP_DASHBOARD_API}/auth/login`, body);

            if (response.status !== 200) {
                setIsError(true);
            } else {
                localStorage.setItem('JWT', response.data.accessToken);
                navigate('/App')
            }
            setIsLoading(false);
        } catch (err) {
            if (err.response) {
                setIsError(true);
                setIsLoading(false);
            }
        }
    }

    return <Grid container item xs={12} alignItems={'center'} justifyContent={'center'} style={{height: '100vh'}}>
        <Grid item xs={4}>
            <Paper elevation={8} style={{width: '100%'}}>

                <Grid container item xs={12} spacing={1} justifyContent={'center'} alignItems={'center'} sx={{p: 1}}
                      direction={'column'}>
                    <Grid item xs={12}>
                        <Typography variant="h4" style={{fontWeight: 'bold'}}>
                            Log in
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="subtitle1" color={'grey.500'}>
                            Sign in on the internal platform
                        </Typography>
                    </Grid>

                </Grid>

                <Divider variant="middle"/>

                <Grid container item xs={12} spacing={2} justifyContent={'center'} alignItems={'center'}
                      component={'form'} sx={{p: 3}} onSubmit={onSubmit}>
                    <Grid item xs={12}>
                        <TextField fullWidth required variant={'outlined'} type={'email'} value={email} InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Email/>
                                </InputAdornment>
                            ),
                        }}
                                   onChange={(e) => setEmail(e.target.value)} label={'Email Address'}/>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField fullWidth required variant={'outlined'} type={isBlindPass ? 'password' : 'text'}
                                   value={password}
                                   InputProps={{
                                       startAdornment: (
                                           <InputAdornment position="start">
                                               <Lock/>
                                           </InputAdornment>
                                       ),
                                       endAdornment: (
                                           <InputAdornment position="end">
                                               <IconButton onClick={() => setIsBlindPass(prevState => !prevState)}>
                                                   {isBlindPass ? <VisibilityOff/> : <Visibility/>}
                                               </IconButton>
                                           </InputAdornment>
                                       )
                                   }}
                                   onChange={(e) => setPassword(e.target.value)} label={'Password'}/>
                    </Grid>

                    <Grid item xs={12}>
                        <LoadingButton loading={isLoading} fullWidth color={'primary'} type={'submit'}
                                       variant={'contained'}>
                            Log In
                        </LoadingButton>
                    </Grid>

                </Grid>

                <Divider variant="middle"/>

                <Grid container item xs={12} sx={{p: 3}}>
                    <Button size={'small'} onClick={() => navigate('/register')} startIcon={<Create/>}>
                        Register
                    </Button>
                </Grid>
            </Paper>

            <Snackbar open={isError} autoHideDuration={6000} onClose={() => setIsError(false)}
                      anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}>
                <Alert onClose={() => setIsError(false)} severity="warning" sx={{width: '100%'}}>
                    You have enter a wrong mail or password!
                </Alert>
            </Snackbar>

        </Grid>

    </Grid>
}