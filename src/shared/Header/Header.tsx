import React from 'react'
import { Popper, PopperProps, TextField } from '@material-ui/core'
import { useWeb3React } from '@web3-react/core'
import { useSelector } from 'react-redux'
import { Web3Provider } from '@ethersproject/providers'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import Autocomplete from '@material-ui/lab/Autocomplete'
// import cx from 'clsx'

import { getWhiteListedStatus } from 'state/app/selectors'
import Button from 'shared/Button'
import UserMenu from 'shared/UserMenu'
import { FullLogo, SearchIcon, LogoHeaderWhiteIcon } from 'shared/icons'

import useStyles from './Header.style'
/* TODO: replace with real data */

const artists: any[] = []
const SearchPopper = function (props: PopperProps) {
    return (
        <Popper
            {...props}
            style={{ width: '672px' }}
            placement="bottom-start"
        />
    )
}

type HeaderProps = {
    inverseHeader?: boolean
    hasDivider?: boolean
}

export default function Header({
    inverseHeader = false,
    hasDivider = true,
}: HeaderProps): JSX.Element {
    const classes = useStyles()
    const { t } = useTranslation()
    const isAuthorized = localStorage.getItem('isAuthorized')
    const isWhiteListed = useSelector<any, boolean>(getWhiteListedStatus)
    const { account } = useWeb3React<Web3Provider>()

    return (
        <div className={classes.container}>
            <div className={classes.topRow}>
                <Link to="/" className={classes.logo}>
                    {inverseHeader ? <LogoHeaderWhiteIcon /> : <FullLogo />}
                </Link>
                {hasDivider && <div className={classes.divider} />}
            </div>
            <div className={classes.bottomRow}>
                <div className={classes.innerBottomRow}>
                    <div className={classes.searchWrapper}>
                        <Autocomplete
                            debug
                            classes={{
                                root: classes.autocomplete,
                                popper: classes.dropdown,
                            }}
                            PopperComponent={SearchPopper}
                            disableClearable
                            options={artists}
                            noOptionsText="No options"
                            renderOption={(value) => (
                                <>
                                    <SearchIcon />
                                    {value}
                                </>
                            )}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    InputProps={{
                                        ...params.InputProps,
                                        disableUnderline: true,
                                        type: 'search',
                                        placeholder:
                                            'by the artists, for the artists',
                                        classes: {
                                            root: classes.searchInput,
                                        },
                                    }}
                                />
                            )}
                        />
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                    </div>

                    <div className={classes.controls}>
                        {/*<Link*/}
                        {/*    to="/"*/}
                        {/*    className={cx(classes.howItWorksLink, {*/}
                        {/*        [classes.howItWorksLinkInverse]: inverseHeader,*/}
                        {/*    })}*/}
                        {/*>*/}
                        {/*    <Button>{t('howItWorks')}</Button>*/}
                        {/*</Link>*/}

                        {account && isAuthorized ? (
                            <>
                                {isWhiteListed && (
                                    <Link
                                        to={{
                                            pathname: '/create-collectible',
                                            state: { isAllowedGoBack: true },
                                        }}
                                        className={classes.createLink}
                                    >
                                        {}
                                        <Button
                                            variantCustom="linkButton"
                                            label={t('create')}
                                        />
                                    </Link>
                                )}
                                {/*<div className={classes.controlButtonsWrapper}>*/}
                                {/*    <IconButton>*/}
                                {/*        <NavbarBurgerIcon />*/}
                                {/*    </IconButton>*/}
                                {/*    <IconButton>*/}
                                {/*        <BellIcon />*/}
                                {/*    </IconButton>*/}
                                {/*</div>*/}
                            </>
                        ) : (
                            <div>
                                <Link
                                    to={'/connect'}
                                    className={classes.connectLink}
                                >
                                    <Button
                                        variantCustom="action"
                                        label={t('connectWallet')}
                                    />
                                </Link>
                            </div>
                        )}

                        <UserMenu />
                    </div>
                </div>
            </div>
        </div>
    )
}
