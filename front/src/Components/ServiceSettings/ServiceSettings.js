import { Divider, Grid } from "@mui/material";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import ActionsReactions from "./ActionReactions";
import Services from "./Services";
import PropFromId from '../Tools/Services';
import AlertError from "../Tools/AlertError";

export default function ServicesSettings({onServicesSub}) {
    const [actions, setActions] = useState([]);
    const [reactions, setReactions] = useState([]);
    const [myAreas, setMyAreas] = useState([]);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const isMounted = useRef(null);

    const handleServicesSub = async (services) => {
        await onServicesSub(services);
        const source = axios.CancelToken.source();
        await getActionsAndReactions(source);
    }

    const getMyAreas = async (currSource) => {
        await (async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(`${process.env.REACT_APP_DASHBOARD_API}/AR/link`,
                    {
                        cancelToken: currSource.token,
                        'headers': {'Authorization': `Bearer  ${localStorage.getItem('JWT')}`}
                    });
                if (isMounted && isMounted.current) {
                    let areasFetched = response.data;
                    // actionsFetched.forEach((element, index) => {
                    //     actionsFetched[index] = {
                    //         icon: PropFromId(element.id_service)['icon'],
                    //         color: PropFromId(element.id_service)['color'],
                    //         params: [{name: 'user @', value: ''}],      // TEMP mocked params
                    //         ...element
                    //     }
                    // })
                    //console.log(areasFetched);
                    //setMyAreas(areasFetched);
                    setIsLoading(false);
                }
            } catch (err) {
                if (err.response) {
                    setIsError(true);
                    setIsLoading(false);
                }
            }
        })()
    }

    const getActionsAndReactions = async (currSource) => {
        await (async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(`${process.env.REACT_APP_DASHBOARD_API}/AR/actions`,
                    {
                        cancelToken: currSource.token,
                        'headers': {'Authorization': `Bearer  ${localStorage.getItem('JWT')}`}
                    });
                if (isMounted && isMounted.current) {
                    let actionsFetched = response.data;
                    actionsFetched.forEach((element, index) => {
                        actionsFetched[index] = {
                            icon: PropFromId(element.id_service)['icon'],
                            color: PropFromId(element.id_service)['color'],
                            params: [{name: 'user @', value: ''}],      // TEMP mocked params
                            ...element
                        }
                    })
                    setActions(actionsFetched);
                    setIsLoading(false);
                }
            } catch (err) {
                if (err.response) {
                    setIsError(true);
                    setIsLoading(false);
                }
            }
        })()

        await (async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(`${process.env.REACT_APP_DASHBOARD_API}/AR/reactions`,
                    {
                        cancelToken: currSource.token,
                        'headers': {'Authorization': `Bearer  ${localStorage.getItem('JWT')}`}
                    });
                if (isMounted && isMounted.current) {
                    let reactionsFetched = response.data;
                    reactionsFetched.forEach((element, index) => {
                        reactionsFetched[index] = {
                            icon: PropFromId(element.id_service)['icon'],
                            color: PropFromId(element.id_service)['color'],
                            params: [{name: 'server name', value: ''}, {name: 'channel name', value: ''}],      // TEMP mocked params
                            ...element
                        }
                    })
                    setReactions(reactionsFetched);
                    setIsLoading(false);
                }
            } catch (err) {
                if (err.response) {
                    setIsError(true);
                    setIsLoading(false);
                }
            }
        })()
    }

    useEffect(async () => {
        isMounted.current = true
        const source = axios.CancelToken.source();
        await getActionsAndReactions(source);
        //getMyAreas(source);
        return () => {
            isMounted.current = false;
            source.cancel("Component Services GET user data got unmounted");
        }
    }, [])

    return (
        <Grid container item xs={12}>
            <Services onServiceSub={handleServicesSub}/>
            <Divider/>
            <ActionsReactions
            actions={actions}
            reactions={reactions}
            isLoading={isLoading}
            />
            <AlertError isError={isError} setIsError={setIsError}/>
        </Grid>
    )

}