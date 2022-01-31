import {Grid, Paper, SvgIcon, Alert, Typography} from "@mui/material";
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TelegramIcon from '@mui/icons-material/Telegram';
import { ReactComponent as DiscordIcon } from '../../assets/discord.svg'
import { ReactComponent as TwitchIcon } from '../../assets/twitch.svg'
import { useState } from "react";

export default function Services() {
    const [services, setServices] = useState([
        {
            name: 'Twitter',
            color: '#1C9CEB',
            icon: <TwitterIcon sx={{ fontSize: 50, color: 'white' }}/>,
            isActive: false,
        },
        {
            name: 'Instagram',
            color: '#CC0063',
            icon: <InstagramIcon sx={{ fontSize: 50, color: 'white' }}/>,
            isActive: false
        },
        {
            name: 'Discord',
            color: '#5562EA',
            icon: <SvgIcon component={DiscordIcon} sx={{ fontSize: 50, color: 'white' }} inheritViewBox/>,
            isActive: false
        },
        {
            name: 'Twitch',
            color: '#8C45F7',
            icon: <SvgIcon component={TwitchIcon} sx={{ fontSize: 50, color: 'white' }} inheritViewBox/>,
            isActive: false
        },
        {
            name: 'Youtube',
            color: '#F70000',
            icon: <YouTubeIcon sx={{ fontSize: 50, color: 'white' }}/>,
            isActive: false
        },
        {
            name: 'Telegram',
            color: '#26A2E1',
            icon: <TelegramIcon sx={{ fontSize: 50, color: 'white' }}/>,
            isActive: false
        }
    ])

    const handleServiceActivation = (index) => {                // TODO make proper request
        services[index].isActive = !services[index].isActive;
        setServices([...services]);
    }

    return (
        <Grid container item xs={12} style={{ padding: 20 }} spacing={2}>
            <Grid container item xs={12}>
                <Typography variant={'h5'} style={{fontWeight: 'bold'}}>
                    SERVICES
                </Typography>
            </Grid>
            <Grid container item xs={12}>
                <Alert severity="info" style={{width: '100%'}}>Selected your service bellow.</Alert>
            </Grid>
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

            {/*<Grid container item xs={12} style={{ padding: 20 }} spacing={2}>
                {services.map((item, index) => <Grid item xs={2} key={`${item.name}-${index}-card-service V2`}>
                    <Paper style={{height: 140, background: item.color}} sx={{
                        transition: '0.5s',
                        bgcolor: 'background.paper',
                        '&:hover': {boxShadow: 10}
                    }} elevation={5}>
                        <Grid container item xs={12} direction={'column'} alignItems={'center'} justifyContent={'center'} sx={{p: 2}}>
                            {item.icon}
                            <Typography color={'white'} style={{fontWeight: 'bold'}}>
                                {item.name}
                            </Typography>
                            <Switch checked={item.isActive} onChange={() => handleServiceActivation(index)}/>
                        </Grid>
                    </Paper>
                </Grid>)}
            </Grid>*/}
        </Grid>
    )

}