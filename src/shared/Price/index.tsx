import React from 'react'
import { useSelector } from 'react-redux'
import { ethToUsdRateSelector } from 'state/app/selectors'

import { AppState } from 'state'
import { weiToEth } from 'utils/helpers'
import { SERVICE_FEE } from 'constants/common'

const getEthByWie = (value: string | number): number => {
    return Number(weiToEth(Number(value)))
}

const fixNumber = (value: string | number, chartAfterDot = 4) => {
    return Number(Number(value).toFixed(chartAfterDot))
}

const ifTrueValueToFee = (isFee: boolean, value: number) => {
    return isFee ? value * (1 + SERVICE_FEE) : value
}

const WeiToUsd = ({
    value,
    withFee = false,
    renderBefore = '$',
}: {
    value: number | string
    withFee?: boolean
    renderBefore?: React.ReactNode
}): JSX.Element | null => {
    const currency = useSelector<AppState, number>(ethToUsdRateSelector)

    if (!currency) return null

    return (
        <>
            {renderBefore}
            {fixNumber(
                ifTrueValueToFee(withFee, getEthByWie(value) * currency)
            )}
        </>
    )
}

const WeiToEth = ({
    value,
    withFee = false,
    renderAfter = 'ETH',
}: {
    value: number | string
    withFee?: boolean
    renderAfter?: React.ReactNode
}): JSX.Element => (
    <>
        {fixNumber(ifTrueValueToFee(withFee, getEthByWie(value)))}
        {renderAfter}
    </>
)

const Price = {
    WeiToUsd,
    WeiToEth,
}

export default Price
