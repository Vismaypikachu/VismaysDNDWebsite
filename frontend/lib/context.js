import { createContext, useContext } from "react";

export const UserContext = createContext({
    user: null,
    userDoc: null,
    loading: false,
    // error: false,
});

export const EntitiesContext = createContext({});

export const useUser = () => {
    const { user, userDoc, loading } = useContext(UserContext);
    return { user, userDoc, loading };
};
