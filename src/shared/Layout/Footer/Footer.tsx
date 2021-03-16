import React from 'react'
import { Input } from '@material-ui/core'
import Button from 'shared/Button'
import { ReactComponent as SubscribeTextAsIcon } from 'shared/icons/SubscribeTextAsIcon.svg'
import { ReactComponent as SatoshiArtIcon } from 'shared/icons/Satoshi.ART.svg'

import FooterMenu from './FooterMenu'
import useStyles from './Footer.style'

function Footer(): JSX.Element {
    const classes = useStyles()

    return (
        <>
            <div className={classes.topFooter}>
                <SubscribeTextAsIcon />
                <div>
                    <Input
                        type="email"
                        classes={{
                            root: classes.emailInput,
                        }}
                        placeholder={'Email address'}
                        disableUnderline
                    />
                    <Button
                        label={'Subscribe'}
                        className={classes.subscribeBtn}
                    />
                </div>
            </div>
            <div className={classes.footerSplitter}></div>
            <div className={classes.bottomFooter}>
                <div className={classes.bottomFooterSection}>
                    <SatoshiArtIcon />

                    <div>social networks</div>
                </div>
                <div className={classes.bottomFooterSection}>
                    <FooterMenu />

                    <div>social networks</div>
                </div>
            </div>
        </>
    )
}

export default Footer
