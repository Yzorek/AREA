import { Card, Divider, Grid, Switch, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

export default function Services() {

    const services = [
        {
            name: 'Twitter',
            color: '#1C9CEB'
        },
        {
            name: 'Instagram',
            color: '#CC0063'
        },
        {
            name: 'Discord',
            color: '#5562EA'
        },
        {
            name: 'Twitch',
            color: '#8C45F7'
        },
        {
            name: 'Youtube',
            color: '#F70000'
        },
        {
            name: 'Telegram',
            color: '#26A2E1'
        }
    ]

    const areas = []

    return (
        <Grid>
            <Grid container item xs={12} style={{ padding: 20 }}>
                <Typography variant={'h5'} style={{fontWeight: 'bold'}}>
                    SERVICES
                </Typography>
            </Grid>
            <Grid container item xs={12} style={{ padding: 20 }}>
                {services.map((item, index) => {
                    return (
                        <Card style={{ padding: 15, marginRight: 50, background: item.color, width: 100, height: 100, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
                            {item.name}
                            <Switch>
                            </Switch>
                        </Card>
                    )
                })}
            </Grid>
            <Divider/>
            <Grid container item xs={12} style={{ padding: 20 }}>
                <Typography variant={'h5'} style={{fontWeight: 'bold'}}>
                    ACTIONS-REACTIONS
                </Typography>
            </Grid>
            <Grid container item xs={12} style={{ padding: 20 }}>
                {areas.map((item, index) => {
                    return (
                        <Card style={{ padding: 15, marginRight: 50, background: '#ffffff', width: 150, height: 150, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
                            {item.name}
                            <Switch>
                            </Switch>
                        </Card>
                    )
                })}
                <Card style={{ padding: 15, marginRight: 50, background: '#ffffff', width: 150, height: 150, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography>
                        Add an action-reaction
                    </Typography>
                    <AddIcon style={{width: '100%', height: '80%'}}/>
                </Card>
            </Grid>
        </Grid>
    )

}