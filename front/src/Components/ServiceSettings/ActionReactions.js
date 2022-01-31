import { ButtonBase, Card, Grid, Switch, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import AreaDialog from "./AreaDialog";
import { useState } from "react";

export default function ActionsReactions() {
    const [isAddOpen, setIsAddOpen] = useState(false)
    const [areas, setAreas] = useState([])

    const handleAddClose = (value) => {
        if (Object.keys(value).length !== 0) {              // TODO pass by request
            let newArray = areas;
            newArray.push({
                actionId: value.actionId,
                reactionId: value.reactionId,
                color: '#26A2E1'
            });
            setAreas(newArray);
        }
        setIsAddOpen(false);
    }

    return (
        <Grid container item xs={12}>
            <Grid container item xs={12} style={{ padding: 20 }}>
                <Typography variant={'h5'} style={{fontWeight: 'bold'}}>
                    ACTIONS-REACTIONS
                </Typography>
            </Grid>
            <Grid container item xs={12} style={{ padding: 20 }}>
                {areas.map((item, index) => {
                    return (
                        <Card key={`${item.actionId}-${index}-cards-service`} style={{marginRight: 50, background: item.color, width: 150, height: 150, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
                            {item.actionId}
                            <Switch>
                            </Switch>
                        </Card>
                    )
                })}
                <Card style={{marginRight: 50, background: '#ffffff', width: 150, height: 150}}>
                    <ButtonBase style={{width: '100%', height: '100%', paddingTop: 8, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', position: 'relative'}}
                    onClick={() => setIsAddOpen(true)}>
                    <AddIcon style={{width: '12vw', height: '12vh', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}/>
                    </ButtonBase>
                </Card>
                <AreaDialog
                isAddOpen={isAddOpen}
                onClose={handleAddClose}
                />
            </Grid>
        </Grid>
    )

}