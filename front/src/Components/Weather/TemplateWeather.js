import React, {useState} from 'react';
import {Button, Grid, Icon, Paper, Typography} from "@mui/material";
import {Cloud} from "@mui/icons-material";

export default function TemplateWeather({city, countryCode, units}) {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    return <Paper style={{width: '100%', height: 150, cursor: 'pointer'}} sx={{
        transition: '0.5s',
        '&:hover': {boxShadow: 8}
    }}>
        <Grid container item xs={12} style={{height: '100%'}} sx={{p: 1}}>
            <Grid item xs={4} style={{height: '100%'}}>
                <Grid container item xs={12} alignItems={'center'} style={{height: '30%'}}>
                    <Button fullWidth size={"small"} startIcon={<img
                        loading="lazy"
                        style={{
                            width: "30px",
                            height: "auto",
                            borderRadius: 3,
                        }}
                        src={`https://flagcdn.com/w20/fr.png`}
                        srcSet={`https://flagcdn.com/w40/fr.png 2x`}
                        alt="fr"
                    />}>
                        Lille
                    </Button>
                </Grid>
                <Grid container item xs={12} alignItems={'center'} justifyContent={'center'} style={{height: '70%'}}>
                    <Typography variant={'h4'}>
                        22°C
                    </Typography>
                </Grid>
            </Grid>
            <Grid container item xs={8} style={{height: '100%'}} justifyContent={'flex-end'} sx={{p: 1}}>
                <Grid item>
                    <Icon>
                        <Cloud/>
                    </Icon>
                </Grid>
            </Grid>
        </Grid>
    </Paper>
}