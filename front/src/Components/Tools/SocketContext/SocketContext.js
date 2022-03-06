import React, { useState, useEffect, createContext } from "react";
import io from "socket.io-client";
import AlertError from "../AlertError";

const defaultValue = null

const SocketContext = createContext(defaultValue);

const globalDisconnectSocket = (client) => {
    if (client) {
        console.log('close socket')
        client.off("disconnect")
    }
}

export function SocketContextProvider({children}) {
    const [value, setValue] = useState(null);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const socket = await io(process.env.REACT_APP_DASHBOARD_API, { transports : ['websocket'],
                    extraHeaders: {
                        "jwt": localStorage.getItem('JWT')
                    }
                })
                setValue(socket)
                console.log("I am connected ", process.env.REACT_APP_DASHBOARD_API)
            } catch (err) {
                setIsError(true);
            }
        })()

        return () => {
            setValue(prevState => {
                if (prevState && prevState.socket)
                    globalDisconnectSocket(prevState.socket)
            })
        }
    }, [])

    return(
        <SocketContext.Provider value={value}>
            <AlertError isError={isError} setIsError={setIsError}/>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketContext;