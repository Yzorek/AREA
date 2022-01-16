import {
    Routes,
    Route,
    useNavigate,
} from "react-router-dom";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Main from "./Components/Main/Main";
import {useEffect, useState} from "react";
import axios from "axios";
import {createTheme, ThemeProvider} from "@mui/material";
import {theme_default} from "./Components/Main/config";

function App() {
    const [isConnected, setIsConnected] = useState(false);
    let navigate = useNavigate();

    const theme = createTheme(theme_default);

    useEffect(() => {
        (async () => {
            const response = await axios.get(`${process.env.REACT_APP_DASHBOARD_API}/auth`,
                {'headers': {'Authorization': `Bearer  ${localStorage.getItem('JWT')}`}})

            if (response.status === 401) {
                setIsConnected(false);
            } else {
                setIsConnected(true);
            }
        })()
    }, [navigate])

    return (
        <ThemeProvider theme={theme}>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="Login" element={<Login/>}/>
                <Route path="Register" element={<Register/>}/>
                <Route path="App/*" element={<Main/>}/>
                <Route
                    path="*"
                    element={
                        <main style={{ padding: "1rem" }}>
                            <p>There's nothing here!</p>
                        </main>
                    }
                />
            </Routes>
        </ThemeProvider>
    );
}

export default App;
