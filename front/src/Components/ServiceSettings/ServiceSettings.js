import { Divider, Grid } from "@mui/material";
import ActionsReactions from "./ActionReactions";
import Services from "./Services";

export default function ServicesSettings({onServicesSub}) {

    const handleServicesSub = (services) => {
        onServicesSub(services);
    }

    return (
        <Grid container item xs={12}>
            <Services onServiceSub={handleServicesSub}/>
            <Divider/>
            <ActionsReactions/>
        </Grid>
    )

}