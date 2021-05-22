import React, { useEffect } from 'react';
import Button from 'components/button';

import useStyles from './footerMenu.style';

const footerMenu = [
  { label: 'About Satoshi.Art', url: '/about-satoshi-art' },
  { label: 'Privacy', url: '/privacy' },
  { label: 'Cookie privacy', url: '/cookie-privacy' },
  { label: 'Support', url: '/support' },
  { label: 'Terms & Conditions', url: '/terms-and-conditions' },
];

const FooterMenu = (): JSX.Element => {
  const classes = useStyles();

  useEffect(() => {
    const { cookieconsent } = window as any;

    if (cookieconsent) {
      cookieconsent.run({
        notice_banner_type: 'standalone',
        consent_type: 'express',
        palette: 'dark',
        language: 'en',
        change_preferences_selector: '#changePreferences',
      });
    }
  }, []);

  return (
    <div>
      {footerMenu.map((menuItem, index) => {
        return (
          <a key={`${menuItem.label}-${index}`} className={classes.link} href={menuItem.url}>
            {menuItem.label}
          </a>
        );
      })}
      <Button id='changePreferences' className={classes.link} disableRipple disableFocusRipple>
        Change cookie preferences
      </Button>
    </div>
  );
};
export default FooterMenu;
