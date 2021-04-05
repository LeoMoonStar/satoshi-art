import React, { useEffect, useMemo, useRef, useState } from 'react'
import { IconButton, Popover } from '@material-ui/core'
import { ethers } from 'ethers'
import { useWeb3React } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { shortAddress } from 'utils/helpers'
// import { useUser } from 'hooks/useUser'

// import { Link } from 'react-router-dom'

import Avatar from 'shared/Avatar'
import {
    CopyIcon,
    BalanceIcon,
    // ProfileIcon,
    // ItemsIcon,
    // DisconnectIcon,
} from 'shared/icons'
import avatar from 'shared/images/artist/avatar.jpg'

import useStyles from './UserMenu.styled'

{
    /*TODO: Add relevant links path */
}

// const userLinks = [
//     { title: 'My items', icon: <ItemsIcon /> },
//     { title: 'Edit Profile', icon: <ProfileIcon /> },
//     { title: 'Disconnect', icon: <DisconnectIcon /> },
// ]

const UserMenu = (): JSX.Element | null => {
    const classes = useStyles()
    const isAuthorized = localStorage.getItem('isAuthorized') || 'false'
    const anchorElRef = useRef<HTMLDivElement>(null)
    const [isOpen, setOpen] = useState<boolean>(false)
    const [balance, setBalance] = useState('')
    const { account, library } = useWeb3React<Web3Provider>()

    useEffect(() => {
        async function getBalance() {
            if (library && account && isAuthorized) {
                const userEthBalance = await library.getBalance(account)
                setBalance(ethers.utils.formatEther(userEthBalance))
            }
        }
        getBalance()
    }, [account, library, isAuthorized])

    const userAddress = useMemo(() => {
        if (!!account) {
            return shortAddress(account, 10)
        }
    }, [account])

    if (isAuthorized === 'false' || !account) {
        return null
    }

    return (
        <div className={classes.userMenu}>
            <div ref={anchorElRef}>
                <Avatar
                    size={40}
                    image={avatar}
                    onClick={() => setOpen(!isOpen)}
                />
            </div>
            <Popover
                open={isOpen}
                anchorEl={anchorElRef?.current}
                onClose={() => setOpen(false)}
                classes={{
                    root: classes.popover,
                }}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <div>
                    <div className={classes.nickName}>
                        {userAddress}
                        <IconButton
                            onClick={() =>
                                account &&
                                navigator.clipboard.writeText(account)
                            }
                        >
                            <CopyIcon />
                        </IconButton>
                    </div>
                    {/*<Link to="/" className={classes.profileLink}>*/}
                    {/*    Set display name*/}
                    {/*</Link>*/}
                    <ul className={classes.balances}>
                        <li>
                            <BalanceIcon />
                            <div className={classes.balance}>
                                <span>Balance</span>
                                <span>{balance} ETH $140.47 USD</span>
                            </div>
                        </li>
                    </ul>
                    {/*<ul className={classes.links}>*/}
                    {/*    {userLinks.map((link, index) => (*/}
                    {/*        <li key={index}>*/}
                    {/*            <Link to="/">*/}
                    {/*                {link.icon}*/}
                    {/*                <span>{link.title}</span>*/}
                    {/*            </Link>*/}
                    {/*        </li>*/}
                    {/*    ))}*/}
                    {/*</ul>*/}
                </div>
            </Popover>
        </div>
    )
}

export default UserMenu
