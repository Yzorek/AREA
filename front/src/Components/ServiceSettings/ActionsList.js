import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TelegramIcon from '@mui/icons-material/Telegram';
import { ReactComponent as DiscordIcon } from '../../assets/discord.svg'
import { ReactComponent as TwitchIcon } from '../../assets/twitch.svg'
import SvgIcon from '@mui/icons-material/Twitter';

export const Actions = [
    {
        id: 1,
        text: 'A new tweet from specific user is posted',
        service: 'twitter',
        color: '#1C9CEB',
        icon: <TwitterIcon sx={{ fontSize: '12' }}/>
    },
    {
        id: 2,
        text: 'Post a new video on instagram',
        service: 'instagram',
        color: '#CC0063',
        icon: <InstagramIcon sx={{ fontSize: '12' }}/>
    },
    {
        id: 3,
        text: 'Like a video',
        service: 'youtube',
        color: '#F70000',
        icon: <YouTubeIcon sx={{ fontSize: '12' }}/>
    },
    {
        id: 4,
        text: 'Start a stream on twitch',
        service: 'twitch',
        color: '#8C45F7',
        icon: <SvgIcon component={TwitchIcon} sx={{ fontSize: '12' }} inheritViewBox/>
    },
  ];

  export const Reactions = [
    {
        id: 5,
        text: 'Message a specific user on discord',
        service: 'discord',
        color: '#5562EA',
        icon: <SvgIcon component={DiscordIcon} sx={{ fontSize: '12' }} inheritViewBox/>
    },
    {
        id: 6,
        text: 'Send message to group chat',
        service: 'telegram',
        color: '#26A2E1',
        icon: <TelegramIcon sx={{ fontSize: '12' }}/>
    }
  ];