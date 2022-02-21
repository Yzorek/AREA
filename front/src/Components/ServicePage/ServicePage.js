import { Add } from "@mui/icons-material";
import { Button, Divider, Grid, Skeleton, SvgIcon, Typography } from "@mui/material";
import { useState } from "react";
import { Actions, Reactions } from "../ServiceSettings/ActionsList";
import AreaDialog from "../ServiceSettings/AreaDialog";
import AreaComponent from "../Tools/AreaComponent";
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TelegramIcon from '@mui/icons-material/Telegram';
import { ReactComponent as DiscordIcon } from '../../assets/discord.svg'
import { ReactComponent as TwitchIcon } from '../../assets/twitch.svg'

export default function ServicePage({service, widgets}) {
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [areas, setAreas] = useState([])

    const handleAddClose = (value) => {
        if (Object.keys(value).length !== 0) {              // TODO pass by request
            let newArray = areas;
            newArray.push({
                action: value.action,
                reaction: value.reaction,
                isActive: true,
            });
            setAreas(newArray);
        }
        setIsAddOpen(false);
    }

    const handleAreaActivation = (item) => {                // TODO request
        item.isActive = !item.isActive;
        setAreas([...areas]);
    }

    const handleAddOpen = async () => {
        setIsAddOpen(true);
    }

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

    return (
        <Grid container item xs={12} spacing={2}>
            <Grid container item xs={12} style={{background: service.color, paddingTop: 30}} justifyContent={'center'} alignItems={'center'} direction={'column'}>
                {iconFromName(service.name)}
                <Typography variant={'h5'} style={{fontWeight: 'bold'}} style={{ padding: 20, color: 'white' }}>
                    { service.name }
                </Typography>
            </Grid>
            <Divider style={{width: '100%'}}/>
            <Grid container item xs={12} style={{ padding: 20 }} spacing={2}>
                <Grid container item xs={6}>
                    <Typography variant={'h5'} style={{padding: 10, fontWeight: 'bold'}}>
                        ACTIONS-REACTIONS
                    </Typography>
                </Grid>
                <Grid container item xs={6} alignItems={'center'} justifyContent={'flex-end'} spacing={2}>
                    <Grid item>
                        {isLoading ? <Skeleton variant="rectangular" width={150} height={50} /> : <Button variant={'outlined'} startIcon={<Add/>} onClick={() => handleAddOpen()}>
                            Add Action-Reaction
                        </Button>}
                    </Grid>
                </Grid>
                <Grid container item xs={12} style={{ padding: 40 }} spacing={2}>
                    {areas.map((item, index) =>
                        <AreaComponent
                        key={`${item.action.service}-${index}-cards-service`}
                        area={item}
                        onActivation={handleAreaActivation}
                        />
                    )}
                    <AreaDialog
                        isAddOpen={isAddOpen}
                        onClose={handleAddClose}
                        actions={Actions}                               // TEMP
                        reactions={Reactions}
                    />
                </Grid>
            </Grid>
        </Grid>
    )
}