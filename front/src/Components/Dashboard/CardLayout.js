import React, {useState} from 'react';
import {Responsive as ResponsiveGridLayout} from "react-grid-layout";
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import {withSize} from "react-sizeme";
import {Grid, Alert} from "@mui/material";
import Widget from "./Widget/Widget";

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

function CardLayout({size, isEdit, widget, setWidget}) {
    const [layouts, setLayouts] = useState(
        getFromLS("layouts")
    );

    const onLayoutChange = (_, allLayouts) => {
        setLayouts(allLayouts);
    };

    const handleRemoveItem = (itemId) => {
        setWidget(widget.filter((i) => i !== itemId));
    };

    return <Grid container item xs={12} style={{marginTop: 20}}>
        {widget.length === 0 && <Alert severity="info" style={{width: '100%'}}>Any widget, has selected !</Alert>}
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
            {widget.map((item, index) => <div
                key={`${item.id} - Widget - ${index}`}
                data-grid={item.size}>
                <Widget isEdit={isEdit} handleRemoveItem={handleRemoveItem} idWidget={item.id}/>
            </div>)}
        </ResponsiveGridLayout>
    </Grid>

}


export default withSize()(CardLayout)