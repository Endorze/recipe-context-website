"use client"
import { currentAccounts } from "@/data/accountDetails";
import { AccountDetails } from "@/types/loginType";
import { useLoginState } from "../hooks/useLoginState";

export function useLogout(): () => void {

    const {user, setUser} = useLoginState();

    return () => {
        setUser(null)
    }

}


export function loginUser(input: AccountDetails): AccountDetails | null {

    return (
        currentAccounts.find(
            (account) =>
                account.username === input.username && account.password === input.password
        ) ?? null
    );
}
