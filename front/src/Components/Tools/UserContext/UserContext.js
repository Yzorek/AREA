import React, {createContext} from "react";

const defaultValue = null;

const UserContext = createContext(defaultValue);

export function UserContextProvider({children, user}) {
    return <UserContext.Provider value={user}>
        {children}
    </UserContext.Provider>
}

export default UserContext;