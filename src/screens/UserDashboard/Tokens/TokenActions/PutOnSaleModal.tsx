import React from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { FormControl, Input, InputLabel } from '@material-ui/core'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import Button from 'shared/Button'
import Modal from 'shared/Modal'
import useStyles from './Modals.style'
import { TokenType } from 'state/transactions/actions'

type PutOnSaleModalProps = {
    onClose: () => void
    onSubmit: () => void
    type: TokenType
    copiesCount?: number
}

interface PutOnSaleForm {
    price: number
    copiesCount?: number
}

const schema = yup.object().shape({
    price: yup
        .number()
        .required('You need to enter the price')
        .typeError('"Price" must be a number'),
    copiesCount: yup.number().typeError('You need to enter number'),
})

export default function PutOnSaleModal({
    onClose,
    onSubmit,
    type,
    copiesCount,
}: PutOnSaleModalProps): JSX.Element {
    const classes = useStyles()
    const { t } = useTranslation()
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<PutOnSaleForm>({
        resolver: yupResolver(schema),
    })

    const onFormSubmit = (data: PutOnSaleForm) => {
        console.log(data)
    }

    //got typescript error if pass e: React.ChangeEvent<HTMLInputElement>: Argument of type 'string' is not assignable to parameter of type '"price" | "copiesCount"'
    const handlePriceInput = (e: any) => {
        // setValue(e.target.name, e.target.value.split(/\D/).join(''))
        let index = 0
        setValue(
            e.target.name,
            e.target.value
                .replace(/[^\d.,]/g, '') //replace everything but valid symbols
                .replace(/,/g, '.') // replace comma to dot
                .replace(/\./g, (item: string) => (!index++ ? item : '')) // replace all but the first occurence of dot
        )
    }

    const handleNumberInput = (e: any) => {
        setValue(e.target.name, e.target.value.split(/\D/).join(''))
    }

    return (
        <Modal open className={classes.modal} onClose={onClose}>
            <form
                className={classes.container}
                onSubmit={handleSubmit(onFormSubmit)}
            >
                <h2 className={classes.title}>{t('putOnSale')}</h2>
                <FormControl className={classes.fieldGroup}>
                    <InputLabel shrink htmlFor="price">
                        {t('instantSalePrice')}
                    </InputLabel>
                    <Input
                        inputRef={register}
                        name="price"
                        onChange={handlePriceInput}
                        id="price"
                        placeholder="1"
                        endAdornment={
                            <div className={classes.priceValueType}>ETH</div>
                        }
                    />
                    {errors.price && (
                        <p className={classes.textError}>
                            {errors.price.message}
                        </p>
                    )}
                </FormControl>
                {type === TokenType.MULTIPLE && copiesCount && (
                    <FormControl className={classes.fieldGroup}>
                        <InputLabel shrink htmlFor="quantity">
                            {t('enterQuantity')}{' '}
                            <small>
                                ({t('countAvailable', { count: copiesCount })})
                            </small>
                        </InputLabel>
                        {/*@TODO: add validation that not allow user to put more tokens than he has*/}
                        <Input
                            inputRef={register}
                            name="copiesCount"
                            onChange={handleNumberInput}
                            id="quantity"
                            placeholder="1"
                        />
                        {errors.copiesCount && (
                            <p className={classes.textError}>
                                {errors.copiesCount.message}
                            </p>
                        )}
                    </FormControl>
                )}
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
                        type="submit"
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
