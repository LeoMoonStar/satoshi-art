/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import text from '../../constants/content';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import Layout from 'components/layout';

import { LeftArrowIcon } from 'components/icons';

import useStyles from './InfoPages.style';

export default function Privacy(): JSX.Element {
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
          <h1>PRIVACY POLICY</h1>
          <br />
          <b>Last updated: April 6, 2021</b>
          <br />
          <br />
          <b>YOUR PRIVACY: OVERVIEW</b>
          <br />
          <br />
          <p>
            Satoshi.ART Inc. (“Satoshi.ART,” “we” or “us”) is committed to protecting your privacy. We have prepared
            this Privacy Policy to describe to you our practices regarding the Personal Data (as defined below) we
            collect from users of our website (the “Site”) and online services (collectively, the “Service”).
          </p>
          <ul>
            <li>
              <div className={classes.listPrivacy}>
                <p>
                  <i>1. </i> <b>Questions; Contacting Satoshi.ART; Reporting Violations.</b> If you have any questions
                  or concerns or complaints about our Privacy Policy or our data collection or processing practices, or
                  if you want to report any security violations to us, please contact us at{' '}
                  <a href='mailto:info@satoshi.art'>info@satoshi.art</a>.
                </p>
              </div>
            </li>
            <li>
              <div className={classes.listPrivacy}>
                <p>
                  <i>2.</i>
                  <b> User Consent.</b> By submitting Personal Data through our Site or Services, you agree to the terms
                  of this Privacy Policy and you expressly consent to the collection, use and disclosure of your
                  Personal Data in accordance with this Privacy Policy. For conducting cryptocurrency transactions we
                  use third-party electronic wallet extensions; your interactions with us and/or any third-party
                  electronic wallet extensions are governed by the applicable privacy policies.
                </p>
              </div>
            </li>
            <li>
              <div className={classes.listPrivacy}>
                <p>
                  <i>3.</i> <b>A Note About Children.</b> We do not intentionally gather Personal Data from visitors who
                  are under the age of 13. If a child under 13 submits Personal Data to Satoshi.ART and we learn that
                  the Personal Data is the information of a child under 13, we will attempt to delete the information as
                  soon as possible. If you believe that we might have any Personal Data from a child under 13, please
                  contact us at the address indicated in Section 1 above.
                </p>
              </div>
            </li>
            <li>
              <div className={classes.listPrivacy}>
                <p>
                  <i>4.</i> <b>A Note to Users Outside of the United States.</b> If you are a non-U.S. user of the
                  Service, by visiting the Service and providing us with data, you acknowledge and agree that your
                  Personal Data may be processed for the purposes identified in the Privacy Policy. In addition, your
                  Personal Data may be processed in the country in which it was collected and in other countries,
                  including the United States, where laws regarding processing of Personal Data may be less stringent
                  than the laws in your country. By providing your data, you consent to such transfer.
                </p>
              </div>
            </li>
            <li>
              <div className={classes.listPrivacy}>
                <p>
                  <i>5.</i> <b>Types of Data We Collect.</b> “Personal Data” means data that allows someone to identify
                  or contact you, including, for example, your name, address, telephone number, e-mail address, as well
                  as any other non-public information about you that is associated with or linked to any of the
                  foregoing data. “Anonymous Data” means data, including aggregated and de-identified data, that is not
                  associated with or linked to your Personal Data; Anonymous Data does not, by itself, permit the
                  identification of individual persons. We collect Personal Data and Anonymous Data, as described below.
                  <span>
                    <p>
                      <i>5.1.</i> <u>Information You Provide Us.</u>
                      <span>
                        <p>
                          <i>5.1.1.</i> We may collect Personal Data from you, such as your first and last name, e-mail
                          and mailing addresses, address, and Satoshi.ART password when you create an account to log in
                          to our network (“Account”).
                        </p>
                        <p>
                          <i>5.1.2.</i> If you use our Services on your mobile device, we may collect your phone number
                          and the unique device id number.
                        </p>
                        <p>
                          <i>5.1.3.</i> Our Service lets you store preferences like how your content is displayed, your
                          location, safe search settings, notification settings, and favorite widgets. We may associate
                          these choices with your ID, browser or mobile device, and you can edit these preferences at
                          any time.
                        </p>
                        <p>
                          <i>5.1.4.</i> When connecting to our Services via a service provider that uniquely identifies
                          your mobile device, we may receive this identification and use it to offer extended services
                          and/or functionality.
                        </p>
                        <p>
                          <i>5.1.5.</i> Certain Services, such as two-factor authentication, may require our collection
                          of your phone number. We may associate that phone number to your mobile device identification
                          information.
                        </p>
                        <p>
                          <i>5.1.6.</i> If you provide us feedback or contact us via e-mail, we will collect your name
                          and e-mail address, as well as any other content included in the e-mail, in order to send you
                          a reply.
                        </p>
                        <p>
                          <i>5.1.7.</i> We also collect other types of Personal Data that you provide to us voluntarily,
                          such as your operating system and version, product registration number, address, and other
                          requested information if you contact us via e-mail regarding support for the Services.
                        </p>
                        <p>
                          <i>5.1.8.</i> We may also collect Personal Data at other points in our Service that state that
                          Personal Data is being collected.
                        </p>
                      </span>
                    </p>
                    <p>
                      <i>5.2</i>
                      <u>Information Collected via Technology.</u> As you navigate through and interact with our
                      Service, we may use automatic data collection technologies to collect certain information about
                      your equipment, browsing actions and patterns, including:
                      <span>
                        <p>
                          <i> 5.2.1.</i> Information Collected by Our Servers. To make our Service more useful to you,
                          our servers (which may be hosted by a third party service provider) collect information from
                          you, including your browser type, operating system, Internet Protocol (“IP”) address (a number
                          that is automatically assigned to your computer when you use the Internet, which may vary from
                          session to session), domain name, address, wallet type, and/or a date/time stamp for your
                          visit.
                        </p>
                        <p>
                          <i> 5.2.2.</i> Log Files. As is true of most websites, we gather certain information
                          automatically and store it in log files. This information includes IP addresses, browser type,
                          Internet service provider (“ISP”), referring/exit pages, operating system, date/time stamp,
                          and clickstream data. We use this information to analyze trends, administer the Service, track
                          users’ movements around the Service, gather demographic information about our user base as a
                          whole, and better tailor our Services to our users’ needs. For example, some of the
                          information may be collected so that when you visit the Service, it will recognize you and the
                          information could then be used to serve advertisements and other information appropriate to
                          your interests.
                        </p>
                        <p>
                          <i>5.2.3.</i> Cookies. Like many online services, we use cookies to collect information.
                          “Cookies” are small pieces of information that a website sends to your computer’s hard drive
                          while you are viewing the website. We may use both session Cookies (which expire once you
                          close your web browser) and persistent Cookies (which stay on your computer until you delete
                          them) to provide you with a more personal and interactive experience on our Service. This type
                          of information is collected to make the Service more useful to you and to tailor the
                          experience with us to meet your special interests and needs.
                        </p>
                        <p>
                          <i>5.2.4.</i> Pixel Tag. In addition, we use “Pixel Tags” (also referred to as clear Gifs, Web
                          beacons, or Web bugs). Pixel Tags are tiny graphic images with a unique identifier, similar in
                          function to Cookies, that are used to track online movements of Web users. In contrast to
                          Cookies, which are stored on a user’s computer hard drive, Pixel Tags are embedded invisibly
                          in Web pages. Pixel Tags also allow us to send e-mail messages in a format users can read, and
                          they tell us whether e-mails have been opened to ensure that we are sending only messages that
                          are of interest to our users. We may use this information to reduce or eliminate messages sent
                          to a user. We do not tie the information gathered by Pixel Tags to our users’ Personal Data.
                        </p>
                        <p>
                          <i>5.2.5.</i> How We Respond to Do Not Track Signals. We do not currently respond to “do not
                          track” signals or other mechanisms that might enable Users to opt out of tracking on our site.
                        </p>
                        <p>
                          <i>5.2.6.</i> Analytics Services. In addition to the tracking technologies we place, other
                          companies may set their own cookies or similar tools when you visit our Service. This includes
                          third party analytics services, including but not limited to Google Analytics (“Analytics
                          Services”), that we engage to help analyze how users use the Service. We may receive reports
                          based on these parties’ use of these tools on an individual or aggregate basis. We use the
                          information we get from Analytics Services only to improve our Service. The information
                          generated by the Cookies or other technologies about your use of our Service (the “Analytics
                          Information”) is transmitted to the Analytics Services. The Analytics Services use Analytics
                          Information to compile reports on user activity. The Analytics Services may also transfer
                          information to third parties where required to do so by law, or where such third parties
                          process Analytics Information on their behalf. Each Analytics Services’ ability to use and
                          share Analytics Information is restricted by such Analytics Services’ Terms of Use and Privacy
                          Policy. By using our Service, you consent to the processing of data about you by Analytics
                          Services in the manner and for the purposes set out above. For a full list of Analytics
                          Services, please contact us at the address given in paragraph (1).
                        </p>
                      </span>
                    </p>
                    <p>
                      <i>5.3.</i> Information Collected from Third Party Companies. We may receive Personal and/or
                      Anonymous Data about you from companies that provide our Services by way of a co-branded or
                      private-labeled website or companies that offer their products and/or services on our Service. In
                      particular, wallets provide us with your address and certain other information you choose to share
                      with wallets. These third party companies may supply us with Personal Data. We may add this to the
                      information we have already collected from you via our Service in order to improve it. We do not
                      collect Personal Data automatically, but we may tie the information that we collect automatically
                      to Personal Data about you that we collect from other sources or that you provide to us.
                    </p>
                  </span>
                </p>
              </div>
            </li>
            <li>
              <div className={classes.listPrivacy}>
                <p>
                  <i>6.</i> <b> Use of Your Personal Data.</b>
                  <span>
                    <p>
                      <i> 6.1.</i> <u>General Use.</u> In general, Personal Data you submit to us is used either to
                      respond to requests that you make, or to aid us in serving you better. We use your Personal Data
                      in the following ways:
                      <span>
                        <p>
                          <i>6.1.1.</i> facilitate the creation of and secure your Account on our network;
                        </p>
                        <p>
                          <i>6.1.2.</i> identify you as a user in our system;
                        </p>

                        <p>
                          <i>6.1.3.</i> provide improved administration of our Service;
                        </p>

                        <p>
                          <i>6.1.4.</i> provide the Services you request, including but not limited to facilitating your
                          cryptocurrency transactions through wallets;
                        </p>
                        <p>
                          <i>6.1.5.</i> improve the quality of experience when you interact with our Service;
                        </p>
                        <p>
                          <i>6.1.6.</i> send you a welcome e-mail to verify ownership of the e-mail address provided
                          when your Account was created;
                        </p>
                        <p>
                          <i>6.1.7.</i> protect you and other users from any conduct that violates the Terms of Use or
                          to prevent abuse or harassment of any user;
                        </p>
                        <p>
                          <i>6.1.8.</i> display your username next to the digital assets you wish to sell on the
                          Website;
                        </p>
                        <p>
                          <i>6.1.9.</i> send you administrative e-mail notifications, such as security or support and
                          maintenance advisories;
                        </p>
                        <p>
                          <i>6.1.10.</i> send you e-mail notifications related to actions on Service, including
                          notifications of offers on your digital assets;
                        </p>
                        <p>
                          <i>6.1.11. </i>respond to your inquiries related to employment opportunities or other
                          requests;
                        </p>
                        <p>
                          <i>6.1.12.</i> make telephone calls to you, from time to time, as a part of secondary fraud
                          protection or to solicit your feedback;
                        </p>
                        <p>
                          <i>6.1.13.</i> in any other way we may describe when you provide the Personal Data; and
                        </p>
                        <p>
                          <i>6.1.14.</i> send newsletters, surveys, offers, and other promotional materials related to
                          our Services and for other marketing purposes of Satoshi.ART.
                        </p>
                      </span>
                    </p>

                    <p>
                      <i>6.2.</i>
                      <u>Creation of Anonymous Data</u>. We may create Anonymous Data records from Personal Data by
                      excluding information (such as your name) that makes the data personally identifiable to you. We
                      use this Anonymous Data to analyze request and usage patterns so that we may enhance the content
                      of our Services and improve Service navigation. We reserve the right to use Anonymous Data for any
                      purpose and to disclose Anonymous Data to third parties without restriction.
                    </p>
                  </span>
                </p>
              </div>
            </li>
            <li>
              <div className={classes.listPrivacy}>
                <p>
                  <i>7.</i>
                  <b>Disclosure of Your Personal Data.</b> We disclose your Personal Data as described below and as
                  described elsewhere in this Privacy Policy.
                  <span>
                    <p>
                      <i>7.1.</i>
                      <u>Third Party Service Providers. </u>
                      We may share your Personal Data with third party service providers to: provide you with the
                      Services that we offer you through our Service; to conduct quality assurance testing; to
                      facilitate creation of accounts; to provide technical support; and/or to provide other services to
                      the Satoshi.ART.
                    </p>
                    <p>
                      <i>7.2.</i> <u>Affiliates.</u> We may share some or all of your Personal Data with our parent
                      company, subsidiaries, joint ventures, or other companies under a common control (“Affiliates”),
                      in which case we will require our Affiliates to honor this Privacy Policy.
                    </p>
                    <p>
                      <i>7.3.</i> <u>Corporate Restructuring.</u> We may share some or all of your Personal Data in
                      connection with or during negotiation of any merger, financing, acquisition or dissolution
                      transaction or proceeding involving sale, transfer, divestiture, or disclosure of all or a portion
                      of our business or assets. In the event of an insolvency, bankruptcy, or receivership, Personal
                      Data may also be transferred as a business asset. If another company acquires our company,
                      business, or assets, that company will possess the Personal Data collected by us and will assume
                      the rights and obligations regarding your Personal Data as described in this Privacy Policy.
                    </p>
                    <p>
                      <i>7.4.</i>
                      <u>As Legally Required.</u> Regardless of any choices you make regarding your Personal Data (as
                      described below), Satoshi.ART may disclose Personal Data if it believes in good faith that such
                      disclosure is necessary (a) in connection with any legal investigation; (b) to comply with
                      relevant laws or to respond to subpoenas or warrants served on Satoshi.ART; (c) to protect or
                      defend the rights or property of Satoshi.ART or users of the Service; and/or (d) to investigate or
                      assist in preventing any violation or potential violation of the law, this Privacy Policy, or our
                      Terms of Use.
                    </p>
                    <p>
                      <i>7.5.</i> <u>Other Disclosures.</u> We may also disclose your Personal Data, to fulfill the
                      purpose for which you provide it; for any other purpose disclosed by us when you provide it; or
                      with your consent. We do not sell your Personal Data.
                    </p>
                  </span>
                </p>
              </div>
            </li>
            <li>
              <div className={classes.listPrivacy}>
                <p>
                  <i>8. </i>
                  <b>Third Party Websites.</b> Our Service may contain links to third party websites. When you click on
                  a link to any other website or location, you will leave our Service and go to another site, and
                  another entity may collect Personal Data or Anonymous Data from you. You may also find marketplaces
                  powered by the Service on other websites. We have no control over, do not review, and cannot be
                  responsible for, these outside websites or their content. Please be aware that the terms of this
                  Privacy Policy do not apply to these outside websites or content, or to any collection of your
                  Personal Data after you click on links to such outside websites. We encourage you to read the privacy
                  policies of every website you visit. The links to third party websites or locations are for your
                  convenience and do not signify our endorsement of such third parties or their products, content or
                  websites.
                </p>
              </div>
            </li>
            <li>
              <div className={classes.listPrivacy}>
                <p>
                  <i>9.</i>
                  <b>Your Choices Regarding Information.</b> You have several choices regarding the use of information
                  on our Services:
                  <span>
                    <p>
                      <i>9.1.</i> Email Communications. We will periodically send you free, opt-in newsletters and
                      e-mails that directly promote the use of our Service. When you receive newsletters or promotional
                      communications from us, you may indicate a preference to stop receiving further communications
                      from us and you will have the opportunity to “opt-out” by following the unsubscribe instructions
                      provided in the e-mail you receive or by contacting us directly (please see contact information in
                      paragraph (1)). Despite your indicated e-mail preferences, we may send you occaisonal service
                      related communications, including notices of updates to our Terms of Use or Privacy Policy.
                    </p>
                    <p>
                      <i>9.2.</i> If you decide at any time that you no longer wish to accept Cookies from our Service
                      for any of the purposes described above, then you can instruct your browser, by changing its
                      settings, to stop accepting Cookies or to prompt you before accepting a Cookie from the websites
                      you visit. Consult your browser’s technical information. If you do not accept Cookies, however,
                      you may not be able to use all portions of the Service or all functionality of the Service. If you
                      have any questions about how to disable or modify Cookies, please let us know at the address given
                      in paragraph (1).
                    </p>
                  </span>
                </p>
              </div>
            </li>
            <li>
              <div className={classes.listPrivacy}>
                <p>
                  <i>10.</i> <b>Data Access and Control.</b> You can view, access, edit, or delete your personal data
                  for many aspects of the Service via your account settings page. You can also make choices about
                  Satoshi.ART’s use of your data. You can always choose whether you want to receive marketing
                  communications from us. You can also opt out from receiving marketing communications from us by using
                  the opt-out link on the communication, or by visiting your account settings page. We may retain an
                  archived copy of your records as required by law or for legitimate business purposes.
                  <span>
                    <p>
                      {' '}
                      <i>10.1.</i> <u>Data Access.</u> You can access your Personal Data on your account settings page.
                    </p>
                    <p>
                      <i>10.2.</i> <u>Data Portability.</u> You can request a copy of your Personal Data by contacting
                      us here and
                      {/* eslint-disable-next-line react/no-unescaped-entities */}
                      including "Please send me my Personal Data" in the subject line. Satoshi.ART will verify your
                      ability to access that email, then send you a digital export of the data we hold that is
                      associated with your email address. We will use reasonable efforts to respond to your request
                      within 7 days, but in all events within 28 days of our receipt of the request.
                    </p>
                    <p>
                      <i>10.3.</i> <u>Data Erasure.</u> You can delete your Personal Data on your account settings page.
                      Alternatively, you may request that Satoshi.ART delete your personal data by contacting us here
                      and including "Please delete my Personal Data" in the subject line. Satoshi.ART will verify your
                      ability to access that email, then delete the Personal Data associated with your email address. We
                      will use reasonable efforts to respond to your request within 7 days, but in all events within 28
                      days of our receipt of the request.
                    </p>
                    <p>
                      <i>10.4.</i> <u>Data Correction.</u> You can modify your Personal Data on your account settings
                      page.
                    </p>
                  </span>
                </p>
              </div>
            </li>
            <li>
              <div className={classes.listPrivacy}>
                <p>
                  <i>11. </i>
                  <b>Data Retention.</b> We may retain your personal information as long as you continue to use the
                  Service, have an account with us, or for as long as is necessary to fulfill the purposes outlined in
                  this Policy. You can ask to close your account by contacting us as described above, and we will delete
                  your Personal Data on request. We may, however, retain Personal Data for an additional period as is
                  permitted or required under applicable laws, for legal, tax, or regulatory reasons, or for legitimate
                  and lawful business purposes.
                </p>
              </div>
            </li>
            <li>
              <div className={classes.listPrivacy}>
                <p>
                  <i>12.</i> <b>Data Protection.</b> We implement various security measures to ensure the safety of your
                  Personal Data when you enter, submit, or access your Personal Data. All supplied sensitive information
                  is transmitted via Secure Socket Layer technology. We engage an independent analyst to perform
                  penetration testing. Information about security vulnerabilities that are successfully exploited
                  through penetration testing is then used to set mitigation and remediation priorities.
                </p>
              </div>
            </li>
            <li>
              <div className={classes.listPrivacy}>
                <p>
                  <i>13.</i> <b>Changes to This Privacy Policy.</b> This Privacy Policy may be updated from time to time
                  for any reason. We will notify you of any changes to our Privacy Policy by posting the new Privacy
                  Policy on our website. The date the Privacy Policy was last revised is identified at the beginning of
                  this Privacy Policy. You are responsible for ensuring we have an up-to-date active and deliverable
                  email address for you, and for periodically visiting our Service and this Privacy Policy to check for
                  any changes.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </Layout>
  );
}
