import { Alert, Button, Grid, Skeleton, Typography } from "@mui/material";
import AreaDialog from "./AreaDialog";
import React, { useContext, useState } from "react";
import TutorialContext from "../Tools/TutorialContext/TutorialContext";
import { Add } from "@mui/icons-material";
import AreaComponent from "../Tools/AreaComponent";

export default function ActionsReactions({isLoading, actions, reactions, canAddArea}) {
    const [isAddOpen, setIsAddOpen] = useState(false)
    const [areas, setAreas] = useState([])
    let tutorialMode = useContext(TutorialContext);

    const handleAddClose = (value) => {
        if (Object.keys(value).length !== 0) {              // TODO pass by request
            let newArray = areas;
            newArray.push({
                action: value.action,
                reaction: value.reaction,
                isActive: true,
            });
            setAreas(newArray);
        }
        setIsAddOpen(false);
    }

    const handleAreaActivation = (item) => {
        item.isActive = !item.isActive;
        setAreas([...areas]);
    }

    const handleAddOpen = async () => {
        setIsAddOpen(true);
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
                        {isLoading ? <Skeleton variant="rectangular" width={180} height={40} /> : <Button disabled={!canAddArea} variant={'outlined'} startIcon={<Add/>} onClick={() => handleAddOpen()}>
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
                    <AreaComponent
                    key={`${item.action.service}-${index}-cards-service`}
                    area={item}
                    onActivation={handleAreaActivation}
                    />
                )}
                <AreaDialog
                    isAddOpen={isAddOpen}
                    onClose={handleAddClose}
                    actions={actions}
                    reactions={reactions}
                />
            </Grid>
        </Grid>
    )

}