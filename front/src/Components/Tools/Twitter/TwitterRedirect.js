import { Button, Grid } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import AlertError from "../AlertError";

export default function TwitterRedirect() {
    const [isError, setIsError] = useState(false);
    const findCodeInURL = (url) => {
        let result = url.indexOf("code");
        if (result !== -1) {
            return (url.substring(result + 5, url.length))
        }
        return ('');
    }

    const handleGoBack = async () => {
        let res = findCodeInURL(window.location.href);
        if (res !== '') {
            try {
                let body = {
                    code: res
                }
                await axios.post(`${process.env.REACT_APP_DASHBOARD_API}/twitter/auth`, body,
                    {
                        'headers': {'Authorization': `Bearer  ${localStorage.getItem('JWT')}`}
                    });
                try {
                    let subBody = {
                        action: 'sub',
                        serviceId: 1
                    };
                    await axios.post(`${process.env.REACT_APP_DASHBOARD_API}/services/subscribe`, subBody,
                        {
                            'headers': {'Authorization': `Bearer  ${localStorage.getItem('JWT')}`}
                        });
                } catch (err) {
                    if (err.response) {
                        setIsError(true);
                    }
                }
            } catch (err) {
                if (err.response) {
                    setIsError(true);
                }
            } finally {
                window.location.href = `${process.env.REACT_APP_DASHBOARD_FRONT}/App/Twitter`
            }
        }
    }

    return (
        <Grid>
            <Button variant={'contained'} color={'secondary'} onClick={() => {handleGoBack()}}>Go back</Button>
            <AlertError isError={isError} setIsError={setIsError}/>
        </Grid>
    )
}