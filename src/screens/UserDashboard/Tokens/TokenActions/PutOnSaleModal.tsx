import React, { useEffect, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { FormControl, Input, InputLabel } from '@material-ui/core'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useWeb3React } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { Contract } from '@ethersproject/contracts'

import Button from 'shared/Button'
import Modal from 'shared/Modal'
import useStyles from './Modals.style'
import { TokenType } from 'state/transactions/actions'
import { Satoshi721ABI, useSmartContractNetworkData } from 'utils/erc721'
import {
    Engine1155ABI,
    Satoshi1155ABI,
    use1155EngineSmartContractNetworkData,
    use1155SmartContractNetworkData,
} from 'utils/erc1155'
import { etherToWei } from 'utils/helpers'
import { putTokenOnSaleAPI, Token } from 'api/tokens'
import PutOnSaleProgressModal from './PutOnSaleProgressModal'

type PutOnSaleModalProps = {
    onClose: () => void
    token: Token
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
    token,
}: PutOnSaleModalProps): JSX.Element {
    const classes = useStyles()
    const { t } = useTranslation()
    const { account, library, chainId } = useWeb3React<Web3Provider>()
    const erc721NetworkData = useSmartContractNetworkData(chainId)
    const erc1155NetworkData = use1155SmartContractNetworkData(chainId)
    const engine1155NetworkData = use1155EngineSmartContractNetworkData(chainId)
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<PutOnSaleForm>({
        resolver: yupResolver(schema),
    })
    const [singleContract, setSingleContract] = useState<any>()
    const [erc1155contract, setErc1155contract] = useState<any>()
    const [engine1155contract, setEngine1155contract] = useState<any>()
    const [putOnSaleError, setPutOnSaleError] = useState<string>('')
    const [formData, setFormData] = useState<PutOnSaleForm | null>(null)
    const [isInProgress, setInProgress] = useState<boolean>(false)
    const isSingle = token.metadata.type === TokenType.SINGLE

    //@TODO: probably we need to move out these contracts instance creation to a separate hook or smth else, any ideas?
    useEffect(() => {
        if (isSingle) {
            console.log('here')
            if (library && erc721NetworkData) {
                const address = erc721NetworkData.address
                const singleContract = new Contract(
                    address,
                    Satoshi721ABI,
                    library.getSigner()
                )
                setSingleContract(singleContract)
            }
        }
    }, [erc721NetworkData, isSingle, library])

    useEffect(() => {
        if (!isSingle) {
            if (library && erc1155NetworkData && engine1155NetworkData) {
                const erc1155Address = erc1155NetworkData.address
                const engine1155Contract = new Contract(
                    erc1155Address,
                    Engine1155ABI,
                    library.getSigner()
                )
                setEngine1155contract(engine1155Contract)
                const erc1155Contract = new Contract(
                    engine1155Contract.address,
                    Satoshi1155ABI,
                    library.getSigner()
                )
                setErc1155contract(erc1155Contract)
            }
        }
    }, [library, chainId, erc1155NetworkData, engine1155NetworkData, isSingle])

    const putTokenOnSaleBlockchain = async (data: PutOnSaleForm) => {
        const priceInWei = etherToWei(data.price)
        if (isSingle) {
            const putSingleTokenOnSaleResponse = await singleContract.putOnSale(
                token.TokenID,
                priceInWei,
                { from: account }
            )
            return {
                price: priceInWei,
                response: putSingleTokenOnSaleResponse,
            }
        }
        const putMultipleOnSaleResponse = await engine1155contract.putToSale(
            erc1155contract.address,
            token.TokenID,
            data.copiesCount,
            priceInWei,
            { from: account }
        )
        return {
            price: priceInWei,
            response: putMultipleOnSaleResponse,
        }
    }

    const tryPutOnSale = async (data: PutOnSaleForm) => {
        if (!chainId) {
            return
        }
        try {
            const { response, price } = await putTokenOnSaleBlockchain(data)
            await putTokenOnSaleAPI({
                id: token.id,
                tx_hash: response.hash,
                price,
                copiesOnSale: data.copiesCount,
            })
        } catch (e) {
            setPutOnSaleError(e.message)
        }
    }

    const onFormSubmit = async (data: PutOnSaleForm) => {
        setInProgress(true)
        setFormData(data)
        await tryPutOnSale(data)
    }

    const handlePriceInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        let index = 0
        setValue(
            e.target.name as keyof PutOnSaleForm,
            e.target.value
                .replace(/[^\d.,]/g, '') //replace everything but valid symbols
                .replace(/,/g, '.') // replace comma to dot
                .replace(/\./g, (item: string) => (!index++ ? item : '')) // replace all but the first occurence of dot
        )
    }

    const handleNumberInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(
            e.target.name as keyof PutOnSaleForm,
            e.target.value.replace(/\D/g, '')
        )
    }

    const handleTryAgain = () => {
        if (formData) {
            setPutOnSaleError('')
            tryPutOnSale(formData)
        }
    }

    if (isInProgress) {
        return (
            <PutOnSaleProgressModal
                onClose={onClose}
                putOnSaleError={putOnSaleError}
                onTryAgain={handleTryAgain}
            />
        )
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
                {token.metadata.type === TokenType.MULTIPLE &&
                    token.metadata.payload.copiesCount && (
                        <FormControl className={classes.fieldGroup}>
                            <InputLabel shrink htmlFor="quantity">
                                {t('enterQuantity')}{' '}
                                <small>
                                    {t('countAvailable', {
                                        count:
                                            token.metadata.payload.copiesCount,
                                    })}
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
