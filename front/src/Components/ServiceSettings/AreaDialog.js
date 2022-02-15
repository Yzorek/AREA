import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, InputLabel, ListItemIcon, ListItemText, MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";
import { Actions, Reactions } from "./ActionsList";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { Cancel, Save } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";

export default function AreaDialog({isAddOpen, onClose}) {
    const [action, setAction] = useState('')
    const [reAction, setReAction] = useState('')
    const [isActionNeeded, setIsActionNeeded] = useState(false);
    const [isReActionNeeded, setIsReActionNeeded] = useState(false)
    const handleClose = () => {
        onClose({});                // TODO pass requests
    }

    const handleSave = () => {
        if (action === '') {
            setIsActionNeeded(true);
        }
        if (reAction === '') {
            setIsReActionNeeded(true);
            return;
        }
        onClose({
            action: action,
            reaction: reAction
        });
        setAction('');
        setReAction('');
        setIsActionNeeded(false);
        setIsReActionNeeded(false);
    }

    const handleActChange = (event) => {
        console.log(event.target.value);
        setAction(event.target.value);
    }

    const handleReActChange = (event) => {
        setReAction(event.target.value);
    }

    return (
        <Dialog onClose={handleClose} open={isAddOpen} fullWidth={true} maxWidth={'md'}>
            <DialogTitle>Choose action and reaction</DialogTitle>
            <DialogContent>
                <Grid container item xs={12} justifyContent={'center'} alignItems={'center'} direction={'column'}>
                    <Grid container item xs={12}>
                        <Alert severity="info" style={{width: '100%'}}>You can set a maximum of 30 action-reaction.</Alert>
                    </Grid>
                    <Grid container item xs={12} style={{marginTop: 7}} spacing={2} direction={'row'}>
                        <Grid item xs={5}>
                            <FormControl fullWidth error={isActionNeeded ? true : false}>
                                <InputLabel>Action</InputLabel>
                                <Select
                                value={action}
                                label="Action"
                                onChange={handleActChange}
                                renderValue={(value) => value.text}
                                style={{width: '100%'}}>
                                    {Actions.map((element, index) => {
                                        return (
                                            <MenuItem value={element} key={`${element.id}-${index}-menuitems-action`}>
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
                        <Grid container item xs={2} justifyContent={'center'} alignItems={'center'}>
                            <ArrowRightAltIcon sx={{fontSize: 50}}></ArrowRightAltIcon>
                        </Grid>
                        <Grid item xs={5}>
                            <FormControl fullWidth error={isReActionNeeded ? true : false}>
                                <InputLabel>Reaction</InputLabel>
                                <Select
                                value={reAction}
                                label="ReAction"
                                onChange={handleReActChange}
                                renderValue={(value) => value.text}
                                style={{width: '100%'}}>
                                    {Reactions.map((element, index) => {
                                        return (
                                            <MenuItem value={element} key={`${element.id}-${index}-menuitems-reaction`}>
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
                        <Grid container item xs={12}>
                            <Grid container item xs={6} justifyContent={'center'} alignItems={'center'}>
                                <TextField></TextField>
                            </Grid>
                            <Grid container item xs={6} justifyContent={'center'} alignItems={'center'}>
                                <TextField></TextField>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button startIcon={<Cancel/>} variant={'contained'} color={'secondary'} onClick={handleClose}>
                    CANCEL
                </Button>
                <LoadingButton loading={false} startIcon={<Save/>} variant={'contained'} color={'primary'} onClick={handleSave}> {/*TODO loading*/}
                    SAVE
                </LoadingButton>
            </DialogActions>
        </Dialog>
    )
}