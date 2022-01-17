import React, {useState} from 'react';
import {Grid, Tab, Tabs, Typography} from "@mui/material";
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";

export default function Profile() {
    const [tabs, setTabs] = useState("Me");
    let navigate = useNavigate();

    const handleChange = (event, newValue) => {
        setTabs(newValue);
        navigate(newValue);
    };

    return <Grid container item xs={12} style={{ padding: 10 }} justifyContent={'center'}>
        <Grid container item xs={7} style={{padding: 5}}>
            <Typography variant={'h5'} style={{fontWeight: 'bold'}}>
                PROFILE
            </Typography>
        </Grid>
        <Grid container item xs={7}>
            <Tabs value={tabs} onChange={handleChange}>
                <Tab label="Me" value={"Me"}/>
                <Tab label="Settings" value={"Settings"}/>
                <Tab label="Theme" value={"Theme"}/>
            </Tabs>
        </Grid>

        <Routes>
            <Route path={`/`} element={<Navigate to={'Me'}/>}/>
            <Route path={`Me`} element={<Grid container item xs={7}>Me</Grid>}/>
            <Route path={`Settings`} element={<Grid container item xs={7}>Settings</Grid>}/>
            <Route path={`Theme`} element={<Grid container item xs={7}>Theme</Grid>}/>
        </Routes>

    </Grid>

}