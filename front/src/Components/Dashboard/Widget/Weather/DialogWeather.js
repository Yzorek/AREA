import React from 'react';
import {Dialog} from "@mui/material";

export default function DialogWeather({open, handleClose}) {

    const handleCloseDialog = (isToReload) => {
        handleClose(isToReload);
    }

    return <Dialog open={open} onClose={() => handleCloseDialog(false)}>
        Settings Widget Weather
    </Dialog>
}