import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, Grid, InputLabel, ListItemIcon, ListItemText, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import { Actions, Reactions } from "./ActionsList";

export default function AreaDialog({isAddOpen, onClose}) {
    const [action, setAction] = useState('')
    const [reAction, setReAction] = useState('')
    const [isActionNeeded, setIsActionNeeded] = useState(false);
    const [isReActionNeeded, setIsReActionNeeded] = useState(false)
    const handleClose = () => {
        onClose({});
    }

    const handleSave = () => {
        if (action === '') {
            setIsActionNeeded(true);
            return;
        }
        if (reAction === '') {
            setIsReActionNeeded(true);
            return;
        }
        onClose({
            actionId: action,
            reactionId: reAction
        });
        setAction('');
        setReAction('');
    }

    const handleActChange = (event) => {
        setAction(event.target.value);
    }

    const handleReActChange = (event) => {
        setReAction(event.target.value);
    }

    return (
        <Dialog onClose={handleClose} open={isAddOpen} fullWidth={true} maxWidth={'sm'}>
            <Grid container item xs={12} justifyContent={'center'} alignItems={'center'} direction={'column'}>
                <DialogTitle>Choose action and reaction</DialogTitle>
                <DialogContent>
                    <Grid container item xs={12} justifyContent={'center'} alignItems={'center'} direction={'column'}>
                        <DialogContentText style={{paddingBottom: 10}}>
                            You can set a maximum of 30 action-reaction.
                        </DialogContentText>
                        <FormControl fullWidth color={isActionNeeded ? 'error' : 'primary'}>
                            <InputLabel>Action</InputLabel>
                            <Select
                            value={action}
                            label="Action"
                            onChange={handleActChange}
                            style={{width: '100%'}}>
                                {Actions.map((element) => {
                                    return (
                                        <MenuItem value={element.id}>
                                            <ListItemIcon>
                                                {element.icon}
                                            </ListItemIcon>
                                            <ListItemText>{element.text}</ListItemText>
                                        </MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>
                        <Divider orientation="vertical" style={{height: 128, marginTop: 20, marginBottom: 20, borderRightWidth: 2}}/>
                        <FormControl fullWidth color={isReActionNeeded ? 'error' : 'primary'}>
                            <InputLabel>Reaction</InputLabel>
                            <Select
                            value={reAction}
                            label="ReAction"
                            onChange={handleReActChange}
                            style={{width: '100%'}}>
                                {Reactions.map((element) => {
                                    return (
                                        <MenuItem value={element.id}>
                                            <ListItemIcon>
                                                {element.icon}
                                            </ListItemIcon>
                                            <ListItemText>{element.text}</ListItemText>
                                        </MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>
                    </Grid>
                </DialogContent>
            </Grid>
            <DialogActions>
                <Grid container item xs={12} justifyContent={'space-between'}>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </Grid>
            </DialogActions>
        </Dialog>
    )
}