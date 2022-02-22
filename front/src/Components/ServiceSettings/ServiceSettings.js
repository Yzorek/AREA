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
    const [canAddArea, setCanAddArea] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const isMounted = useRef(null);

    const rawData = {
        actions: actions,
        reactions: reactions
    }

    const onDialogClose = () => {
        getMyAreas(
            {
                'headers': {'Authorization': `Bearer  ${localStorage.getItem('JWT')}`}
            }
        );
    }

    const handleServicesSub = async (services) => {
        await onServicesSub(services);
        services.filter((e) => e.isActive === true).length !== 0 ? setCanAddArea(true) : setCanAddArea(false);
        const source = axios.CancelToken.source();
        await getActionsAndReactions(source);
    }

    const checkIfCanAdd = async (nbService) => {
        nbService !== 0 ? setCanAddArea(true) : setCanAddArea(false);
    }

    const getMyAreas = async (header) => {
        await (async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(`${process.env.REACT_APP_DASHBOARD_API}/AR/link`, header);
                if (isMounted && isMounted.current) {
                    let areasFetched = response.data;
                    areasFetched.forEach((element, index) => {
                        areasFetched[index] = {
                            action: rawData.actions.find((e) => e.id === element.idActions),
                            reaction: rawData.reactions.find((e) => e.id === element.idReactions),
                            isActive: true,             // TEMP
                            ...element
                        }
                        areasFetched[index].action.params = areasFetched[index].paramsAction;
                        areasFetched[index].reaction.params = areasFetched[index].paramsReaction;
                    })
                    console.log(areasFetched);
                    setMyAreas(areasFetched);
                    setIsLoading(false);
                }
            } catch (err) {
                console.log(err);
                console.log('test')
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
                        let params = [];
                        if (element.params) {
                            element?.params.forEach((param) => {
                                params.push({name: param, value: ''});
                            });
                        }
                        actionsFetched[index] = {
                            icon: PropFromId(element.id_service)['icon'],
                            color: PropFromId(element.id_service)['color'],
                            ...element,
                            params: params
                        }
                    })
                    rawData.actions = actionsFetched;
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
                        let params = [];
                        if (element.params) {
                            element.params.forEach((param) => {
                                params.push({name: param, value: ''});
                            });
                        }
                        reactionsFetched[index] = {
                            icon: PropFromId(element.id_service)['icon'],
                            color: PropFromId(element.id_service)['color'],
                            ...element,
                            params: params
                        }
                    })
                    rawData.reactions = reactionsFetched;
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
        await getMyAreas(
            {
                cancelToken: source.token,
                'headers': {'Authorization': `Bearer  ${localStorage.getItem('JWT')}`}
            }
        );
        return () => {
            isMounted.current = false;
            source.cancel("Component Services GET user data got unmounted");
        }
    }, [])

    return (
        <Grid container item xs={12}>
            <Services onServiceSub={handleServicesSub} onGetService={checkIfCanAdd}/>
            <Divider/>
            <ActionsReactions
            actions={actions}
            reactions={reactions}
            areas={myAreas}
            isLoading={isLoading}
            canAddArea={canAddArea}
            onDialogClose={onDialogClose}
            />
            <AlertError isError={isError} setIsError={setIsError}/>
        </Grid>
    )

}