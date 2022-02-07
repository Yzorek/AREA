import Weather from "./Weather/Weather";

export const WEATHER = 1;

const widgetData = [
    {
        id: WEATHER,
        component: (openSettings, setOpenSettings) => <Weather openSettings={openSettings} setOpenSettings={setOpenSettings}/>,
    }
]

export default widgetData;