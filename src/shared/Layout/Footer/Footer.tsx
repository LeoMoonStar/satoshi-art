import React from 'react'

import SubscribeTextAsIcon from 'shared/icons/SubscribeTextAsIcon.png'
import SatoshiArtIcon from 'shared/icons/Satoshi.ART.png'

import FooterMenu from './FooterMenu'
import useStyles from './Footer.style'

function Footer(): JSX.Element {
    const classes = useStyles()

    return (
        <>
            <div className={classes.topFooter}>
                <img
                    src={SubscribeTextAsIcon}
                    alt="Subscribe to our newslatter"
                />
                <div>
                    <input />
                </div>
            </div>
            <div className={classes.footerSplitter}></div>
            <div className={classes.bottomFooter}>
                <div className={classes.bottomFooterSection}>
                    <img src={SatoshiArtIcon} alt="Satoshi.ART" />

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
