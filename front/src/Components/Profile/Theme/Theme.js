import React, {useState} from 'react';
import {Grid, Paper, Typography} from "@mui/material";
import {dataTheme} from "../../Main/config";
import DisplayTheme from "./DisplayTheme";

export default function Theme() {
    const [selectedId, setSelectedId] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    return <Grid item xs={7} style={{marginTop: 25}}>
        <Paper elevation={1} sx={{p: 4}}>
            <Grid container item xs={12}>
                <Grid item xs={12}>
                    <Typography style={{fontWeight: 'bold', fontSize: 20}}>
                        Theme
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography style={{fontSize: 11}} sx={{color: 'grey.500'}}>
                        Select your theme:
                    </Typography>
                </Grid>
            </Grid>
            <Grid container item xs={12} spacing={2} style={{marginTop: 5}}>
                {dataTheme.map((elem) => <Grid key={`${elem.name}-${elem.id}`} item xs={3}>
                    <DisplayTheme color={elem.color} name={elem.name} isChecked={selectedId === elem.id} isLoading={isLoading}/>
                </Grid>)}
            </Grid>
        </Paper>
    </Grid>
}