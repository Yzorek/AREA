import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TelegramIcon from '@mui/icons-material/Telegram';
import { ReactComponent as DiscordIcon } from '../../assets/discord.svg'
import { ReactComponent as TwitchIcon } from '../../assets/twitch.svg'
import SvgIcon from '@mui/icons-material/Twitter';
import { TWITTER, INSTAGRAM, DISCORD, TWITCH, YOUTUBE, TELEGRAM } from "../Main/config";

export function PropFromId(id) {
    switch (id) {
        case (1):
            return ({icon: <TwitterIcon/>, pageId: TWITTER, color: '#1C9CEB', name: 'Twitter'});
        case (2):
            return ({icon: <InstagramIcon/>, pageId: INSTAGRAM, color: '#CC0063', name: 'Spotify'});
        case (3):
            return ({icon: <SvgIcon component={DiscordIcon} inheritViewBox/>, pageId: DISCORD, color: '#5562EA', name: 'Discord'});
        case (4):
            return ({icon: <SvgIcon component={TwitchIcon} inheritViewBox/>, pageId: TWITCH, color: '#8C45F7', name: 'Twitch'});
        case (5):
            return ({icon: <YouTubeIcon/>, pageId: YOUTUBE, color: '#F70000', name: 'Youtube'});
        case (6):
            return ({icon: <TelegramIcon/>, pageId: TELEGRAM, color: '#26A2E1', name: 'Telegram'});
        default:
            return ({icon: <TwitterIcon/>, pageId: TWITTER, color: '#1C9CEB', name: 'Twitter'});
    }
}

export function iconFromName(name) {
    switch (name) {
        case ('Twitter'):
            return (<TwitterIcon sx={{fontSize: 50, color: 'white'}}/>);
        case ('Instagram'):
            return (<InstagramIcon sx={{fontSize: 50, color: 'white'}}/>);
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