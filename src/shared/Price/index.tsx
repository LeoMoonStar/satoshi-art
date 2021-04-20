import React from 'react'
import { useSelector } from 'react-redux'
import { ethToUsdRateSelector } from 'state/app/selectors'

import { AppState } from 'state'
import { weiToEth } from 'utils/helpers'

const getEthByWie = (value: string | number): number => {
    return Number(weiToEth(Number(value)))
}

const fixNumber = (value: string | number, chartAfterDot = 4) => {
    return Number(Number(value).toFixed(chartAfterDot))
}

const WeiToUsd = ({
    value,
    renderBefore = '$',
}: {
    value: number | string
    renderBefore?: React.ReactNode
}): JSX.Element | null => {
    const currency = useSelector<AppState, number>(ethToUsdRateSelector)

    if (!currency) return null

    return (
        <>
            {renderBefore}
            {fixNumber(getEthByWie(value) * currency)}
        </>
    )
}

const WeiToEth = ({
    value,
    renderAfter = 'ETH',
}: {
    value: number | string
    renderAfter?: React.ReactNode
}): JSX.Element => (
    <>
        {fixNumber(getEthByWie(value))}
        {renderAfter}
    </>
)

const Price = {
    WeiToUsd,
    WeiToEth,
}

export default Price
