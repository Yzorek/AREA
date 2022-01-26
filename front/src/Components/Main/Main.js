import React, {useEffect, useRef, useState} from 'react';
import {Box, createTheme, Grid, ThemeProvider} from "@mui/material";
import AppBarArea from "./AppBarArea";
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import Profile from "../Profile/Profile";
import {theme_default, drawWith} from "./config";
import {UserContextProvider} from "../Tools/UserContext/UserContext";
import axios from "axios";
import MainLoader from "../Tools/MainLoader";
import DrawerArea from "./DrawerArea";
import {SocketContextProvider} from "../Tools/SocketContext/SocketContext";
import WrongPageRouter from "../Tools/WrongPageRouter";

export default function Main() {
    const theme = createTheme(theme_default);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [isFirstLoading, setIsFirstLoading] = useState(true);
    const isMounted = useRef(null);
    let navigate = useNavigate();

    useEffect(() => {
        if (!isFirstLoading)
            return;
        isMounted.current = true
        const source = axios.CancelToken.source();
        (async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(`${process.env.REACT_APP_DASHBOARD_API}/users/me`,
                    {
                        cancelToken: source.token,
                        'headers': {'Authorization': `Bearer  ${localStorage.getItem('JWT')}`}
                    });
                if (isMounted && isMounted.current) {
                    setUser(response.data);
                    setIsLoading(false);
                    setIsFirstLoading(false);
                }
            } catch (err) {
                if (err.response) {
                    alert('Error has occured please retry your connection.');
                    navigate('/Login');
                    setIsLoading(false);
                }
            }
        })()
        return () => {
            isMounted.current = false;
            source.cancel("Component Main GET user data got unmounted");
        }
    }, [navigate, isFirstLoading])

    return <ThemeProvider theme={theme}>
        <SocketContextProvider>
            <UserContextProvider user={user}>
                <Grid container item xs={12}>
                    <AppBarArea isLoading={isLoading}/>
                    <DrawerArea isLoading={isLoading}/>
                    <Box component="main"
                         sx={{bgcolor: 'grey.100'}} style={{
                        flexGrow: 1,
                        overflow: 'auto',
                        height: 'calc(100vh - 68px)',
                        width: `calc(100% - ${drawWith}px)`
                    }}>
                        {isLoading ? <Grid item container xs={12} style={{height: '100%'}} alignItems={'center'}
                                           justifyContent={'center'}>
                            <MainLoader/>
                        </Grid> : <Routes>
                            <Route path={`/`} element={<Navigate to={'Dashboard'}/>}/>
                            <Route path={`Dashboard`} element={<div>Dashboard</div>}/>
                            <Route path={`Profile/*`} element={<Profile/>}/>
                            <Route
                                path="*"
                                element={
                                    <main style={{padding: "1rem"}}>
                                        <WrongPageRouter/>
                                    </main>
                                }
                            />
                        </Routes>}
                    </Box>
                </Grid>
            </UserContextProvider>
        </SocketContextProvider>
    </ThemeProvider>
}