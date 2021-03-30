import React, { useMemo, useRef, useState } from 'react'
import { Popover } from '@material-ui/core'
import { Link } from 'react-router-dom'

import Avatar from 'shared/Avatar'
import {
    CopyIcon,
    BalanceIcon,
    ProfileIcon,
    ItemsIcon,
    DisconnectIcon,
} from 'shared/icons'
import avatar from 'shared/images/artist/avatar.jpg'

import useStyles from './UserMenu.styled'
import { useWeb3React } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { shortAddress } from '../../utils/helpers'

{
    /*TODO: Add relevant links path */
}

const userLinks = [
    { title: 'My items', icon: <ItemsIcon /> },
    { title: 'Edit Profile', icon: <ProfileIcon /> },
    { title: 'Disconnect', icon: <DisconnectIcon /> },
]

const UserMenu = (): JSX.Element | null => {
    const classes = useStyles()
    const anchorElRef = useRef<HTMLDivElement>(null)
    const [isOpen, setOpen] = useState<boolean>(false)

    const { account } = useWeb3React<Web3Provider>()
    const userAddress = useMemo(() => {
        if (!!account) {
            return shortAddress(account, 10)
        }
    }, [account])

    if (!account) {
        return null
    }

    return (
        <div>
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
                        <CopyIcon />
                    </div>
                    <Link to="/" className={classes.profileLink}>
                        Set display name
                    </Link>
                    <ul className={classes.balances}>
                        <li>
                            <BalanceIcon />
                            <div className={classes.balance}>
                                <span>Balance</span>
                                <span>0.237 ETH $140.47 USD</span>
                            </div>
                        </li>
                    </ul>
                    <ul className={classes.links}>
                        {userLinks.map((link, index) => (
                            <li key={index}>
                                <Link to="/">
                                    {link.icon}
                                    <span>{link.title}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </Popover>
        </div>
    )
}

export default UserMenu
