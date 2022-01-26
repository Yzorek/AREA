import React, {useState} from 'react';
import { Responsive as ResponsiveGridLayout } from "react-grid-layout";
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { withSize } from "react-sizeme";
import {Grid, IconButton, Paper, Tooltip} from "@mui/material";
import {Cancel, Settings} from "@mui/icons-material";
import WidgetAction from "./Widget/WidgetAction";

function getFromLS(key) {
    let ls = {};
    if (global.localStorage) {
        try {
            ls = JSON.parse(global.localStorage.getItem("rgl-8")) || {};
        } catch (e) {
        }
    }
    return ls[key];
}

function CardLayout({size, isEdit}) {
    const [layouts, setLayouts] = useState(
        getFromLS("layouts")
    );

    const onLayoutChange = (_, allLayouts) => {
        setLayouts(allLayouts);
    };

    const handleRemoveItem = (itemId) => {
        //setItems(items.filter((i) => i !== itemId));
    };

    return <Grid container item xs={12} style={{marginTop: 20}}>
        <ResponsiveGridLayout
            className="layout"
            layouts={layouts}
            breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
            cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}
            rowHeight={60}
            width={size.width}
            onLayoutChange={onLayoutChange}
            isResizable={false}
        >
            <div
                key={`1 - 1`}
                data-grid={{w: 5, h: 5, x: 0, y: Infinity}}
            >
                <Paper style={{height: '100%', width: "100%"}}>
                    {isEdit && <WidgetAction handleRemoveItem={handleRemoveItem} handleOpenSettings={() => {}} />}
                </Paper>
            </div>
        </ResponsiveGridLayout>
    </Grid>

}


export default withSize()(CardLayout)