import { Grid, Collapse, Icon, IconButton, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TelegramIcon from '@mui/icons-material/Telegram';
import { ReactComponent as DiscordIcon } from '../../assets/discord.svg';
import { ReactComponent as TwitchIcon } from '../../assets/twitch.svg';
import SvgIcon from '@mui/icons-material/Twitter';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import PropFromId from '../Tools/Services';

export default function AreaComponent({area, onActivation}) {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleAreaActivation = (item) => {
        onActivation(item);
    }

    const isMoreToDisplay = () => {
        let actionNbChar = 0;
        let reactionNbChar = 0;

        area.action.params.forEach((param) => {
            actionNbChar += param.name.length + param.value.length;
        });
        area.reaction.params.forEach((param) => {
            reactionNbChar += param.name.length + param.value.length;
        });

        return (actionNbChar < reactionNbChar);
    }

    const iconFromName = (name) => {
        switch (name) {
            case ('Twitter'):
                return (<TwitterIcon sx={{ fontSize: 40, color: 'white' }}/>);
            case ('Instagram'):
                return (<InstagramIcon sx={{ fontSize: 40, color: 'white' }}/>);
            case ('Telegram'):
                return (<TelegramIcon sx={{ fontSize: 40, color: 'white' }}/>);
            case ('Twitch'):
                return (<SvgIcon component={TwitchIcon} sx={{ fontSize: 40, color: 'white' }} inheritViewBox/>);
            case ('Discord'):
                return (<SvgIcon component={DiscordIcon} sx={{ fontSize: 40, color: 'white' }} inheritViewBox/>);
            case ('Youtube'):
                return (<YouTubeIcon sx={{ fontSize: 40, color: 'white' }}/>);
            default:
                return (<TwitterIcon sx={{ fontSize: 40, color: 'white' }}/>);
        }
    }

    return (
        <Grid item xs={4}>
            <Paper style={{cursor: 'pointer', background: area.isActive ?
                (isMoreToDisplay() ? area.action.color : area.reaction.color) : 'gray',
                position: 'relative'}}
                    sx={{ transition: '0.5s',
                        '&:hover': {boxShadow: 12},
                        }} elevation={5} onClick={() => handleAreaActivation(area)}>
                <Grid container item xs={12} style={{height: '200px'}}>
                    <Grid container item xs={6} alignItems={'center'} justifyContent={'center'} sx={{p: 2}}
                    style={{height: '100%', background: area.isActive ? area.action.color : 'gray', transition: '0.5s'}}>
                        <Icon sx={{color: 'white', minHeight: '50px', width: '100%'}}>
                            {iconFromName(PropFromId(area.action.id_service)['name'])}
                        </Icon>
                        <Typography color={'white'} style={{fontWeight: 'bold'}} align={'center'}>
                            {area.action.description}
                        </Typography>
                    </Grid>
                    <Grid container item xs={6} direction={'column'} alignItems={'center'} justifyContent={'center'} sx={{p: 2}}
                    style={{height: '100%', background: area.isActive ? area.reaction.color : 'gray', transition: '0.5s'}}>
                        <Icon sx={{color: 'white', minHeight: '50px', width: '100%'}}>
                            {iconFromName(PropFromId(area.reaction.id_service)['name'])}
                        </Icon>
                        <Typography color={'white'} style={{fontWeight: 'bold', paddingTop: '20px'}} align={'center'}>
                            {area.reaction.description}
                        </Typography>
                    </Grid>
                    <IconButton style={{position: 'absolute', left: '50%', top: '100%', transform: 'translate(-50%, -50%)', background: 'rgba(114, 114, 114, 0.8)'}}
                        onClick={(event) => {
                            event.stopPropagation();
                            setIsExpanded(!isExpanded);
                        }}>
                        {isExpanded ? <ExpandLessIcon sx={{color: 'white'}}/> : <ExpandMoreIcon sx={{color: 'white'}}/>}
                    </IconButton>
                </Grid>
                <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                    <Grid container item xs={12}>
                        <Grid container item xs={6} justifyContent={'center'} alignItems={'center'} direction={'column'}
                        style={{height: '100%', background: area.isActive ? area.action.color : 'gray', transition: '0.5s'}}>
                            {area.action.params.map((area, index) => {
                                return (
                                    <Typography align={'center'} style={{color: 'white'}} key={`${area.name}-${index}-action-params`}>
                                        {area.name + ' : ' + area.value}
                                    </Typography>
                                )
                            })}
                        </Grid>
                        <Grid container item xs={6} justifyContent={'center'} alignItems={'center'} direction={'column'}
                        style={{height: '100%', background: area.isActive ? area.reaction.color : 'gray', transition: '0.5s'}}>
                            {area.reaction.params.map((area, index) => {
                                return (
                                    <Typography align={'center'} style={{color: 'white'}} key={`${area.name}-${index}-reaction-params`}>
                                        {area.name + ' : ' + area.value}
                                    </Typography>
                                )
                            })}
                        </Grid>
                    </Grid>
                </Collapse>
            </Paper>
        </Grid>
    )
}