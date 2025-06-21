import React, { createContext } from "react";
const RestaurantContext = createContext({});

const RestaurantProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <RestaurantContext.Provider value={{}}>
            {children}
        </RestaurantContext.Provider>
    );
};

export default RestaurantProvider;