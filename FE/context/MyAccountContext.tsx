import { createContext, ReactNode, useContext, useState } from "react";
interface Address {
    typeName: string,
    addressName: string
}
interface MyAccountContextProps {
    avatar?: string;
    phoneNumber?: string;
    fullName?: string;
    email?: string;
    address?: Address[]
    setAccountInfo: (info: { avatar?: string; phoneNumber?: string; fullName?: string; email?: string, address?: Address[] }) => void;
}

const MyAccountContext = createContext<MyAccountContextProps | undefined>(undefined);

export const MyAccountProvider = ({ children }: { children: ReactNode }) => {
    const [avatar, setAvatar] = useState<string | undefined>(undefined);
    const [phoneNumber, setPhoneNumber] = useState<string | undefined>(undefined);
    const [fullName, setFullName] = useState<string | undefined>(undefined);
    const [email, setEmail] = useState<string | undefined>(undefined);
    const [address, setAddress] = useState<Address[] | undefined>(undefined);


    const setAccountInfo = (info: { avatar?: string; phoneNumber?: string; fullName?: string; email?: string, address?: Address[] }) => {
        if (info.avatar !== undefined) setAvatar(info.avatar);
        if (info.phoneNumber !== undefined) setPhoneNumber(info.phoneNumber);
        if (info.fullName !== undefined) setFullName(info.fullName);
        if (info.email !== undefined) setEmail(info.email);
        if (info.address !== undefined) setAddress(info.address);
    };

    return (
        <MyAccountContext.Provider
            value={{
                avatar,
                phoneNumber,
                fullName,
                email,
                address,
                setAccountInfo,
            }}
        >
            {children}
        </MyAccountContext.Provider>
    );
};

export const useMyAccount = () => {
    const context = useContext(MyAccountContext);
    if (!context) throw new Error('useMyAccount must be used within MyAccountProvider');
    return context;
};