import React from 'react'
import { useTranslation, Trans } from 'react-i18next'
import { Button } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import Layout from 'shared/Layout'

import { LeftArrowIcon } from 'shared/icons'

import useStyles from './InfoPages.style'

export default function Privacy(): JSX.Element {
    const history = useHistory()
    const classes = useStyles()

    const { t } = useTranslation()
    const handleGoBack = () => history.push('/')

    return (
        <Layout>
            <div className={classes.container}>
                <Button className={classes.backBtn} onClick={handleGoBack}>
                    <LeftArrowIcon /> {t('backToHomePage')}
                </Button>
                <div className={classes.contentContainer}>
                    <h1>
                        {t('privacy-domainPrivacy', { domain: 'SuperRare' })}
                    </h1>
                    <div className={classes.lastUpdated}>
                        {t('privacy-domainPrivacy', {
                            month: 'December',
                            date: '22, 2020',
                        })}
                    </div>
                    <div>
                        <p>
                            <Trans
                                i18nKey="privacy-p1"
                                components={{ 1: <b /> }}
                            />
                        </p>

                        <p>{t('privacy-p2')}</p>

                        <h2>Personal Information We Collect</h2>

                        <p>{t('privacy-p3')}</p>

                        <p>
                            <span>
                                <Trans
                                    i18nKey="privacy-p4"
                                    components={{ 1: <strong /> }}
                                />
                            </span>
                            <span>
                                <Trans
                                    i18nKey="privacy-p5"
                                    components={{ 1: <strong /> }}
                                />
                            </span>
                            <span>
                                <Trans
                                    i18nKey="privacy-p6"
                                    components={{ 1: <strong /> }}
                                />
                            </span>
                        </p>

                        <h2>What We Do With Personal Information We Collect</h2>

                        <p>{t('privacy-p7')}</p>
                        <ul>
                            <li>-{t('privacy-list1-item1')}</li>
                            <li>-{t('privacy-list1-item2')}</li>
                            <li>-{t('privacy-list1-item3')}</li>
                            <li>-{t('privacy-list1-item4')}</li>
                            <li>-{t('privacy-list1-item5')}</li>
                            <li>-{t('privacy-list1-item6')}</li>
                        </ul>

                        <h2>When We May Share Personal Information</h2>

                        <p>{t('privacy-p8')}</p>

                        <h2>Cookies</h2>

                        <p>{t('privacy-p9')}</p>

                        <h3>How we use Cookies</h3>

                        <p>
                            <span>
                                <Trans
                                    i18nKey="privacy-p10"
                                    components={{ 1: <strong /> }}
                                />
                            </span>
                            <span>
                                <Trans
                                    i18nKey="privacy-p11"
                                    components={{ 1: <strong /> }}
                                />
                            </span>
                            <span>
                                <Trans
                                    i18nKey="privacy-p12"
                                    components={{ 1: <strong /> }}
                                />
                            </span>
                        </p>

                        <h3>How you can control Cookies</h3>

                        <p>{t('privacy-p13')}</p>

                        <ul>
                            <li>
                                <strong>- Chrome</strong>
                            </li>
                            <li>
                                <strong>- Safari</strong>
                            </li>
                            <li>
                                <strong>- Internet Explorer</strong>
                            </li>
                            <li>
                                <strong>- Mozilla</strong>
                            </li>
                        </ul>

                        <p>{t('privacy-p14')}</p>

                        <p>{t('privacy-p15')}</p>

                        <h2>Your Rights</h2>

                        <p>{t('privacy-p16')}</p>

                        <p>{t('privacy-p17')}</p>

                        <h3>California Privacy Rights</h3>

                        <p>
                            <span>
                                <Trans
                                    i18nKey="privacy-p18"
                                    components={{ 1: <strong /> }}
                                />
                            </span>
                            <span>
                                <Trans
                                    i18nKey="privacy-p19"
                                    components={{ 1: <strong /> }}
                                />
                            </span>
                        </p>

                        <h3>Minors and Children</h3>

                        <p>
                            The Platform is not intended for use by children
                            under the age of 18, and we do not knowingly collect
                            Personal Information from children under the age of
                            13. If we learn we collected Personal Information
                            from a child under 13 we will delete that
                            information from our files.
                        </p>

                        <h2>Third-Party Links and Services</h2>

                        <p>
                            Our Policy only applies to our Platform and does not
                            apply to third-party websites or services because we
                            do not control those third parties. We are not
                            responsible for the privacy practices or content of
                            third-party websites. We encourage you to review the
                            privacy policies of those third-party sites to learn
                            about their practices or what rights you may have.
                        </p>

                        <h2>The Digital Millennium Copyright Act</h2>

                        <p>
                            The Digital Millennium Copyright Act (DMCA) sets
                            forth a Notification and Counter Notification
                            process initiated by a party complaining of alleged
                            copyright infringement on the SuperRare Platform. We
                            may share information of
                            the notifying, counter-notifying party, and any
                            involved third parties, such as a Collector, of an
                            allegedly infringing artwork to facilitate
                            communication between the relevant parties for the
                            purposes of complying with or resolving a DMCA
                            dispute or allegation of copyright infringement.
                        </p>

                        <h2>Important Limitations</h2>

                        <p>Nothing in this Policy restricts our ability to:</p>

                        <ul>
                            <li>
                                - Comply with applicable law, rules, or
                                regulations, including the DMCA;
                            </li>
                            <li>
                                - Comply with a civil, criminal, or regulatory
                                inquiry, investigation, subpoena, or lawful
                                court order;
                            </li>
                            <li>
                                - Cooperate with law enforcement agencies about
                                conduct we reasonably and in good faith believe
                                may violate the law;
                            </li>
                            <li>- Protect our rights or our property;</li>
                            <li>- Enforce our Terms of Service; or,</li>
                            <li>
                                - Prevent behavior that is (or that we think may
                                be) illegal or unethical.
                            </li>
                        </ul>

                        <h2>Changes to this Policy</h2>

                        <p>
                            Our commitment to preserving your privacy will not
                            change, but our Platform may evolve. The effective
                            date of each version is identified above. If we make
                            material changes to this Privacy Policy, we will use
                            reasonable means to inform you and, where necessary,
                            obtain your consent.
                        </p>

                        <h2>Questions*</h2>

                        <p>
                            If you have questions about this Policy or how we
                            treat your Personal Information, please contact us
                            at hello@superrare.com.
                        </p>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
