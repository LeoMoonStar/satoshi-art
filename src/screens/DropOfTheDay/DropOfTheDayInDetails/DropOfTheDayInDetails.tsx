import React from 'react'
import { useTranslation } from 'react-i18next'

import detail1 from 'shared/images/dropOfTheDay/detail1.svg'
import detail2 from 'shared/images/dropOfTheDay/detail2.svg'
import detail3 from 'shared/images/dropOfTheDay/detail3.svg'

import useStyles from './DropOfTheDayInDetails.style'

export default function DropOfTheDayInDetails(): JSX.Element {
    const classes = useStyles()
    const { t } = useTranslation()

    return (
        <section className={classes.container}>
            <div className={classes.row}>
                <div className={classes.iconWrap}>
                    <img src={detail1} alt="" />
                </div>
                <div className={classes.info}>
                    <h2 className={classes.title}>{t('auctionDetails')}</h2>
                    <div className={classes.content}>
                        {t('auctionDetailsContent')}
                    </div>
                </div>
            </div>
            <div className={classes.row}>
                <div className={classes.iconWrap}>
                    <img src={detail2} alt="" />
                </div>
                <div className={classes.info}>
                    <h2 className={classes.title}>{t('howToBuy')}</h2>
                    <div className={classes.content}>
                        {t('howToBuyContent')}
                        <br />
                        <br />
                        <span
                            dangerouslySetInnerHTML={{
                                __html: t('howToBuyAdditionalContent'),
                            }}
                        />
                    </div>
                </div>
            </div>
            <div className={classes.row}>
                <div className={classes.iconWrap}>
                    <img src={detail3} alt="" />
                </div>
                <div className={classes.info}>
                    <h2 className={classes.title}>
                        {t('authenticVerification')}
                    </h2>
                    <div className={classes.content}>
                        {t('authenticVerificationContent')}
                    </div>
                </div>
            </div>
        </section>
    )
}
