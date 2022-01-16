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

function App() {
    const [isConnected, setIsConnected] = useState(false);
    let navigate = useNavigate();

    const theme = createTheme({
        palette: {
            secondary: {
                main: 'rgb(16, 185, 129)'
            },
            primary: {
                main: 'rgb(11, 15, 25)'
            },
        }
    });

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
