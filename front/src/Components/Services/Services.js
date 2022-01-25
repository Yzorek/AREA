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
        let newArray = services;
        newArray[index].isActive = !(newArray[index].isActive);
        setServices(newArray);
    }

    return (
        <Grid container item xs={12}>
            <Grid container item xs={12} style={{ padding: 20 }}>
                <Typography variant={'h5'} style={{fontWeight: 'bold'}}>
                    SERVICES
                </Typography>
            </Grid>
            <Grid container item xs={12} style={{ padding: 20 }}>
                {services.map((item, index) => {
                    return (
                        <Card key={`${item.name}-${index}-card-service`} style={{ padding: 15, marginRight: 50, marginBottom: 20, background: item.color, width: 100, height: 100, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
                            {item.icon}
                            <Switch checked={services.isActive} onChange={() => {handleServiceActivation(index)}}/>
                        </Card>
                    )
                })}
            </Grid>
        </Grid>
    )

}