import React, { createContext, useState } from "react";
interface MyProfileContextType {
    myProfile: {
        email?: string;
        role?: 'admin' | 'restaurant' | 'customer';
        fullName?: string;
        phoneNumber?: string;
        avatar?: string
    } | undefined,
    setMyProfile: (value: {
        email?: string;
        role?: 'admin' | 'restaurant' | 'customer';
        fullName?: string;
        phoneNumber?: string;
        avatar?: string
    } | undefined) => void
}
const MyProfileContext = createContext<MyProfileContextType>({
    myProfile: undefined,
    setMyProfile: () => { }
});

const MyProfileProvider = ({ children }: { children: React.ReactNode }) => {
    const [myProfile, setMyProfile] = useState<{
        email?: string;
        role?: 'admin' | 'restaurant' | 'customer';
        fullName?: string;
        phoneNumber?: string;
        avatar?: string
    }>()
    return (
        <MyProfileContext.Provider value={{
            myProfile: myProfile,
            setMyProfile: setMyProfile
        }}>
            {children}
        </MyProfileContext.Provider>
    );
};
export { MyProfileContext }
export default MyProfileProvider;