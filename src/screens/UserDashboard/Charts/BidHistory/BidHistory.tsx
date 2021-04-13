import React from 'react'
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { useTranslation } from 'react-i18next'

import useStyles from './BidHistory.style'

const data = [
    {
        name: 'December',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'January',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'February',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'March',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'April',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },

    {
        name: 'May',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
    {
        name: 'June',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
    {
        name: 'July',
        uv: 6590,
        pv: 4300,
        amt: 2100,
    },
]

const CustomTooltip = ({ active }: any) => {
    const classes = useStyles()

    if (!active) {
        return null
    }

    return (
        <div className={classes.customToolTip}>
            <b className={classes.customToolTipTitle}>456 Order</b>
            <div className={classes.customToolTipDescription}>
                Oct 18th, 2020
            </div>
        </div>
    )
}

export default function BidHistory(): JSX.Element {
    const classes = useStyles()
    const { t } = useTranslation()

    return (
        <div className={classes.container}>
            <div className={classes.head}>
                <div className={classes.intro}>
                    <h3 className={classes.mainTitle}>{t('bidHistory')}</h3>
                    <div className={classes.helpText}>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Aliquid, blanditiis!
                    </div>
                </div>
            </div>
            <ResponsiveContainer width="100%" aspect={4}>
                <AreaChart
                    data={data}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <defs>
                        <linearGradient
                            id="colorUv"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                        >
                            <stop
                                offset="70%"
                                stopColor="#FF0099"
                                stopOpacity={1}
                            />
                            <stop
                                offset="98%"
                                stopColor="#fff"
                                stopOpacity={1}
                            />
                        </linearGradient>
                    </defs>
                    <XAxis strokeWidth={0} dataKey="name" />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                        type="monotone"
                        dataKey="uv"
                        strokeWidth={3}
                        stroke="#FF0099"
                        fill="url(#colorUv)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}
