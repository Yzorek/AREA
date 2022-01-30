import React, {useState} from 'react';
import {Grid, InputAdornment, Paper, TextField} from "@mui/material";
import {Search} from "@mui/icons-material";

export default function SettingsPage() {
    const [search, setSearch] = useState('');

    return <Grid item xs={12} sm={10} md={7} style={{marginTop: 25}}>
        <Grid item xs={12}>
            <Paper sx={{p: 2}}>
                <TextField fullWidth type={'search'} label={'Search settings'} value={search}
                           InputProps={{
                               startAdornment: (
                                   <InputAdornment position="start">
                                       <Search/>
                                   </InputAdornment>
                               ),
                           }}
                           onChange={(e) => setSearch(e.target.value)} variant={'outlined'}/>
            </Paper>
        </Grid>
    </Grid>
}