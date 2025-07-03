import React, { createContext, useState } from "react";
interface MyProfileContextType {
  restaurantId?: string;
  setRestaurantId: (value: string | undefined) => void;
  myProfile:
    | {
        email?: string;
        role?: "admin" | "restaurant" | "customer";
        fullName?: string;
        phoneNumber?: string;
        avatar?: string;
      }
    | undefined;
  setMyProfile: (
    value:
      | {
          email?: string;
          role?: "admin" | "restaurant" | "customer";
          fullName?: string;
          phoneNumber?: string;
          avatar?: string;
        }
      | undefined
  ) => void;
}
const MyProfileContext = createContext<MyProfileContextType>({
  myProfile: undefined,
  setMyProfile: () => {},
  setRestaurantId: () => {},
  restaurantId: "",
});

const MyProfileProvider = ({ children }: { children: React.ReactNode }) => {
  const [myProfile, setMyProfile] = useState<{
    email?: string;
    role?: "admin" | "restaurant" | "customer";
    fullName?: string;

    phoneNumber?: string;
    avatar?: string;
  }>();
  const [restaurantId, setRestaurantId] = useState<string | undefined>(
    undefined
  );

  return (
    <MyProfileContext.Provider
      value={{
        myProfile: myProfile,
        setMyProfile: setMyProfile,
        setRestaurantId: setRestaurantId,
        restaurantId: restaurantId,
      }}
    >
      {children}
    </MyProfileContext.Provider>
  );
};
export { MyProfileContext };
export default MyProfileProvider;
