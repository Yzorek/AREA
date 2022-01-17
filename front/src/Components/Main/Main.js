import React from 'react';
import {Box, Grid} from "@mui/material";
import AppBarArea from "./AppBarArea";
import DrawerArea from "./DrawerArea";
import {Navigate, Route, Routes} from "react-router-dom";
import Profile from "../Profile/Profile";

export default function Main() {
    return <Grid container item xs={12}>
        <AppBarArea/>
        <DrawerArea/>
        <Box component="main" sx={{flexGrow: 1, overflow: 'auto', bgcolor: 'grey.100', height: 'calc(100vh - 68px)'}}>
            <Routes>
                <Route path={`/`} element={<Navigate to={'Dashboard'}/>}/>
                <Route path={`Dashboard`} element={<div>Dashboard</div>}/>
                <Route path={`Profile/*`} element={<Profile/>}/>
                <Route
                    path="*"
                    element={
                        <main style={{ padding: "1rem" }}>
                            <p>There's nothing here!</p>
                        </main>
                    }
                />
            </Routes>
        </Box>
    </Grid>
}