import React from 'react'
import { useTranslation, Trans } from 'react-i18next'
import { FormControl, Input } from '@material-ui/core'

import Button from 'shared/Button'
import Modal from 'shared/Modal'
import useStyles from './Modals.style'

type PutOnSaleModalProps = {
    onClose: () => void
    onSubmit: () => void
}

export default function PutOnSaleModal({
    onClose,
    onSubmit,
}: PutOnSaleModalProps): JSX.Element {
    const classes = useStyles()
    const { t } = useTranslation()

    return (
        <Modal open className={classes.modal} onClose={onClose}>
            <form className={classes.container}>
                <h2 className={classes.title}>{t('putOnSale')}</h2>
                <FormControl className={classes.priceRow}>
                    <Input
                        id="price"
                        placeholder="1"
                        endAdornment={
                            <div className={classes.priceValueType}>ETH</div>
                        }
                    />
                </FormControl>
                <ul className={classes.additionalInfo}>
                    <li>
                        <Trans
                            i18nKey="putOnSaleServiceFee"
                            values={{ fee: '2.5' }}
                            components={{ b: <b /> }}
                        />
                    </li>
                    <li>
                        {/*@TODO: make function that count how much money will receive user*/}
                        <Trans
                            i18nKey="putOnSaleReceiveAmount"
                            values={{
                                count: 0,
                                currency: 'ETH',
                                amount: '0,00',
                            }}
                            components={{ b: <b /> }}
                        />
                    </li>
                </ul>
                <div className={classes.buttons}>
                    <Button
                        onClick={onSubmit}
                        variantCustom="action"
                        className={classes.buttonFilled}
                    >
                        {t('nextStep')}
                    </Button>
                    <Button
                        onClick={onClose}
                        variantCustom="outlined"
                        className={classes.cancelButton}
                    >
                        {t('cancel')}
                    </Button>
                </div>
            </form>
        </Modal>
    )
}
