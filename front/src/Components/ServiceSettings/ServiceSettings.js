import { Divider, Grid } from "@mui/material";
import ActionsReactions from "./ActionReactions";
import Services from "./Services";

export default function ServicesSettings() {

    return (
        <Grid container item xs={12}>
            <Services/>
            <Divider/>
            <ActionsReactions/>
        </Grid>
    )

}