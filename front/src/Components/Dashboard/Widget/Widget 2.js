import React, {useState} from 'react';
import {Paper} from "@mui/material";
import WidgetAction from "./WidgetAction";
import widgetData from "./config";

export default function Widget({isEdit, handleRemoveItem, idWidget}) {
    const [openSettings, setOpenSettings] = useState(false);

    const handleOpenSettings = () => {
        setOpenSettings(true)
    }

    return <Paper style={{height: '100%', width: "100%"}}>
        {isEdit && <WidgetAction handleRemoveItem={handleRemoveItem} handleOpenSettings={handleOpenSettings} />}
        {widgetData.find(elem => elem.id === idWidget) && widgetData.find(elem => elem.id === idWidget).component(openSettings, setOpenSettings)}
    </Paper>
}