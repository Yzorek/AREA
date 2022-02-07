import { Grid, Typography } from "@mui/material";

export default function ServicePage({title, areas, widgets}) {
    return (
        <Grid container item xs={12} style={{ padding: 20 }} spacing={2}>
            <Grid container item xs={12}>
                <Typography variant={'h5'} style={{fontWeight: 'bold'}}>
                    { title }
                </Typography>
            </Grid>
        </Grid>
    )
}