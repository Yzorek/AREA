import React, {useState} from 'react';
import {Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField} from "@mui/material";
import {Cancel, Save} from "@mui/icons-material";
import {LoadingButton} from "@mui/lab";
import AutocompleteCountry from "../../Tools/Input/AutocompleteCountry";
import AutocompleteCities from "../../Tools/Input/AutocompleteCities";
import TemplateWeather from "../TemplateWeather";

export default function DialogNewSettingsWeather({open, handleClose}) {
    const [country, setCountry] = useState(null);
    const [cities, setCities] = useState(null);

    const handleCloseDialog = (isToReload) => {
        handleClose(isToReload);
        setCountry(null);
        setCities(null);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        handleCloseDialog(true);
    }

    return <Dialog fullWidth maxWidth={"md"} open={open} onClose={() => handleCloseDialog(false)} onSubmit={onSubmit} component={'form'}>
        <DialogTitle>New Weather Setting</DialogTitle>
        <DialogContent>
            <Grid container item xs={12}>
                <Alert severity="info" style={{width: '100%'}}>Please country and cities for registering your new settings weather for your widget.</Alert>
            </Grid>
            <Grid container item xs={12} style={{marginTop: 7}} justifyContent={'space-around'} alignItems={'center'}>
                <Grid container item xs={4} spacing={2}>
                    <Grid item xs={12}>
                        <AutocompleteCountry value={country} setValue={setCountry} isRequired={true}/>
                    </Grid>
                    <Grid item xs={12}>
                        <AutocompleteCities value={cities} setValue={setCities} isRequired={true} iso={!!country ? country.iso2 : null}/>
                    </Grid>
                </Grid>

                <Grid container item xs={5}>
                    <TemplateWeather city={cities} units={'metric'} countryCode={!!country ? country.iso2 : null}/>
                </Grid>
            </Grid>
        </DialogContent>
        <DialogActions>
            <Button startIcon={<Cancel/>} variant={'contained'} color={'secondary'} onClick={() => handleCloseDialog(false)}>
                CANCEL
            </Button>
            <LoadingButton startIcon={<Save/>} variant={'contained'} color={'primary'} type={'submit'}>
                SAVE
            </LoadingButton>
        </DialogActions>
    </Dialog>

}