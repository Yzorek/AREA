import { Alert, Button, Collapse, Grid, Icon, IconButton, Paper, Skeleton, Typography } from "@mui/material";
import AreaDialog from "./AreaDialog";
import React, { useContext, useState } from "react";
import TutorialContext from "../Tools/TutorialContext/TutorialContext";
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TelegramIcon from '@mui/icons-material/Telegram';
import { ReactComponent as DiscordIcon } from '../../assets/discord.svg';
import { ReactComponent as TwitchIcon } from '../../assets/twitch.svg';
import SvgIcon from '@mui/icons-material/Twitter';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { Add } from "@mui/icons-material";

export default function ActionsReactions() {
    const [isAddOpen, setIsAddOpen] = useState(false)
    const [areas, setAreas] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    let tutorialMode = useContext(TutorialContext);

    const handleAddClose = (value) => {
        if (Object.keys(value).length !== 0) {              // TODO pass by request
            let newArray = areas;
            newArray.push({
                action: value.action,
                reaction: value.reaction,
                color: value.action.color,
                isActive: true,
                isExpanded: false
            });
            setAreas(newArray);
        }
        setIsAddOpen(false);
    }

    const handleAreActivation = (item, index) => {
        areas[index].isActive = !areas[index].isActive;
        setAreas([...areas]);
    }

    const isMoreToDisplay = (index) => {
        let actionNbChar = 0;
        let reactionNbChar = 0;

        areas[index].action.params.forEach((param) => {
            actionNbChar += param.name.length + param.value.length;
        });
        areas[index].reaction.params.forEach((param) => {
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
        <Grid container item xs={12} style={{ padding: 20 }} spacing={2}>
            <Grid container item xs={12}>
                <Grid item xs={6}>
                    <Typography variant={'h5'} style={{fontWeight: 'bold'}}>
                        ACTIONS-REACTIONS
                    </Typography>
                </Grid>
                <Grid container item xs={6} alignItems={'center'} justifyContent={'flex-end'} spacing={2}>
                    <Grid item>
                        {isLoading ? <Skeleton variant="rectangular" width={150} height={50} /> : <Button variant={'outlined'} startIcon={<Add/>} onClick={() => setIsAddOpen(true)}>
                            Add Action-Reaction
                        </Button>}
                    </Grid>
                </Grid>
            </Grid>
            {tutorialMode.isActive && <Grid container item xs={12}>
                <Alert severity="info" style={{width: '100%'}}>Now link your actions and reactions available with your services.</Alert>
            </Grid>}
            <Grid container item xs={12} spacing={2}>
                {areas.map((item, index) =>
                    <Grid item xs={4} key={`${item.action.service}-${index}-cards-service`}>
                        <Paper style={{cursor: 'pointer', background: item.isActive ?
                            (isMoreToDisplay(index) ? item.action.color : item.reaction.color) : 'gray',
                            position: 'relative'}}
                                sx={{ transition: '0.5s',
                                    '&:hover': {boxShadow: 12},
                                    }} elevation={5} onClick={() => handleAreActivation(item, index)}>
                            <Grid container item xs={12} style={{height: '200px'}}>
                                <Grid container item xs={6} alignItems={'center'} justifyContent={'center'} sx={{p: 2}}
                                style={{height: '100%', background: item.isActive ? item.action.color : 'gray', transition: '0.5s'}}>
                                    <Icon sx={{color: 'white', minHeight: '50px', width: '100%'}}>
                                        {iconFromName(item.action.service)}
                                    </Icon>
                                    <Typography color={'white'} style={{fontWeight: 'bold'}} align={'center'}>
                                        {item.action.text}
                                    </Typography>
                                </Grid>
                                <Grid container item xs={6} direction={'column'} alignItems={'center'} justifyContent={'center'} sx={{p: 2}}
                                style={{height: '100%', background: item.isActive ? item.reaction.color : 'gray', transition: '0.5s'}}>
                                    <Icon sx={{color: 'white', minHeight: '50px', width: '100%'}}>
                                    {iconFromName(item.reaction.service)}
                                    </Icon>
                                    <Typography color={'white'} style={{fontWeight: 'bold', paddingTop: '20px'}} align={'center'}>
                                        {item.reaction.text}
                                    </Typography>
                                </Grid>
                                <IconButton style={{position: 'absolute', left: '50%', top: '100%', transform: 'translate(-50%, -50%)', background: 'rgba(114, 114, 114, 0.8)'}}
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        areas[index].isExpanded = !areas[index].isExpanded;
                                        setAreas([...areas]);
                                    }}>
                                    {item.isExpanded ? <ExpandLessIcon sx={{color: 'white'}}/> : <ExpandMoreIcon sx={{color: 'white'}}/>}
                                </IconButton>
                            </Grid>
                            <Collapse in={item.isExpanded} timeout="auto" unmountOnExit>
                                <Grid container item xs={12}>
                                    <Grid container item xs={6} justifyContent={'center'} alignItems={'center'} direction={'column'}
                                    style={{height: '100%', background: item.isActive ? item.action.color : 'gray', transition: '0.5s'}}>
                                        {item.action.params.map((item, index) => {
                                            return (
                                                <Typography align={'center'} style={{color: 'white'}} key={`${item.name}-${index}-action-params`}>
                                                    {item.name + ' : ' + item.value}
                                                </Typography>
                                            )
                                        })}
                                    </Grid>
                                    <Grid container item xs={6} justifyContent={'center'} alignItems={'center'} direction={'column'}
                                    style={{height: '100%', background: item.isActive ? item.reaction.color : 'gray', transition: '0.5s'}}>
                                        {item.reaction.params.map((item, index) => {
                                            return (
                                                <Typography align={'center'} style={{color: 'white'}} key={`${item.name}-${index}-reaction-params`}>
                                                    {item.name + ' : ' + item.value}
                                                </Typography>
                                            )
                                        })}
                                    </Grid>
                                </Grid>
                            </Collapse>
                        </Paper>
                    </Grid>
                )}
                <AreaDialog
                    isAddOpen={isAddOpen}
                    onClose={handleAddClose}
                />
            </Grid>
        </Grid>
    )

}