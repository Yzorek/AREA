import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import {Button, Divider, Grid, IconButton, InputAdornment, Paper, Snackbar, TextField, Typography} from "@mui/material";
import {Email, Create, Lock, Visibility, VisibilityOff, Google} from "@mui/icons-material";
import {Alert, LoadingButton} from '@mui/lab';
import { GoogleLogin } from 'react-google-login';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isBlindPass, setIsBlindPass] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isGoogleError, setIsGoogleError] = useState(false);
    let navigate = useNavigate();

    const onSuccessGoogle = (response) => {
        (async () => {
            try {
                await loginInSerer('google', response.profileObj.googleId, response.profileObj.email)
            } catch (err) {
                console.log(err);
            }
        })()
    }

    const onFailureGoogle = (response) => {
        console.log('Err Google: ', response);
        setIsGoogleError(true);
    }

    async function loginInSerer(type, pass, mail) {
        try {
            setIsLoading(true);
            let body = {
                email: mail,
                password: pass,
                type: type
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

    async function onSubmit(e) {
        e.preventDefault();
        await loginInSerer('local', password, email);
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

                    <Grid item xs={12} style={{paddingTop: 5}}>
                        <Grid item xs={4}>
                            <GoogleLogin
                                clientId={process.env.GOOGLE_API_KEY}
                                render={renderProps => (
                                    <LoadingButton variant={'contained'} fullWidth onClick={renderProps.onClick}
                                                   disabled={renderProps.disabled} startIcon={<Google/>}>
                                        Sign in
                                    </LoadingButton>
                                )}
                                onSuccess={onSuccessGoogle}
                                onFailure={onFailureGoogle}
                                cookiePolicy={'single_host_origin'}
                            />
                        </Grid>
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

            <Snackbar open={isGoogleError} autoHideDuration={6000} onClose={() => setIsGoogleError(false)}
                      anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}>
                <Alert icon={<Google/>} onClose={() => setIsGoogleError(false)} severity="error" sx={{width: '100%'}}>
                    Google turn into error!
                </Alert>
            </Snackbar>

        </Grid>

    </Grid>
}