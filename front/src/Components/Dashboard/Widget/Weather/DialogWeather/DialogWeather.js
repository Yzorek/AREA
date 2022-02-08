import React, {useEffect, useRef, useState} from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Fab,
    Grid,
    Tooltip,
    Typography
} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import {Add} from "@mui/icons-material";
import ListConfigWeather from "./ListConfigWeather";
import axios from "axios";
import AlertError from "../../../../Tools/AlertError";
import {useNavigate} from "react-router";

export default function DialogWeather({open, handleClose, idBDD}) {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [idSelected, setIdSelected] = useState(0);
    const [idOnBase, setIdOnBase] = useState(-1);
    const isMounted = useRef(null);
    let navigate = useNavigate();

    useEffect(() => {
        isMounted.current = true
        const source = axios.CancelToken.source();
        (async () => {
            try {
                setIsLoading(true)
                const response = await axios.get(`${process.env.REACT_APP_DASHBOARD_API}/dashboard/widget/weather/config/${idBDD}`,
                    {
                        cancelToken: source.token,
                        'headers': {'Authorization': `Bearer  ${localStorage.getItem('JWT')}`}
                    });
                if (isMounted && isMounted.current) {
                    setIdSelected(response.data.idWeatherConfig);
                    if (response.data.idWeatherConfig > 0) {
                        console.log(response.data.id)
                        setIdOnBase(response.data.id)
                    }
                    setIsLoading(false);
                }
            } catch (err) {
                if (err.response) {
                    setIsError(true);
                    setIsLoading(false);
                }
            }
        })()
        return () => {
            isMounted.current = false;
            source.cancel("Component DialogWeather got unmounted");
        }
    }, [idBDD]);

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            if (idOnBase >= 0)
                await axios.put(`${process.env.REACT_APP_DASHBOARD_API}/dashboard/widget/weather/config/${idOnBase}`, {idConfig: idSelected},
                    {
                        'headers': {'Authorization': `Bearer  ${localStorage.getItem('JWT')}`}
                    })
            else
                await axios.post(`${process.env.REACT_APP_DASHBOARD_API}/dashboard/widget/weather/config`, {idConfig: idSelected, idWidget: idBDD},
                    {
                        'headers': {'Authorization': `Bearer  ${localStorage.getItem('JWT')}`}
                    })
            setIsLoading(false);
            handleCloseDialog(true)
        } catch (err) {
            if (err.response) {
                setIsError(true);
                setIsLoading(false);
            }
        }
    }

    const handleCloseDialog = (isToReload) => {
        handleClose(isToReload);
        setIdOnBase(-1)
    }

    return <Dialog component={'form'} open={open} onClose={() => handleCloseDialog(false)} fullWidth maxWidth={'sm'} onSubmit={onSubmit}>
        <DialogTitle>
            Settings Widget Weather
        </DialogTitle>
        <DialogContent>
            <Grid container item xs={12} alignItems={'center'}
                  sx={{border: 1, borderColor: 'divider', p: 1, bgcolor: 'grey.100'}}>
                <Grid item xs={6}>
                    <Typography variant={'h6'}>
                        Weather Settings
                    </Typography>
                </Grid>
                <Grid container item xs={6} justifyContent={'flex-end'}>
                    <Tooltip title={'Add new weather config'}>
                        <Fab size={'small'} color={'primary'} onClick={() => navigate('/App/Weather')}>
                            <Add/>
                        </Fab>
                    </Tooltip>
                </Grid>
            </Grid>
            <Grid container item xs={12} sx={{border: 1, borderColor: 'divider'}}>
                <ListConfigWeather idSelected={idSelected} setIdSelected={setIdSelected} isLoadingParent={isLoading}/>
            </Grid>
        </DialogContent>
        <DialogActions>
            <Button variant={'contained'} color={'secondary'} onClick={() => handleCloseDialog(false)}>
                Cancel
            </Button>
            <LoadingButton loading={isLoading} variant={'contained'} color={'primary'} disabled={idSelected <= 0} type={'submit'}>
                Save
            </LoadingButton>
        </DialogActions>
        <AlertError isError={isError} setIsError={setIsError}/>
    </Dialog>
}