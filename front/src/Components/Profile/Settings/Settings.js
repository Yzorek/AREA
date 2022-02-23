import React, {useState} from 'react';
import {Checkbox, FormControlLabel, Grid, Paper, Typography} from "@mui/material";


export default function SettingsProfile() {
    const [checked, setChecked] = useState([true, false, false, false, false, false, false]);

    const handleChange1 = (event) => {
        setChecked([event.target.checked, event.target.checked, event.target.checked, event.target.checked, event.target.checked, event.target.checked, event.target.checked]);
    };

    const handleChange2 = (event) => {
        checked[1] = event.target.checked;
        setChecked([...checked]);
    };

    const handleChange3 = (event) => {
        checked[2] = event.target.checked;
        setChecked([...checked]);
    };

    const handleChange4 = (event) => {
        checked[3] = event.target.checked;
        setChecked([...checked]);
    };

    const handleChange5 = (event) => {
        checked[4] = event.target.checked;
        setChecked([...checked]);
    };

    const handleChange6 = (event) => {
        checked[5] = event.target.checked;
        setChecked([...checked]);
    };

    const handleChange7 = (event) => {
        checked[6] = event.target.checked;
        setChecked([...checked]);
    };

    return <Grid container item xs={12} sm={10} md={7} spacing={4}>
        <Grid item xs={12} style={{marginTop: 25}}>
            <Paper elevation={0} style={{borderRadius: 5}} sx={{p: 4}}>
                <Grid container item xs={12}>
                    <Grid item xs={4}>
                        <Typography style={{fontWeight: 'bold', fontSize: 20}}>
                            Profile Settings
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container item xs={8} direction={'column'}>
                    <FormControlLabel label="All" control={
                        <Checkbox
                            color="primary"
                            checked={checked[0] && checked[1] && checked[2] && checked[3] && checked[4] && checked[5] && checked[6]}
                            indeterminate={checked[0] !== checked[1] || checked[0] !== checked[2] || checked[0] !== checked[3] || checked[0] !== checked[4] || checked[0] !== checked[5] || checked[0] !== checked[6]}
                            onChange={handleChange1}
                        />
                    }
                    />
                    <FormControlLabel
                        style={{marginLeft: 25}}
                        label={<Typography fontWeight='bold' color="#424242" variant="subtitle1"> Notification when reaction is triggered </Typography>}
                        control={<Checkbox checked={checked[1]} color="secondary" onChange={handleChange2}/>}
                    />
                    <FormControlLabel
                        style={{marginLeft: 25}}
                        label={<Typography fontWeight='bold' color="#424242" variant="subtitle1"> Status is visible by other users </Typography>}
                        control={<Checkbox checked={checked[2]} color="secondary" onChange={handleChange3}/>}
                    />
                    <FormControlLabel
                        style={{marginLeft: 25}}
                        label={<Typography fontWeight='bold' color="#424242" variant="subtitle1"> Disable tutorial </Typography>}
                        control={<Checkbox checked={checked[3]} color="secondary" onChange={handleChange4}/>}
                    />
                    <FormControlLabel
                        style={{marginLeft: 25}}
                        label={<Typography fontWeight='bold' color="#424242" variant="subtitle1"> Findable by other users </Typography>}
                        control={<Checkbox checked={checked[4]} color="secondary" onChange={handleChange5}/>}
                    />
                    <FormControlLabel
                        style={{marginLeft: 25}}
                        label={<Typography fontWeight='bold' color="#424242" variant="subtitle1"> Settings 5 </Typography>}
                        control={<Checkbox checked={checked[5]} color="secondary" onChange={handleChange6}/>}
                    />
                    <FormControlLabel
                        style={{marginLeft: 25}}
                        label={<Typography fontWeight='Bold' color="#424242" variant="subtitle1"> Settings 6 </Typography>}
                        control={<Checkbox checked={checked[6]} color="secondary" onChange={handleChange7}/>}
                    />
                </Grid>
            </Paper>
        </Grid>
    </Grid>
}