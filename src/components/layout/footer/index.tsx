import React from 'react';
// import { Input } from '@material-ui/core'
// import Button from 'components/button'
// import text from 'public/content.js'
import { TwitterIcon, InstagramIcon, SatoshiArtIcon } from 'components/icons';

import FooterMenu from './footerMenu';
import useStyles from './footer.style';

export type JustifyTopRowFooter = 'center' | 'space-between';

// type FooterProps = {
//     justifyTopRow?: JustifyTopRowFooter
// }

function Footer(): JSX.Element {
  const classes = useStyles();
  // const { t } = useTranslation()

  return (
    <>
      {/*<div
                className={classes.topFooter}
                style={{ justifyContent: justifyTopRow }}
            >
                <TextGradient className={classes.subscribeToOurNewsLetter}>
                    Subscribe to our newsletter
                </TextGradient>
                <div>
                    <Input
                        type="email"
                        classes={{
                            root: classes.emailInput,
                        }}
                        placeholder={t('emailAddress')}
                        disableUnderline
                    />
                    <Button
                        label={t('subscribe')}
                        className={classes.subscribeBtn}
                    />
                </div>
            </div>*/}
      <div className={classes.footerSplitter} />
      <div className={classes.bottomFooter}>
        <div className={classes.leftBottomCol}>
          <SatoshiArtIcon />
          <div className={classes.footerMenu}>
            <FooterMenu />
          </div>
        </div>
        <div className={classes.rightBottomCol}>
          <div className={classes.socialLinks}>
            <a href='https://twitter.com/thesatoshiart' target='_blank' rel='noreferrer'>
              <TwitterIcon />
            </a>
            <a href='https://www.instagram.com/satoshi.art/' target='_blank' rel='noreferrer'>
              <InstagramIcon />
            </a>
          </div>
          <div className={classes.copyright}>© 2021 Satoshi ART</div>
        </div>
      </div>
    </>
  );
}

export default Footer;
