import { useState, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { checkUser } from 'api/user'

// TODO:  not needed until phase 2
export function useUser(): boolean {
    const [isAuthorized, setIssAuthorized] = useState(false)
    const { account } = useWeb3React<Web3Provider>()

    useEffect(() => {
        async function checkIfUserExist(account: string) {
            const user = await checkUser(account)
            if (user) {
                setIssAuthorized(true)
            }
        }
        if (!isAuthorized) {
            if (account) {
                checkIfUserExist(account)
            }
        }
    }, [account, isAuthorized])

    return isAuthorized
}
