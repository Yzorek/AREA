import React, {useEffect, useRef, useState} from 'react';
import {Autocomplete, Box, CircularProgress, TextField} from "@mui/material";
import axios from "axios";

export default function AutocompleteCities({value, setValue, isDisabled = false, isRequired = false, iso}) {
    const [options, setOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [search, setSearch] = useState('');
    const isMounted = useRef(null);

    useEffect(() => {
        if (isDisabled || !iso || iso.length === 0)
            return;
        setIsError(false);
        isMounted.current = true
        const source = axios.CancelToken.source();
        (async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(`${process.env.REACT_APP_DASHBOARD_API}/api/location/cities?iso2=${iso}&search=${search}`,
                    {
                        cancelToken: source.token,
                        'headers': {'Authorization': `Bearer  ${localStorage.getItem('JWT')}`}
                    });
                if (isMounted && isMounted.current) {
                    //console.log(response.data)
                    setOptions(response.data);
                    setIsLoading(false);
                }
            } catch (err) {
                if (err.response) {
                    setIsLoading(false);
                    setIsError(true);
                }
            }
        })()
        return () => {
            isMounted.current = false;
            source.cancel("Component Autocomplete cities got unmounted");
        }
    }, [search, iso, isDisabled])

    return <Autocomplete
        value={value}
        disabled={isDisabled || !iso || iso.length === 0}
        onChange={(event, newValue) => {
            setValue(newValue);
            setSearch('')
        }}
        fullWidth
        autoHighlight
        getOptionLabel={(option) => option}
        options={options}
        renderOption={(props, option) => {
            if (isError)
                return <Box component="li" sx={{'& > img': {mr: 2, flexShrink: 0}}} {...props}>
                    An Error has occured
                </Box>
            if (isLoading)
                return <Box component="li" sx={{'& > img': {mr: 2, flexShrink: 0}}} {...props}>
                    <CircularProgress style={{height: 20, width: 20, marginRight: 20}}/>
                    Loading...
                </Box>
            return <Box component="li" sx={{'& > img': {mr: 2, flexShrink: 0}}} {...props}>
                {option}
            </Box>
        }}
        renderInput={(params) => (
            <TextField
                required={isRequired}
                onChange={(e) => setSearch(e.target.value)}
                {...params}
                label="Choose a city"
                inputProps={{
                    ...params.inputProps,
                    autoComplete: 'new-password',
                }}
            />
        )}
    />
}