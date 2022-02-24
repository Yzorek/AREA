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
        id_service: 1,
        description: 'A new tweet from specific user is posted',
        service: 'Twitter',
        color: '#1C9CEB',
        icon: <TwitterIcon/>,
        params: [{name: 'user @', value: ''}]
    },
    {
        id: 2,
        id_service: 2,
        description: 'Post a new video on instagram',
        service: 'Instagram',
        color: '#CC0063',
        icon: <InstagramIcon/>,
        params: []
    },
    {
        id: 3,
        id_service: 5,
        description: 'Like a video',
        service: 'Youtube',
        color: '#F70000',
        icon: <YouTubeIcon/>,
        params: []
    },
    {
        id: 4,
        id_service: 4,
        description: 'Start a stream on twitch',
        service: 'Twitch',
        color: '#8C45F7',
        icon: <SvgIcon component={TwitchIcon} inheritViewBox/>,
        params: []
    },
  ];

  export const Reactions = [
    {
        id: 5,
        id_service: 3,
        description: 'Message a specific user on discord',
        service: 'Discord',
        color: '#5562EA',
        icon: <SvgIcon component={DiscordIcon} inheritViewBox/>,
        params: [{name: 'server name', value: ''}, {name: 'channel name', value: ''}]
    },
    {
        id: 6,
        id_service: 6,
        description: 'Send message to group chat',
        service: 'Telegram',
        color: '#26A2E1',
        icon: <TelegramIcon/>,
        params: [{name: 'group name', value: ''}]
    }
  ];