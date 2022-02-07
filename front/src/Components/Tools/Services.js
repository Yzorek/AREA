import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TelegramIcon from '@mui/icons-material/Telegram';
import { ReactComponent as DiscordIcon } from '../../assets/discord.svg'
import { ReactComponent as TwitchIcon } from '../../assets/twitch.svg'
import SvgIcon from '@mui/icons-material/Twitter';

export default function IconFromName(name) {
    switch (name) {
        case ('Twitter'):
            return (<TwitterIcon/>);
        case ('Instagram'):
            return (<InstagramIcon/>);
        case ('Telegram'):
            return (<TelegramIcon/>);
        case ('Twitch'):
            return (<SvgIcon component={TwitchIcon} inheritViewBox/>);
        case ('Discord'):
            return (<SvgIcon component={DiscordIcon} inheritViewBox/>);
        case ('Youtube'):
            return (<YouTubeIcon/>);
        default:
            return (<TwitterIcon/>);
    }
}