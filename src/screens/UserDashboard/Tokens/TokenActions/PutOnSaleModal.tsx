import React, { useEffect, useState, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { AppState } from 'state'
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
import { TokenType } from 'state/transactions/actions'
import { ethToUsdRateSelector } from 'state/app/selectors'
import { Satoshi721ABI, useSmartContractNetworkData } from 'utils/erc721'
import {
    Engine1155ABI,
    Satoshi1155ABI,
    use1155EngineSmartContractNetworkData,
    use1155SmartContractNetworkData,
} from 'utils/erc1155'
import {
    convertEthToUsd,
    convertStringToNumber,
    etherToWei,
} from 'utils/helpers'
import { putTokenOnSaleAPI, Token } from 'api/tokens'

import PutOnSaleProgressModal from './PutOnSaleProgressModal'
import useStyles from './Modals.style'

type PutOnSaleModalProps = {
    onClose: () => void
    token: Token
    onSuccess: () => void
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
    onSuccess,
}: PutOnSaleModalProps): JSX.Element {
    const classes = useStyles()
    const { t } = useTranslation()
    const { account, library, chainId } = useWeb3React<Web3Provider>()
    const erc721NetworkData = useSmartContractNetworkData(chainId)
    const erc1155NetworkData = use1155SmartContractNetworkData(chainId)
    const engine1155NetworkData = use1155EngineSmartContractNetworkData(chainId)
    const currency = useSelector<AppState, number>(ethToUsdRateSelector)
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<PutOnSaleForm>({
        resolver: yupResolver(schema),
    })
    const [singleContract, setSingleContract] = useState<any>()
    const [erc1155contract, setErc1155contract] = useState<any>()
    const [engine1155contract, setEngine1155contract] = useState<any>()
    const [putOnSaleError, setPutOnSaleError] = useState<string>('')
    const [approvalError, setApprovalError] = useState<string>('')
    const [formData, setFormData] = useState<PutOnSaleForm | null>(null)
    const [isInProgress, setInProgress] = useState<boolean>(false)
    const [activeProgressStep, setActiveStep] = useState<number>(0)
    const [isPutOnSaleInProgress, setPutOnSaleInProgress] = useState<boolean>(
        false
    )
    const [isApprovalInProgress, setApprovalInProgress] = useState<boolean>(
        false
    )
    const [isApproved, setIsApproved] = useState<boolean>(false)

    const isSingle = token.metadata.type === TokenType.SINGLE
    const isNeedToApprove =
        token.metadata.type === TokenType.MULTIPLE && !isApproved

    //@TODO: probably we need to move out these contracts instance creation to a separate hook or smth else, any ideas?
    useEffect(() => {
        if (isSingle) {
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
                    engine1155NetworkData.address,
                    Engine1155ABI,
                    library.getSigner()
                )
                setEngine1155contract(engine1155Contract)
                const erc1155Contract = new Contract(
                    erc1155Address,
                    Satoshi1155ABI,
                    library.getSigner()
                )
                setErc1155contract(erc1155Contract)
            }
        }
    }, [library, chainId, erc1155NetworkData, engine1155NetworkData, isSingle])

    const putTokenOnSaleBlockchain = async (data: PutOnSaleForm) => {
        const priceInWei = etherToWei(data.price)
        const tokenId = convertStringToNumber(token.TokenID)
        if (isSingle) {
            const putSingleTokenOnSaleResponse = await singleContract.putOnSale(
                tokenId,
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
            tokenId,
            data.copiesCount,
            priceInWei,
            { from: account }
        )
        return {
            price: priceInWei,
            response: putMultipleOnSaleResponse,
        }
    }

    const tryPutOnSale = async (data: PutOnSaleForm | null) => {
        if (!chainId) {
            return
        }
        setPutOnSaleInProgress(true)
        try {
            if (data) {
                const { response, price } = await putTokenOnSaleBlockchain(data)
                await putTokenOnSaleAPI({
                    id: token.id,
                    tx_hash: response.hash,
                    price,
                    copiesOnSale: data.copiesCount,
                    offerIndex: response.value?.toNumber(),
                })
                onSuccess()
                onClose()
            }
        } catch (err) {
            const serverError = err?.data?.message
            const metamaskError = err?.message

            if (serverError || metamaskError) {
                setPutOnSaleError(serverError || metamaskError)
                return
            }

            throw err
        }
    }

    const setApprovalForAllBlockchain = async () => {
        setApprovalInProgress(true)
        try {
            await erc1155contract.setApprovalForAll(
                engine1155contract.address,
                true,
                {
                    from: account,
                }
            )
            setActiveStep(1)
        } catch (e) {
            setApprovalInProgress(false)
            setApprovalError(e.message)
        } finally {
            setApprovalInProgress(false)
        }
    }

    const checkIsApprovedForAllBlockchain = useCallback(async () => {
        if (engine1155contract) {
            const isApproved = await erc1155contract.isApprovedForAll(
                account,
                engine1155contract.address
            )
            setIsApproved(isApproved)
        }
    }, [account, engine1155contract, erc1155contract])

    useEffect(() => {
        checkIsApprovedForAllBlockchain()
    }, [checkIsApprovedForAllBlockchain])

    const onFormSubmit = async (data: PutOnSaleForm) => {
        setInProgress(true)
        setFormData(data)
        if (isNeedToApprove) {
            await setApprovalForAllBlockchain()
            return
        }
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

    const handleTryApproveForAllAgain = () => {
        setApprovalError('')
        setApprovalForAllBlockchain()
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
                approvalError={approvalError}
                putOnSale={() => tryPutOnSale(formData)}
                onTryAgain={handleTryAgain}
                isNeedToApprove={isNeedToApprove}
                isApprovalInProgress={isApprovalInProgress}
                isPutOnSaleInProgress={isPutOnSaleInProgress}
                activeStep={activeProgressStep}
                onTryApproveAgain={handleTryApproveForAllAgain}
            />
        )
    }
    const price = watch('price')
    const ethAmount = price ? price - price * 0.025 : 0
    const usdAmount = price ? convertEthToUsd(price, currency) : '0.00'
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
                                count: ethAmount.toString().substring(0, 5),
                                currency: 'ETH',
                                amount: usdAmount,
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
