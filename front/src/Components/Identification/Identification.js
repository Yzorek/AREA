import React, {useEffect} from 'react';
import {useParams} from "react-router";
import axios from "axios";
import {Avatar, Link, Grid, Paper, Typography} from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';

export default function Identification() {
    let { idUser, username } = useParams();

    useEffect(() => {
        (async () => {
            try {
                await axios.post(`${process.env.REACT_APP_DASHBOARD_API}/users/identification/${idUser}`, {
                })
            } catch (err) {
                console.log(err);
            }
        })()
    }, [idUser, username])

    return <Grid container item xs={12} style={{height: '100vh', width: '100vw'}} justifyContent={'center'} alignItems={'center'}>
        <div style={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'absolute',
            width: '100%',
            height: '100%',
        }}/>
        <Grid container item xs={5} style={{zIndex: 6}}>
            <Paper elevation={3} style={{width: '100%', padding: 20}}>
                <Grid container item xs={12}>
                    <Grid container item xs={12} justifyContent={'center'} alignItems={'center'} direction={'column'}>
                        <Avatar sx={{m: 1, bgcolor: 'red'}}>
                            <CheckIcon/>
                        </Avatar>
                        <Typography variant='h4'>
                            Congratulations
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography style={{textAlign: 'center'}}>
                            Your account is now active !
                        </Typography>
                    </Grid>
                    <Grid container item xs={12} justifyContent={'center'}>
                        <Link href="/">Go to Ulys !</Link>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    </Grid>
}