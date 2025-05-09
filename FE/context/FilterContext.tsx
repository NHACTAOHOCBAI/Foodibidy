import { createContext, ReactNode, useContext, useState } from "react";

interface FilterContextProps {
    isFilterOpen: boolean;
    openFilter: () => void;
    closeFilter: () => void;
}

const FilterContext = createContext<FilterContextProps | undefined>(undefined);

export const FilterProvider = ({ children }: { children: ReactNode }) => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const openFilter = () => setIsFilterOpen(true);
    const closeFilter = () => setIsFilterOpen(false);

    return (
        <FilterContext.Provider
            value={{ isFilterOpen, openFilter, closeFilter }}
        >
            {children}
        </FilterContext.Provider>
    );
};

export const useFilter = () => {
    const context = useContext(FilterContext);
    if (!context) throw new Error('useFilter must be used within FilterProvider');
    return context;
};