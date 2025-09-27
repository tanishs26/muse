"use client"
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Subscription, UserDetails } from "../../types";
import { User } from "@supabase/auth-helpers-nextjs";
import {
  useSessionContext,
  useUser as useSupaUser,
} from "@supabase/auth-helpers-react";

type UserContextType = {
  accessToken: string | null;
  user: User | null;
  userDetail: UserDetails | null;
  isLoading: boolean;
  subscription: Subscription | null;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);
type MyUserContextProviderProps = {
  children: ReactNode;
};

export const MyUserContextProvider = ({
  children,
}: MyUserContextProviderProps) => {
  const {
    session,
    isLoading: isLoadingUser,
    supabaseClient: supabase,
  } = useSessionContext();
  const user = useSupaUser();
  const accessToken = session?.access_token ?? null;
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);

  useEffect(() => {
    const getUserDetails = () => supabase.from("users").select("*").single();
    const getSubscription = () =>
      supabase
        .from("subscription")
        .select("*,prices(*,products(*))")
        .in("status", ["trialing", "active"])
        .single();

    if (user && !isLoadingData && !userDetails && !subscription) {
      setIsLoadingData(true);

      Promise.allSettled([getUserDetails(), getSubscription()]).then(
        (results) => {
          const userDetailPromise = results[0];
          const subscriptionPromise = results[1];
          if (userDetailPromise.status === "fulfilled") {
            setUserDetails(userDetailPromise.value.data as UserDetails);
          }
          if (subscriptionPromise.status === "fulfilled") {
            setSubscription(subscriptionPromise.value.data as Subscription);
          }
          setIsLoadingData(false);
        }
      );
    } else if (!user && !isLoadingUser && (userDetails || subscription)) {
      setUserDetails(null);
      setSubscription(null);
      setIsLoadingData(false);
    }
  }, [user, isLoadingUser, isLoadingData, userDetails, subscription, supabase]);

  const value = {
    accessToken,
    user,
    userDetail: userDetails,
    isLoading: isLoadingUser || isLoadingData,
    subscription,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a MyUserCOntextProvider");
  }
  return context;
};
