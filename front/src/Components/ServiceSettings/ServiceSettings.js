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
import ActionsReactions from "./ActionReactions";
import Services from "./Services";

export default function ServicesSettings() {

    return (
        <Grid container item xs={12}>
            <Services/>
            <Divider/>
            <ActionsReactions/>
        </Grid>
    )

}