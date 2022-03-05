import {Grid, Paper, SvgIcon, Alert, Typography} from "@mui/material";
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TelegramIcon from '@mui/icons-material/Telegram';
import {ReactComponent as DiscordIcon} from '../../assets/discord.svg'
import {ReactComponent as TwitchIcon} from '../../assets/twitch.svg'
import {useContext, useEffect, useRef, useState} from "react";
import axios from "axios";
import SkeletonServices from "./SkeletonServices";
import React from "react";
import AlertError from "../Tools/AlertError";
import TutorialContext from "../Tools/TutorialContext/TutorialContext";
import DialogConfirmationUnsub from "./UnsubDialog";
import TelegramLoginButton from 'react-telegram-login';
import ReactDOM from 'react-dom';

export default function Services({onServiceSub, onGetService, checkIfAR}) {
    const [isLoading, setIsLoading] = useState(true);
    const [services, setServices] = useState([]);
    const [serviceToDel, setServiceToDel] = useState('');
    const [isError, setIsError] = useState(false);
    const isMounted = useRef(null);
    const [isAddOpen, setIsAddOpen] = useState(false);
    let tutorialMode = useContext(TutorialContext);

    const handleServiceUnsubClose = (isUnsub) => {
        if (isUnsub) {
            subUnsubToService(serviceToDel, true);
        }
        setIsAddOpen(false);
    }

    const handleAddOpen = () => {
        setIsAddOpen(true);
    }

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
                    onGetService(servicesFetched.filter((e) => e.isActive === true).length);
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
    }, [onGetService])

    const iconFromName = (name) => {
        switch (name) {
            case ('Twitter'):
                return (<TwitterIcon sx={{fontSize: 50, color: 'white'}}/>);
            case ('Spotify'):
                return (<svg sx={{fontSize: 50, color: 'white'}} width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M19.098 10.638c-3.868-2.297-10.248-2.508-13.941-1.387-.593.18-1.22-.155-1.399-.748-.18-.593.154-1.22.748-1.4 4.239-1.287 11.285-1.038 15.738 1.605.533.317.708 1.005.392 1.538-.316.533-1.005.709-1.538.392zm-.126 3.403c-.272.44-.847.578-1.287.308-3.225-1.982-8.142-2.557-11.958-1.399-.494.15-1.017-.129-1.167-.623-.149-.495.13-1.016.624-1.167 4.358-1.322 9.776-.682 13.48 1.595.44.27.578.847.308 1.286zm-1.469 3.267c-.215.354-.676.465-1.028.249-2.818-1.722-6.365-2.111-10.542-1.157-.402.092-.803-.16-.895-.562-.092-.403.159-.804.562-.896 4.571-1.045 8.492-.595 11.655 1.338.353.215.464.676.248 1.028zm-5.503-17.308c-6.627 0-12 5.373-12 12 0 6.628 5.373 12 12 12 6.628 0 12-5.372 12-12 0-6.627-5.372-12-12-12z"/></svg>);
            case ('Telegram'):
                return (<TelegramIcon sx={{fontSize: 50, color: 'white'}}/>);
            case ('Twitch'):
                return (<SvgIcon component={TwitchIcon} sx={{fontSize: 50, color: 'white'}} inheritViewBox/>);
            case ('Discord'):
                return (<SvgIcon component={DiscordIcon} sx={{fontSize: 50, color: 'white'}} inheritViewBox/>);
            case ('Youtube'):
                return (<YouTubeIcon sx={{fontSize: 50, color: 'white'}}/>);
            default:
                return (<TwitterIcon sx={{fontSize: 50, color: 'white'}}/>);
        }
    }

    const subUnsubToService = async (service, shouldDeleteAR) => {
        service.isActive = !service.isActive;
        setServices([...services]);
        onServiceSub([...services], shouldDeleteAR ? serviceToDel : undefined);
        const source = axios.CancelToken.source();
        await (async () => {
            try {
                let body = {
                    action: service.isActive ? 'sub' : 'unsub',
                    serviceId: service.id
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
        })()
    }

    const handleTelegramResponse = response => {
        console.log(response);
    };

    const handleServiceActivation = async (service) => {
        if (service.isActive) {
            if (checkIfAR(service)) {
                setServiceToDel(service);
                handleAddOpen();
            } else {
                subUnsubToService(service, false);
            }
        }
        else {
            if (service.name === 'Twitter') {
                window.location.href = "https://twitter.com/i/oauth2/authorize?response_type=code&client_id=YXVaTlVPUGJrYnBPcGJrdERwTFI6MTpjaQ&redirect_uri=http://localhost:8082/App/TwitterRedirect&scope=tweet.read%20tweet.write%20users.read%20follows.read%20follows.write&state=state&code_challenge=challenge&code_challenge_method=plain"
            } else if(service.name === 'Spotify') {
                window.location.href = "https://accounts.spotify.com/authorize?response_type=code&client_id=187c0fc794714871bbe61948b5232d56&scope=user-read-private%20user-read-email%20user-library-read%20user-read-playback-state&redirect_uri=http://localhost:8082/App/SpotifyRedirect&state=generateRandomString(16)"
            } else {
                subUnsubToService(service, false);
            }
        }
    }

    return (
        <Grid container item xs={12} style={{padding: 20}} spacing={2}>
            <Grid container item xs={12}>
                <Typography variant={'h5'} style={{fontWeight: 'bold'}}>
                    SERVICES
                </Typography>
            </Grid>
            {tutorialMode.isActive && <Grid container item xs={12}>
                <Alert severity="info" style={{width: '100%'}}>Select your service below.</Alert>
            </Grid>}
            {isLoading ? <SkeletonServices/> :
                <Grid container item xs={12} spacing={2}>
                    {services.map((item, index) => <Grid item xs={2} key={`${item.name}-${index}-card-service`}>
                        <Paper style={{
                            height: 140,
                            background: item.isActive ? item.color : 'gray',
                            cursor: 'pointer',
                            borderRadius: 10
                        }} sx={{
                            transition: '0.5s',
                            '&:hover': {boxShadow: 12}
                        }} elevation={0} onClick={() => handleServiceActivation(item)}>
                            <Grid container item xs={12} direction={'column'} alignItems={'center'}
                                  justifyContent={'center'} sx={{p: 2}} style={{height: '100%'}}>
                                {item.icon}
                                <Typography color={'white'} style={{fontWeight: 'bold'}}>
                                    {item.name}
                                </Typography>
                            </Grid>
                        </Paper>
                    </Grid>)}
                </Grid>
            }
            <DialogConfirmationUnsub service={serviceToDel} open={isAddOpen} handleClose={handleServiceUnsubClose}/>
            <AlertError isError={isError} setIsError={setIsError}/>
        </Grid>
    )

}