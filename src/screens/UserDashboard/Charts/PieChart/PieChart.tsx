import React, { useState, useRef } from 'react'
import { PieChart, Pie, ResponsiveContainer } from 'recharts'
import { useTranslation } from 'react-i18next'

import Checkbox from 'shared/Checkbox'

import useStyles from './PieChart.style'
import { DotsIcon } from 'shared/icons'
import { PriceIcon, TransferIcon } from 'shared/icons/dashboard'
import IconButton from '@material-ui/core/IconButton'
import { Popover } from '@material-ui/core'

const items = [
    { value: 81, color: '#FF0099', subTitle: 'totalOrder' },
    { value: 22, color: '#00C2FF', subTitle: 'customerGrowth' },
    { value: 62, color: '#FFE600', subTitle: 'totalRevenue' },
]

type PieCardProps = {
    color: string
    value: number
    subTitle: string
}

const PieCard = ({ color, value, subTitle }: PieCardProps) => {
    const { t } = useTranslation()

    const data = [
        { value: 100 - value, fill: `${color}15` },
        { value: value, fill: color },
    ]

    return (
        <>
            <ResponsiveContainer width="100%" aspect={1}>
                <PieChart startAngle={0}>
                    <text stroke="#000" fontWeight={300} y={65} x={45}>
                        {value}%
                    </text>
                    <Pie
                        data={data}
                        innerRadius={30}
                        outerRadius={57}
                        startAngle={90}
                        endAngle={470}
                        fill="#FF0099"
                        dataKey="value"
                    />
                </PieChart>
            </ResponsiveContainer>
            <b>{t(subTitle)}</b>
        </>
    )
}

export default function PieCharts(): JSX.Element {
    const classes = useStyles()
    const anchorElRef = useRef()
    const [isOpen, setOpen] = useState<boolean>(false)
    const { t } = useTranslation()

    return (
        <div className={classes.container}>
            <div className={classes.head}>
                <div className={classes.intro}>
                    <h3 className={classes.mainTitle}>{t('pieChart')}</h3>
                </div>
                <div className={classes.checkboxGroup}>
                    <label htmlFor="chart">
                        <Checkbox id="chart" />
                        {t('chart')}
                    </label>
                    <label htmlFor="showValue">
                        <Checkbox id="showValue" />
                        {t('showValue')}
                    </label>
                    <IconButton
                        className={classes.showMoreButton}
                        buttonRef={anchorElRef}
                        onClick={() => setOpen(!isOpen)}
                    >
                        <div style={{ transform: 'rotateZ(90deg)' }}>
                            <DotsIcon />
                        </div>
                        <Popover
                            anchorEl={anchorElRef?.current}
                            classes={{
                                paper: classes.controlsPaper,
                            }}
                            open={isOpen}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            onClose={() => setOpen(false)}
                            disableRestoreFocus
                        >
                            <div className={classes.controlsButtons}>
                                <button type="button">
                                    <div>
                                        <PriceIcon />
                                    </div>
                                    First action
                                </button>
                                <button type="button">
                                    <div>
                                        <TransferIcon />
                                    </div>
                                    Second action
                                </button>
                            </div>
                        </Popover>
                    </IconButton>
                </div>
            </div>
            {items.map((data, index) => (
                <div className={classes.col} key={index}>
                    <PieCard
                        color={data.color}
                        value={data.value}
                        subTitle={data.subTitle}
                    />
                </div>
            ))}
        </div>
    )
}
