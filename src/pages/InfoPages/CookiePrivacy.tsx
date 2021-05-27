import React from 'react';
import text from '../../constants/content';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import Layout from 'components/layout';

import { LeftArrowIcon } from 'components/icons';

import useStyles from './InfoPages.style';

export default function CookiePrivacy(): JSX.Element {
  const history = useHistory();
  const classes = useStyles();
  const handleGoBack = () => history.push('/');

  return (
    <Layout>
      <div className={classes.container}>
        <Button className={classes.backBtn} onClick={handleGoBack}>
          <LeftArrowIcon /> {text['backToHomePage']}
        </Button>
        <div className={classes.contentContainer}>
          <h1>COOKIES POLICY</h1>
          <div className={classes.lastUpdated}>Last updated: April 6, 2021</div>
          <div>
            <p>
              This cookies policy (the “<b>Cookies Policy</b>”) explains what Cookies are and how We use them. You
              should read this Cookies Policy so You can understand what type of Cookies We use, or the information We
              collect using Cookies and how that information is used.
            </p>
            <p>
              Cookies do not typically contain any information that personally identifies a user, but personal
              information that We store about You may be linked to the information stored in and obtained from Cookies.
              For further information on how We use, store and keep your personal data secure, see Our Privacy Policy.
              We do not store sensitive personal information, such as mailing addresses, account passwords, etc. in the
              Cookies We use.
            </p>
            <h2>INTERPRETATION AND DEFINITIONS</h2>
            <h3>INTERPRETATION</h3>
            <p>
              The words of which the initial letter is capitalized have meanings defined under the following conditions.
              The following definitions shall have the same meaning regardless of whether they appear in singular or in
              plural.
            </p>
            <h3>DEFINITIONS</h3>
            <p>For the purposes of this Cookies Policy:</p>
            <p>
              <span>
                “<strong>Company</strong>” (referred to as either the “Company”, “We”, “Us” or “Our” in this Cookies
                Policy) means Satoshi.ART Inc.
              </span>
              <span>
                “<strong>Cookies</strong>” means small files that are placed on Your computer, mobile device or any
                other device by a website, containing details of your browsing history on that website among its many
                uses.
              </span>
              <span>
                “<strong>Website</strong>” means the Satoshi.ART Inc. website..
              </span>
              <span>
                “<strong>You</strong>” means the individual accessing or using the Website, or a company, or any legal
                entity on behalf of which such individual is accessing or using the Website, as applicable.
              </span>
            </p>
            <h2>THE USE OF THE COOKIES</h2>
            <h3>TYPE OF COOKIES WE USE</h3>
            <p>
              Cookies can be “Persistent” or “Session” Cookies. Persistent Cookies remain on your personal computer or
              mobile device when You go offline, while Session Cookies are deleted as soon as You close your web
              browser.
            </p>
            <p>We use both session and persistent Cookies for the purposes set out below: </p>

            <strong>Necessary / Essential Cookies</strong>
            <p>
              <span>Type: Session Cookies</span>
              <span>Administered by: Us</span>
              <span>
                Purpose: These Cookies are essential to provide You with services available through the Website and to
                enable You to use some of its features. They help to authenticate users and prevent fraudulent use of
                user accounts.
              </span>
              <span>
                Without these Cookies, the services that You have asked for cannot be provided, and We only use these
                Cookies to provide You with those services.
              </span>
            </p>

            <strong>Cookies Policy / Notice Acceptance Cookies</strong>
            <p>
              <span>Type: Persistent Cookies</span>
              <span>Administered by: Us</span>
              <span>Purpose: These Cookies identify if users have accepted the use of cookies on the Website.</span>
            </p>

            <strong>Functionality Cookies</strong>
            <p>
              <span>Type: Persistent Cookies</span>
              <span>Administered by: Us</span>
              <span>
                Purpose: These Cookies allow Us to remember choices You make when You use the Website, such as
                remembering your login details or language preference. The purpose of these Cookies is to provide You
                with a more personal experience and to avoid You having to re-enter your preferences every time You use
                the Website.
              </span>
            </p>

            <strong>Tracking and Performance Cookies</strong>
            <p>
              <span>Type: Persistent Cookies</span>
              <span>Administered by: Third Parties</span>
              <span>
                Purpose: These Cookies are used to track information about traffic to the Website and how users use the
                Website. The information gathered via these Cookies may directly or indirectly identify you as an
                individual visitor. This is because the information collected is typically linked to a pseudonymous
                identifier associated with the device You use to access the Website. We may also use these Cookies to
                test new pages, features or new functionality of the Website to see how Our users react to them.
              </span>
            </p>

            <strong>Targeting and Advertising Cookies</strong>
            <p>
              <span>Type: Persistent Cookies</span>
              <span>Administered by: Third Parties</span>
              <span>
                Purpose: These Cookies track your browsing habits to enable Us to show advertising which is more likely
                to be of interest to You. These Cookies use information about your browsing history to group You with
                other users who have similar interests. Based on that information, and with Our permission, third party
                advertisers can place Cookies to enable them to show adverts which We think will be relevant to your
                interests while You are on third party websites
              </span>
            </p>

            <h3>YOUR CHOICES REGARDING COOKIES</h3>
            <p>
              If You prefer to avoid the use of Cookies on the Website, first You must disable the use of Cookies in
              your browser and then delete the Cookies saved in your browser associated with the Website. You may use
              this option for preventing the use of Cookies at any time. If You do not accept Our Cookies, You may
              experience some inconvenience in your use of the Website and some features may not function properly. If
              You’d like to delete Cookies or instruct your web browser to delete or refuse Cookies, please visit the
              help pages of your web browser.
            </p>
            <p>
              <span>For the Chrome web browser, please visit this page from Google: </span>
              <a rel='noreferrer' target='_blank' href='https://support.google.com/accounts/answer/32050'>
                https://support.google.com/accounts/answer/32050
              </a>
            </p>
            <p>
              <span>For the Internet Explorer web browser, please visit this page from Microsoft:</span>
              <a rel='noreferrer' target='_blank' href='http://support.microsoft.com/kb/278835'>
                http://support.microsoft.com/kb/278835
              </a>
            </p>
            <p>
              <span>For the Firefox web browser, please visit this page from Mozilla:</span>
              <a
                rel='noreferrer'
                target='_blank'
                href='https://support.mozilla.org/en-US/kb/delete-cookies-remove-info-websites-stored'
              >
                https://support.mozilla.org/en-US/kb/delete-cookies-remove-info-websites-stored
              </a>
            </p>
            <p>
              <span>For the Safari web browser, please visit this page from Apple:</span>
              <a
                rel='noreferrer'
                target='_blank'
                href='https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471'
              >
                https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471
              </a>
            </p>
            <p>For any other web browser, please visit your web browser’s official web pages. </p>
            <h2>CONTACT US</h2>
            <p>
              If you have any questions or comments about this Cookies Policy, you email us at{' '}
              <a rel='noreferrer' target='_blank' href='mailto:support@satoshi.art'>
                support@satoshi.art
              </a>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
