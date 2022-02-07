import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TelegramIcon from '@mui/icons-material/Telegram';
import { ReactComponent as DiscordIcon } from '../../assets/discord.svg'
import { ReactComponent as TwitchIcon } from '../../assets/twitch.svg'
import SvgIcon from '@mui/icons-material/Twitter';
import { TWITTER, INSTAGRAM, DISCORD, TWITCH, YOUTUBE, TELEGRAM } from "../Main/config";

export default function PropFromName(name) {
    switch (name) {
        case ('Twitter'):
            return ({icon: <TwitterIcon/>, pageId: TWITTER});
        case ('Instagram'):
            return ({icon: <InstagramIcon/>, pageId: INSTAGRAM});
        case ('Telegram'):
            return ({icon: <TelegramIcon/>, pageId: TELEGRAM});
        case ('Twitch'):
            return ({icon: <SvgIcon component={TwitchIcon} inheritViewBox/>, pageId: TWITCH});
        case ('Discord'):
            return ({icon: <SvgIcon component={DiscordIcon} inheritViewBox/>, pageId: DISCORD});
        case ('Youtube'):
            return ({icon: <YouTubeIcon/>, pageId: YOUTUBE});
        default:
            return ({icon: <TwitterIcon/>, pageId: TWITTER});
    }
}