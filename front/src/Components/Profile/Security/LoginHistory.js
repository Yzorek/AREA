import React from 'react';
import {Grid, Paper, Table, TableCell, TableHead, TableRow, Typography} from "@mui/material";
import {Business, DateRange, Dns} from "@mui/icons-material";

export default function LoginHistory() {
    return <Paper elevation={1}>
        <Grid container item xs={12} sx={{p: 4}}>
            <Grid item xs={12}>
                <Typography style={{fontWeight: 'bold', fontSize: 20}}>
                    Login history
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography style={{fontSize: 11}} sx={{color: 'grey.500'}}>
                    Your recent login activity:
                </Typography>
            </Grid>
        </Grid>
        <Grid container item xs={12}>
            <Table>
                <TableHead>
                    <TableRow sx={{bgcolor: 'grey.300'}}>
                        <TableCell style={{padding: 5}}>
                            <Grid container item xs={12} alignItems={'center'} spacing={1}>
                                <Grid item>
                                    <DateRange/>
                                </Grid>
                                <Grid item>
                                    DATE
                                </Grid>
                            </Grid>
                        </TableCell>
                        <TableCell style={{padding: 5}}>
                            <Grid container item xs={12} alignItems={'center'} spacing={1}>
                                <Grid item>
                                    <Dns/>
                                </Grid>
                                <Grid item>
                                    IP ADDRESS
                                </Grid>
                            </Grid>
                        </TableCell>
                        <TableCell style={{padding: 5}}>
                            <Grid container item xs={12} alignItems={'center'} spacing={1}>
                                <Grid item>
                                    <Business/>
                                </Grid>
                                <Grid item>
                                    CLIENT
                                </Grid>
                            </Grid>
                        </TableCell>
                    </TableRow>
                </TableHead>
            </Table>
        </Grid>
    </Paper>
}