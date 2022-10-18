import React, {createContext, useState, useContext} from "react";

const Context = createContext(null);
// or
//const Context = createContext()

export function UserContextProvider({children}){
    const [user, setUser] = useState(null)
    return(
        <Context.Provider value={{
            user,
            setUser
        }}>
            {children}
        {/*  없어도 되나?  */}
        </Context.Provider>
    )
}

export function useUserContext(){
    const userContext = useContext(Context);
    if(!userContext){
        throw new Error('UserContext.Provider is not found');
    }
    return userContext
}