import Weather from "./Weather/Weather";
import WeatherPreview from "./Weather/WeatherPreview";

export const WEATHER = 1;

const widgetData = [
    {
        id: WEATHER,
        component: (openSettings, setOpenSettings) => <Weather openSettings={openSettings} setOpenSettings={setOpenSettings}/>,
        preview: <WeatherPreview/>,
        size: {w: 4, h: 3, x: 0, y: Infinity},
    }
]

export default widgetData;