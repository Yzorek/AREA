import {Grid, Paper, SvgIcon, Alert, Typography} from "@mui/material";
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TelegramIcon from '@mui/icons-material/Telegram';
import { ReactComponent as DiscordIcon } from '../../assets/discord.svg'
import { ReactComponent as TwitchIcon } from '../../assets/twitch.svg'
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import SkeletonServices from "./SkeletonServices";
import React from "react";
import AlertError from "../Tools/AlertError";

export default function Services() {
    const [isLoading, setIsLoading] = useState(true);
    const [services, setServices] = useState([]);
    const [isError, setIsError] = useState(false);
    const isMounted = useRef(null);

    useEffect(() => {
        isMounted.current = true
        const source = axios.CancelToken.source();
        (async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(`${process.env.REACT_APP_DASHBOARD_API}/services`,
                    {
                        cancelToken: source.token,
                        'headers': {'Authorization': `Bearer  ${localStorage.getItem('JWT')}`}
                    });
                if (isMounted && isMounted.current) {
                    let servicesFetched = response.data;
                    servicesFetched.forEach((element, index) => {
                        servicesFetched[index] = {
                            icon: iconFromName(element.name),
                            ...element
                        }
                    })
                    setServices(servicesFetched);
                    setIsLoading(false);
                }
            } catch (err) {
                if (err.response) {
                    setIsError(true);
                    setIsLoading(false);
                }
            }
        })()
        return () => {
            isMounted.current = false;
            source.cancel("Component Services GET user data got unmounted");
        }
    }, [])

    const iconFromName = (name) => {
        switch (name) {
            case ('Twitter'):
                return (<TwitterIcon sx={{ fontSize: 50, color: 'white' }}/>);
            case ('Instagram'):
                return (<InstagramIcon sx={{ fontSize: 50, color: 'white' }}/>);
            case ('Telegram'):
                return (<TelegramIcon sx={{ fontSize: 50, color: 'white' }}/>);
            case ('Twitch'):
                return (<SvgIcon component={TwitchIcon} sx={{ fontSize: 50, color: 'white' }} inheritViewBox/>);
            case ('Discord'):
                return (<SvgIcon component={DiscordIcon} sx={{ fontSize: 50, color: 'white' }} inheritViewBox/>);
            case ('Youtube'):
                return (<YouTubeIcon sx={{ fontSize: 50, color: 'white' }}/>);
            default:
                return (<TwitterIcon sx={{ fontSize: 50, color: 'white' }}/>);
        }
    }

    const handleServiceActivation = async (index) => {
        // OAuth step
        services[index].isActive = !services[index].isActive;
        setServices([...services]);
        const source = axios.CancelToken.source();
        try {
            let body = {
                action: services[index].isActive ? 'sub' : 'unsub',
                serviceId: services[index].id
            };
            await axios.post(`${process.env.REACT_APP_DASHBOARD_API}/services/subscribe`, body,
                {
                    cancelToken: source.token,
                    'headers': {'Authorization': `Bearer  ${localStorage.getItem('JWT')}`}
                });
        } catch (err) {
            if (err.response) {
                setIsError(true);
            }
        }
    }

    return (
        <Grid container item xs={12} style={{ padding: 20 }} spacing={2}>
            <Grid container item xs={12}>
                <Typography variant={'h5'} style={{fontWeight: 'bold'}}>
                    SERVICES
                </Typography>
            </Grid>
            <Grid container item xs={12}>
                <Alert severity="info" style={{width: '100%'}}>Select your service below.</Alert>
            </Grid>
            {isLoading ? <SkeletonServices/> :
                    <Grid container item xs={12} spacing={2}>
                        {services.map((item, index) => <Grid item xs={2} key={`${item.name}-${index}-card-service`}>
                                    <Paper style={{height: 140, background: item.isActive ? item.color : 'gray', cursor: 'pointer'}} sx={{
                                        transition: '0.5s',
                                        '&:hover': {boxShadow: 12}
                                    }} elevation={5} onClick={() => handleServiceActivation(index)}>
                                        <Grid container item xs={12} direction={'column'} alignItems={'center'} justifyContent={'center'} sx={{p: 2}} style={{height: '100%'}}>
                                            {item.icon}
                                            <Typography color={'white'} style={{fontWeight: 'bold'}}>
                                                {item.name}
                                            </Typography>
                                        </Grid>
                                    </Paper>
                                </Grid>)}
                    </Grid>
            }
            <AlertError isError={isError} setIsError={setIsError}/>
        </Grid>
    )

}