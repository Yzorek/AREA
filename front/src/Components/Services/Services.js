import { ButtonBase, Card, Divider, Grid, SvgIcon, Switch, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TelegramIcon from '@mui/icons-material/Telegram';
import { ReactComponent as DiscordIcon } from '../../assets/discord.svg'
import { ReactComponent as TwitchIcon } from '../../assets/twitch.svg'
import AreaDialog from "./AreaDialog";
import { useState } from "react";

export default function Services() {
    const [isAddOpen, setIsAddOpen] = useState(false)
    const [areas, setAreas] = useState([])

    const services = [
        {
            name: 'Twitter',
            color: '#1C9CEB',
            icon: <TwitterIcon sx={{ fontSize: 50, color: 'white' }}/>
        },
        {
            name: 'Instagram',
            color: '#CC0063',
            icon: <InstagramIcon sx={{ fontSize: 50, color: 'white' }}/>
        },
        {
            name: 'Discord',
            color: '#5562EA',
            icon: <SvgIcon component={DiscordIcon} sx={{ fontSize: 50, color: 'white' }} inheritViewBox/>
        },
        {
            name: 'Twitch',
            color: '#8C45F7',
            icon: <SvgIcon component={TwitchIcon} sx={{ fontSize: 50, color: 'white' }} inheritViewBox/>
        },
        {
            name: 'Youtube',
            color: '#F70000',
            icon: <YouTubeIcon sx={{ fontSize: 50, color: 'white' }}/>
        },
        {
            name: 'Telegram',
            color: '#26A2E1',
            icon: <TelegramIcon sx={{ fontSize: 50, color: 'white' }}/>
        }
    ]

    const handleAddClose = (value) => {
        console.log(value);
        if (Object.keys(value).length !== 0) {
            let newArray = areas;
            newArray.push({
                actionId: value.actionId,
                reactionId: value.reactionId,
                color: '#26A2E1'
            });
            setAreas(newArray);
        }
        setIsAddOpen(false);
    }

    return (
        <Grid>
            <Grid container item xs={12} style={{ padding: 20 }}>
                <Typography variant={'h5'} style={{fontWeight: 'bold'}}>
                    SERVICES
                </Typography>
            </Grid>
            <Grid container item xs={12} style={{ padding: 20 }}>
                {services.map((item) => {
                    return (
                        <Card style={{ padding: 15, marginRight: 50, background: item.color, width: 100, height: 100, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
                            {item.icon}
                            <Switch>
                            </Switch>
                        </Card>
                    )
                })}
            </Grid>
            <Divider/>
            <Grid container item xs={12} style={{ padding: 20 }}>
                <Typography variant={'h5'} style={{fontWeight: 'bold'}}>
                    ACTIONS-REACTIONS
                </Typography>
            </Grid>
            <Grid container item xs={12} style={{ padding: 20 }}>
                {areas.map((item) => {
                    return (
                        <Card style={{marginRight: 50, background: item.color, width: 150, height: 150, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
                            {item.actionId}
                            <Switch>
                            </Switch>
                        </Card>
                    )
                })}
                <Card style={{marginRight: 50, background: '#ffffff', width: 150, height: 150}}>
                    <ButtonBase style={{width: '100%', height: '100%', paddingTop: 8, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', position: 'relative'}}
                    onClick={() => setIsAddOpen(true)}>
                    <AddIcon style={{width: '12vw', height: '12vh', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}/>
                    </ButtonBase>
                </Card>
            </Grid>
            <AreaDialog
            isAddOpen={isAddOpen}
            onClose={handleAddClose}
            />
        </Grid>
    )

}