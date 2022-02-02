import React, {createContext} from "react";

const defaultValue = {isActive: true};

const TutorialContext = createContext(defaultValue);

export function TutorialContextProvider({children, value}) {
    return <TutorialContext.Provider value={value}>
        {children}
    </TutorialContext.Provider>
}

export default TutorialContext;