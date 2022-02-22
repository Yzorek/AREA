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
            },
            true
        );
    }

    const deleteAR = async (arId) => {
        try {
            setIsLoading(true);
            await axios.delete(`${process.env.REACT_APP_DASHBOARD_API}/AR/link/${arId}`,
            {
                'headers': {'Authorization': `Bearer  ${localStorage.getItem('JWT')}`}
            });
            setIsLoading(false);
        } catch (err) {
            if (err.response) {
                setIsError(true);
                setIsLoading(false);
            }
        }
    }

    const handleServicesSub = async (services, serviceToDel) => {
        if (serviceToDel !== undefined) {
            await myAreas.forEach(async (area) => {
                if (area.action.id_service === serviceToDel.id || area.reaction.id_service === serviceToDel.id) {
                    console.log(area);
                    await deleteAR(area.id);
                }
            });
        }
        await onServicesSub(services);
        services.filter((e) => e.isActive === true).length !== 0 ? setCanAddArea(true) : setCanAddArea(false);
        await getMyAreas(
            {
                'headers': {'Authorization': `Bearer  ${localStorage.getItem('JWT')}`}
            },
            false
        );
        await getActionsAndReactions(
            {
                'headers': {'Authorization': `Bearer  ${localStorage.getItem('JWT')}`}
            },
            true
        );
    }

    const checkIfCanAdd = async (nbService) => {
        nbService !== 0 ? setCanAddArea(true) : setCanAddArea(false);
    }

    const checkIfAR = (service) => {
        let value = myAreas.some((e) => e.action.id_service === service.id || e.reaction.id_service === service.id);
        return (value);
    }

    const getMyAreas = async (header, isLoadingOver) => {
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
                    setMyAreas(areasFetched);
                    setIsLoading(!isLoadingOver);
                }
            } catch (err) {
                if (err.response) {
                    setIsError(true);
                    setIsLoading(!isLoadingOver);
                }
            }
        })()
    }

    const getActionsAndReactions = async (header, isLoadingOver) => {
        await (async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(`${process.env.REACT_APP_DASHBOARD_API}/AR/actions`, header);
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
                    setIsLoading(!isLoadingOver);
                }
            } catch (err) {
                if (err.response) {
                    setIsError(true);
                    setIsLoading(!isLoadingOver);
                }
            }
        })()

        await (async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(`${process.env.REACT_APP_DASHBOARD_API}/AR/reactions`, header);
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
        await getActionsAndReactions(
            {
                cancelToken: source.token,
                'headers': {'Authorization': `Bearer  ${localStorage.getItem('JWT')}`}
            }, false
        );
        await getMyAreas(
            {
                cancelToken: source.token,
                'headers': {'Authorization': `Bearer  ${localStorage.getItem('JWT')}`}
            }, true
        );
        return () => {
            isMounted.current = false;
            source.cancel("Component Services GET user data got unmounted");
        }
    }, [])

    return (
        <Grid container item xs={12}>
            <Services onServiceSub={handleServicesSub} onGetService={checkIfCanAdd} checkIfAR={checkIfAR}/>
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