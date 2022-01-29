import React, {useEffect, useRef, useState} from 'react';
import {Box, createTheme, Grid, ThemeProvider} from "@mui/material";
import AppBarArea from "./AppBarArea";
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import Profile from "../Profile/Profile";
import {theme_default, drawWith, dataTheme, DEFAULT_PAGE, GENERAL_DASHBOARD, GENERAL_PROFILE} from "./config";
import {UserContextProvider} from "../Tools/UserContext/UserContext";
import axios from "axios";
import MainLoader from "../Tools/MainLoader";
import DrawerArea from "./DrawerArea";
import ServiceSettings from '../Services/ServiceSettings';
import {SocketContextProvider} from "../Tools/SocketContext/SocketContext";
import Dashboard from "../Dashboard/Dashboard";
import WrongPageRouter from "../Tools/WrongPageRouter";

function SelectedRouter({setIdSelectedDrawerButton, app, idRoute}) {
    setIdSelectedDrawerButton(idRoute)
    return app
}

export default function Main() {
    const [theme, setTheme] = useState(createTheme(theme_default));
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [isFirstLoading, setIsFirstLoading] = useState(true);
    const isMounted = useRef(null);
    const [idSelectedDrawerButton, setIdSelectedDrawerButton] = useState(DEFAULT_PAGE);
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
                    let themeTarget = dataTheme.find(item => item.id === response.data.idTheme)
                    if (themeTarget)
                        setTheme(createTheme(themeTarget.color))
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
                    <DrawerArea isLoading={isLoading} idSelected={idSelectedDrawerButton}/>
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
                            <Route path={`Service/*`} element={<ServiceSettings/>}/>
                            <Route path={`Dashboard`} element={<SelectedRouter app={<Dashboard/>} idRoute={GENERAL_DASHBOARD} setIdSelectedDrawerButton={setIdSelectedDrawerButton} />}/>
                            <Route path={`Profile/*`} element={<SelectedRouter app={<Profile/>} idRoute={GENERAL_PROFILE} setIdSelectedDrawerButton={setIdSelectedDrawerButton} />}/>
                            <Route
                                path="*"
                                element={
                                    <main style={{padding: "1rem"}}>
                                        <WrongPageRouter redirect={'/App/'}/>
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