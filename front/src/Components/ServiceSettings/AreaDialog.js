import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, InputLabel, ListItemIcon, ListItemText, MenuItem, Select, Snackbar, TextField } from "@mui/material";
import { useContext, useState } from "react";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { Cancel, Save } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import TutorialContext from "../Tools/TutorialContext/TutorialContext";

export default function AreaDialog({isAddOpen, onClose, isLoading, actions, reactions}) {
    const [action, setAction] = useState('')
    const [reAction, setReAction] = useState('')
    const [isActionNeeded, setIsActionNeeded] = useState(false);
    const [isReActionNeeded, setIsReActionNeeded] = useState(false);
    const [isParamError, setIsParamError] = useState(false);
    let tutorialMode = useContext(TutorialContext);
    const handleClose = () => {
        onClose({});                // TODO pass requests
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
        if (action.params.some((item) => (item.value === '')) === true) {
            setIsParamError(true);
            return;
        }
        if (reAction.params.some((item) => (item.value === '')) === true) {
            setIsParamError(true);
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
        setAction(event.target.value);
    }

    const handleReActChange = (event) => {
        setReAction(event.target.value);
    }

    const setActionParams = (value, index) => {
        let newAct = action;
        newAct.params[index]['value'] = value;
        setAction(newAct);
    }

    const setReActionParams = (value, index) => {
        let newReAct = reAction;
        newReAct.params[index]['value'] = value;
        setReAction(newReAct);
    }

    return (
        <Dialog onClose={handleClose} open={isAddOpen} fullWidth={true} maxWidth={'md'}>
            <DialogTitle>Choose action and reaction</DialogTitle>
            <DialogContent>
                <Grid container item xs={12} justifyContent={'center'} alignItems={'center'} direction={'column'}>
                    {tutorialMode.isActive && <Grid container item xs={12}>
                        <Alert severity="info" style={{width: '100%'}}>You can set a maximum of 30 action-reaction.</Alert>
                    </Grid>}
                    <Grid container item xs={12} style={{marginTop: 7}} spacing={2} direction={'row'}>
                        <Grid item xs={5}>
                            <FormControl fullWidth error={isActionNeeded ? true : false}>
                                <InputLabel>Action</InputLabel>
                                <Select
                                value={action}
                                label="Action"
                                onChange={handleActChange}
                                renderValue={(value) => value.description}
                                style={{width: '100%'}}>
                                    {actions.map((element, index) => {
                                        return (
                                            <MenuItem value={element} key={`${element.id}-${index}-menuitems-action`}>
                                                <ListItemIcon>
                                                    {element.icon}
                                                </ListItemIcon>
                                                <ListItemText>{element.description}</ListItemText>
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
                                renderValue={(value) => value.description}
                                style={{width: '100%'}}>
                                    {reactions.map((element, index) => {
                                        return (
                                            <MenuItem value={element} key={`${element.id}-${index}-menuitems-reaction`}>
                                                <ListItemIcon>
                                                    {element.icon}
                                                </ListItemIcon>
                                                <ListItemText>{element.description}</ListItemText>
                                            </MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid container item xs={12}>
                            <Grid container item xs={6} justifyContent={'center'} alignItems={'center'} direction={'column'}>
                                {action && action.params.map((element, index) => {
                                    return (
                                        <Grid container item xs={12} key={`${index}-action-params`} style={{'paddingTop': 20}}>
                                            <TextField required variant={'outlined'} label={element.name}
                                            onChange={(e) => setActionParams(e.target.value, index)}
                                            ></TextField>
                                        </Grid>
                                    )
                                })}
                            </Grid>
                            <Grid container item xs={6} justifyContent={'flex-end'} alignItems={'center'} style={{'paddingLeft': 80}}>
                                {reAction && reAction.params.map((element, index) => {
                                    return (
                                        <Grid container item xs={12} key={`${index}-reaction-params`} style={{'paddingTop': 20}}>
                                            <TextField required variant={'outlined'} label={element.name}
                                            onChange={(e) => setReActionParams(e.target.value, index)}
                                            ></TextField>
                                        </Grid>
                                    )
                                })}
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
            <Snackbar open={isParamError} autoHideDuration={6000} onClose={() => setIsParamError(false)}
                      anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}>
                <Alert onClose={() => setIsParamError(false)} severity="warning" sx={{width: '100%'}}>
                    Please set the params
                </Alert>
            </Snackbar>
        </Dialog>
    )
}