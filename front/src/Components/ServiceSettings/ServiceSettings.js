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

    const onDialogClose = async () => {
        await getActionsAndReactions(true);
    }

    const deleteAR = async (arId, isLoadingOver) => {
        try {
            setIsLoading(true);
            await axios.delete(`${process.env.REACT_APP_DASHBOARD_API}/AR/link/${arId}`,
            {
                'headers': {'Authorization': `Bearer  ${localStorage.getItem('JWT')}`}
            });
            setIsLoading(!isLoadingOver);
        } catch (err) {
            if (err.response) {
                setIsError(true);
                setIsLoading(!isLoadingOver);
            }
        }
    }

    const handleAreaSub = async (area) => {
        try {
            let body = {
                idAction: area.action.id,
                idReaction: area.reaction.id,
                paramsAction: area.action.params,
                paramsReaction: area.reaction.params,
                isActive: !area.isActive
            }
            let response = await axios.put(`${process.env.REACT_APP_DASHBOARD_API}/AR/link/${area.id}`, body,
                {
                    'headers': {'Authorization': `Bearer  ${localStorage.getItem('JWT')}`}
                });
            if (response.status === 200) {
                area.isActive = !area.isActive;
                setMyAreas([...myAreas]);
            }
        } catch (err) {
            console.log(err);
            if (err.response) {
                setIsError(true)
            }
        }
    }

    const handleServicesSub = async (services, serviceToDel) => {
        if (serviceToDel !== undefined) {
            await myAreas.forEach(async (area) => {
                if (area.action.id_service === serviceToDel.id || area.reaction.id_service === serviceToDel.id) {
                    await deleteAR(area.id, false);
                }
            });
        }
        await onServicesSub(services);
        services.filter((e) => e.isActive === true).length !== 0 ? setCanAddArea(true) : setCanAddArea(false);
        await getActionsAndReactions(true);
    }

    const checkIfCanAdd = async (nbService) => {
        nbService !== 0 ? setCanAddArea(true) : setCanAddArea(false);
    }

    const checkIfAR = (service) => {
        let value = myAreas.some((e) => e.action.id_service === service.id || e.reaction.id_service === service.id);
        return (value);
    }

    const getActionsAndReactions = async (isLoadingOver) => {
        try {
            setIsLoading(true);
            const response = await axios.get(`${process.env.REACT_APP_DASHBOARD_API}/AR/`,
            {
                'headers': {'Authorization': `Bearer  ${localStorage.getItem('JWT')}`}
            });
            let arFetched = response.data;
            arFetched.actions.forEach((element, index) => {
                let params = [];
                if (element.params) {
                    element?.params.forEach((param) => {
                        params.push({name: param, value: ''});
                    });
                }
                arFetched.actions[index] = {
                    icon: PropFromId(element.id_service)['icon'],
                    color: PropFromId(element.id_service)['color'],
                    ...element,
                    params: params
                }
            })
            arFetched.reactions.forEach((element, index) => {
                let params = [];
                if (element.params) {
                    element?.params.forEach((param) => {
                        params.push({name: param, value: ''});
                    });
                }
                arFetched.reactions[index] = {
                    icon: PropFromId(element.id_service)['icon'],
                    color: PropFromId(element.id_service)['color'],
                    ...element,
                    params: params
                }
            })
            try {
                setIsLoading(true);
                const res = await axios.get(`${process.env.REACT_APP_DASHBOARD_API}/AR/link`,
                {
                    'headers': {'Authorization': `Bearer  ${localStorage.getItem('JWT')}`}
                });
                let areasFetched = res.data;
                areasFetched.forEach((element, index) => {
                    areasFetched[index] = {
                        action: arFetched.actions.find((e) => e.id === element.idActions),
                        reaction: arFetched.reactions.find((e) => e.id === element.idReactions),
                        ...element
                    }
                    areasFetched[index].action.params = areasFetched[index].paramsAction;
                    areasFetched[index].reaction.params = areasFetched[index].paramsReaction;
                })
                setMyAreas(areasFetched);
            } catch (err) {
                if (err.response) {
                    setIsError(true);
                }
            }
            setActions(arFetched.actions);
            setReactions(arFetched.reactions);
            setIsLoading(!isLoadingOver);
        } catch (err) {
            if (err.response) {
                setIsError(true);
                setIsLoading(!isLoadingOver);
            }
        }
    }

    useEffect(() => {
        isMounted.current = true
        const source = axios.CancelToken.source();
        (async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(`${process.env.REACT_APP_DASHBOARD_API}/AR/`,
                {
                    cancelToken: source.token,
                    'headers': {'Authorization': `Bearer  ${localStorage.getItem('JWT')}`}
                });
                if (isMounted && isMounted.current) {
                    let arFetched = response.data;
                    arFetched.actions.forEach((element, index) => {
                        let params = [];
                        if (element.params) {
                            element?.params.forEach((param) => {
                                params.push({name: param, value: ''});
                            });
                        }
                        arFetched.actions[index] = {
                            icon: PropFromId(element.id_service)['icon'],
                            color: PropFromId(element.id_service)['color'],
                            ...element,
                            params: params
                        }
                    })
                    arFetched.reactions.forEach((element, index) => {
                        let params = [];
                        if (element.params) {
                            element?.params.forEach((param) => {
                                params.push({name: param, value: ''});
                            });
                        }
                        arFetched.reactions[index] = {
                            icon: PropFromId(element.id_service)['icon'],
                            color: PropFromId(element.id_service)['color'],
                            ...element,
                            params: params
                        }
                    })
                    await (async () => {
                        try {
                            setIsLoading(true);
                            const res = await axios.get(`${process.env.REACT_APP_DASHBOARD_API}/AR/link`,
                            {
                                cancelToken: source.token,
                                'headers': {'Authorization': `Bearer  ${localStorage.getItem('JWT')}`}
                            });
                            if (isMounted && isMounted.current) {
                                let areasFetched = res.data;
                                areasFetched.forEach((element, index) => {
                                    areasFetched[index] = {
                                        action: arFetched.actions.find((e) => e.id === element.idActions),
                                        reaction: arFetched.reactions.find((e) => e.id === element.idReactions),
                                        ...element
                                    }
                                    areasFetched[index].action.params = areasFetched[index].paramsAction;
                                    areasFetched[index].reaction.params = areasFetched[index].paramsReaction;
                                })
                                setMyAreas(areasFetched);
                            }
                        } catch (err) {
                            if (err.response) {
                                setIsError(true);
                            }
                        }
                    })()
                    setActions(arFetched.actions);
                    setReactions(arFetched.reactions);
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
            onAreaActivation={handleAreaSub}
            />
            <AlertError isError={isError} setIsError={setIsError}/>
        </Grid>
    )

}