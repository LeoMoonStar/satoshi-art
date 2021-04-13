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

    const { t } = useTranslation(['terms', 'translation'])
    const handleGoBack = () => history.push('/')

    return (
        <Layout>
            <div className={classes.container}>
                <Button className={classes.backBtn} onClick={handleGoBack}>
                    <LeftArrowIcon /> {t('translation:backToHomePage')}
                </Button>
                <div className={classes.contentContainer}>
                    <h1>{t('terms:title')}</h1>
                    <div className={classes.lastUpdated}>
                        {t('terms:lastUpdate')}
                    </div>
                    <b>{t('terms:warning')}</b>
                    <br />
                    <br />
                    <ul>
                        <li>
                            <h2>{t('terms:title1')}</h2>
                            <p className={classes.whiteSpacePerLine}>
                                {t('terms:text1')}
                            </p>
                        </li>

                        <li>
                            <h2>{t('terms:title2')}</h2>
                            <p className={classes.whiteSpacePerLine}>
                                {t('terms:text2')}
                            </p>
                        </li>
                        <li>
                            <h2>{t('terms:title3')}</h2>
                            <div className={classes.list}>
                                <Trans
                                    i18nKey="terms:text3"
                                    components={{
                                        p: <p />,
                                        i: <i />,
                                        span: <span />,
                                    }}
                                />
                            </div>
                        </li>
                        <li>
                            <h2>{t('terms:title4')}</h2>
                            <div className={classes.list}>
                                <Trans
                                    i18nKey="terms:text4"
                                    components={{
                                        p: <p />,
                                        i: <i />,
                                        span: <span />,
                                    }}
                                />
                            </div>
                        </li>
                        <li>
                            <h2>{t('terms:title5')}</h2>
                            <div className={classes.list}>
                                <Trans
                                    i18nKey="terms:text5"
                                    components={{
                                        p: <p />,
                                        i: <i />,
                                    }}
                                />
                            </div>
                        </li>
                        <li>
                            <h2>{t('terms:title6')}</h2>
                            <div className={classes.list}>
                                <Trans
                                    i18nKey="terms:text6"
                                    components={{
                                        p: <p />,
                                        i: <i />,
                                    }}
                                />
                            </div>
                        </li>
                        <li>
                            <h2>{t('terms:title7')}</h2>
                            <div className={classes.list}>
                                <Trans
                                    i18nKey="terms:text7"
                                    components={{
                                        p: <p />,
                                        i: <i />,
                                    }}
                                />
                            </div>
                        </li>
                        <li>
                            <h2>{t('terms:title8')}</h2>
                            <div className={classes.list}>
                                <Trans
                                    i18nKey="terms:text8"
                                    components={{
                                        p: <p />,
                                        i: <i />,
                                        span: <span />,
                                    }}
                                />
                            </div>
                        </li>
                        <li>
                            <h2>{t('terms:title9')}</h2>
                            <div className={classes.list}>
                                <Trans
                                    i18nKey="terms:text9"
                                    components={{
                                        p: <p />,
                                        i: <i />,
                                        span: <span />,
                                        br: <br />,
                                    }}
                                />
                            </div>
                        </li>
                        <li>
                            <h2>{t('terms:title10')}</h2>
                            <div className={classes.list}>
                                <Trans
                                    i18nKey="terms:text10"
                                    components={{
                                        p: <p />,
                                        i: <i />,
                                        span: <span />,
                                        br: <br />,
                                    }}
                                />
                            </div>
                        </li>
                        <li>
                            <h2>{t('terms:title11')}</h2>
                            <div className={classes.list}>
                                <Trans
                                    i18nKey="terms:text11"
                                    components={{
                                        p: <p />,
                                        i: <i />,
                                        span: <span />,
                                        br: <br />,
                                    }}
                                />
                            </div>
                        </li>
                        <li>
                            <h2>{t('terms:title12')}</h2>
                            <div className={classes.list}>
                                <Trans
                                    i18nKey="terms:text12"
                                    components={{
                                        p: <p />,
                                        i: <i />,
                                        span: <span />,
                                        br: <br />,
                                    }}
                                />
                            </div>
                        </li>
                        <li>
                            <h2>{t('terms:title13')}</h2>
                            <div className={classes.list}>
                                <Trans
                                    i18nKey="terms:text13"
                                    components={{
                                        p: <p />,
                                        i: <i />,
                                        span: <span />,
                                        br: <br />,
                                    }}
                                />
                            </div>
                        </li>
                        <li>
                            <h2>{t('terms:title14')}</h2>
                            <div className={classes.list}>
                                <Trans
                                    i18nKey="terms:text14"
                                    components={{
                                        p: <p />,
                                        i: <i />,
                                        span: <span />,
                                        br: <br />,
                                        u: <u />,
                                    }}
                                />
                            </div>
                        </li>
                    </ul>
                </div>
                <div className={classes.centeredTextWithSpace}>
                    <b>{t('endOfAgreement')}</b>
                </div>
            </div>
        </Layout>
    )
}
