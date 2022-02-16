import { Alert, ButtonBase, Card, Grid, Paper, Switch, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import AreaDialog from "./AreaDialog";
import { useContext, useState } from "react";
import TutorialContext from "../Tools/TutorialContext/TutorialContext";

export default function ActionsReactions() {
    const [isAddOpen, setIsAddOpen] = useState(false)
    const [areas, setAreas] = useState([])
    let tutorialMode = useContext(TutorialContext);

    const handleAddClose = (value) => {
        if (Object.keys(value).length !== 0) {              // TODO pass by request
            let newArray = areas;
            newArray.push({
                action: value.action,
                reaction: value.reaction,
                color: value.action.color,
                isActive: true
            });
            setAreas(newArray);
        }
        setIsAddOpen(false);
    }

    const handleAreActivation = (item, index) => {
        areas[index].isActive = !areas[index].isActive;
        setAreas([...areas]);
        console.log(areas);
    }

    return (
        <Grid container item xs={12} style={{ padding: 20 }} spacing={2}>
            <Grid container item xs={12}>
                <Typography variant={'h5'} style={{fontWeight: 'bold'}}>
                    ACTIONS-REACTIONS
                </Typography>
            </Grid>
            {tutorialMode.isActive && <Grid container item xs={12}>
                <Alert severity="info" style={{width: '100%'}}>Now link your actions and reactions available with your services.</Alert>
            </Grid>}
            <Grid container item xs={12} spacing={2}>
                {areas.map((item, index) =>
                    <Grid item xs={4} key={`${item.action.service}-${index}-cards-service`}>
                        <Paper style={{height: 140, background: item.isActive ? item.color : 'gray', cursor: 'pointer'}} sx={{
                                        transition: '0.5s',
                                        '&:hover': {boxShadow: 12}
                                    }} elevation={5} onClick={() => handleAreActivation(item, index)}>
                            <Grid container item xs={12} direction={'column'} alignItems={'center'} justifyContent={'center'} sx={{p: 2}} style={{height: '100%'}}>
                                {item.icon}
                                <Typography color={'white'} style={{fontWeight: 'bold'}}>
                                    {item.name}
                                </Typography>
                            </Grid>
                            <Grid container item xs={12} direction={'column'} alignItems={'center'} justifyContent={'center'} sx={{p: 2}} style={{height: '100%'}}>
                                {item.icon}
                                <Typography color={'white'} style={{fontWeight: 'bold'}}>
                                    {item.name}
                                </Typography>
                            </Grid>
                        </Paper>
                    </Grid>
                )}
                <Card style={{marginLeft: 20, marginTop: 15, background: '#ffffff', width: 150, height: 150}}>
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