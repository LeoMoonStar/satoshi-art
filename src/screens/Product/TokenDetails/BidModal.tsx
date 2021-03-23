import React from 'react'
import { useTranslation, Trans } from 'react-i18next'
import { FormControl, InputLabel, Input, Button } from '@material-ui/core'

import Modal from 'shared/Modal'
import useStyles from './Modals.style'

type BidModalProps = {
    onClose: () => void
}

export default function BidModal({ onClose }: BidModalProps): JSX.Element {
    const classes = useStyles()
    const { t } = useTranslation()

    return (
        <Modal open className={classes.modal} onClose={onClose}>
            <form className={classes.container}>
                <h2 className={classes.title}>{t('placeABid')}</h2>
                <div className={classes.intro}>
                    <Trans
                        i18nKey="youAreAboutToPlaceABidFor"
                        values={{
                            name:
                                'Invisible Doge | #0038 Weensy  Card Collection',
                            author: 'Weensy',
                        }}
                        components={{ 1: <b /> }}
                    />
                </div>
                <FormControl className={classes.fieldGroup}>
                    <InputLabel shrink htmlFor="bid">
                        {t('yourBid')}
                    </InputLabel>
                    <Input id="bid" placeholder="0.2" />
                    <div className={classes.inputHelpText}>ETH</div>
                </FormControl>

                <FormControl className={classes.fieldGroup}>
                    <InputLabel shrink htmlFor="quantity">
                        {t('enterQuantity')}{' '}
                        <small>({t('countAvailable', { count: 24 })})</small>
                    </InputLabel>
                    <Input id="quantity" placeholder="1" />
                </FormControl>
                <ul className={classes.additionalInfo}>
                    <li>
                        {t('yourBalance')} <b>0.237 ETH</b>
                    </li>
                    <li>
                        {t('serviceFee')} <b>0.005 ETH</b>
                    </li>
                    <li>
                        {t('totalBidAmount')}
                        <b>0.205 ETH</b>
                    </li>
                </ul>
                <div className={classes.buttons}>
                    <Button className={classes.buttonFilled}>
                        {t('placeABid')}
                    </Button>
                    <Button
                        className={classes.buttonOutlined}
                        onClick={onClose}
                    >
                        {t('cancel')}
                    </Button>
                </div>
            </form>
        </Modal>
    )
}
