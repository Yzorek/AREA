import React, {useState} from 'react';
import {Grid, Paper, Typography, Skeleton} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import DialogConfirmationDelete from "./DialogConfirmationDelete";
import {useNavigate} from "react-router-dom";

function SkeletonDeleteAccount() {
    return <Paper elevation={1} sx={{p: 4}}>
        <Grid container item xs={12}>
            <Grid item xs={4}>
                <Typography style={{fontWeight: 'bold', fontSize: 20}}>
                    Delete Account
                </Typography>
            </Grid>
            <Grid container item xs={8} spacing={3}>
                <Grid item xs={12}>
                    <Skeleton variant={'text'} width={'100%'} height={30}/>
                </Grid>
                <Grid item xs={4}>
                    <Skeleton variant={'rectangular'} width={'100%'} height={50}/>
                </Grid>
            </Grid>
        </Grid>
    </Paper>

}

export default function DeleteAccount({isLoading}) {
    const [openDialogConfirmation, setOpenDialogConfirmation] = useState(false);
    let navigate = useNavigate()

    if (isLoading)
        return <SkeletonDeleteAccount/>

    const handleCloseDialogConfirmation = async (isToRedirect) => {
        if (isToRedirect)
            navigate('/login');
        setOpenDialogConfirmation(false);
    }

    return <Paper elevation={1} sx={{p: 4}}>
        <Grid container item xs={12}>
            <Grid item xs={4}>
                <Typography style={{fontWeight: 'bold', fontSize: 20}}>
                    Delete Account
                </Typography>
            </Grid>
            <Grid container item xs={8} spacing={3}>
                <Grid item xs={12}>
                    <Typography>
                        Delete your account and all of your source data. This is irreversible.
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <LoadingButton variant={'outlined'} color={'error'} fullWidth onClick={() => setOpenDialogConfirmation(true)}>
                        Delete account
                    </LoadingButton>
                </Grid>
            </Grid>
        </Grid>
        <DialogConfirmationDelete handleClose={handleCloseDialogConfirmation} open={openDialogConfirmation}/>
    </Paper>
}