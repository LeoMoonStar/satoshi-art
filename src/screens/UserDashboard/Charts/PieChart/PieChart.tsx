import React from 'react'
import { PieChart, Pie, ResponsiveContainer } from 'recharts'

import useStyles from './PieChart.style'

const data1 = [
    { name: 'Group A', value: 19, fill: '#FF009915' },
    { name: 'Group A', value: 81, fill: '#FF0099' },
]

const data2 = [
    { name: 'Group A', value: 78, fill: '#00C2FF15' },
    { name: 'Group A', value: 22, fill: '#00C2FF' },
]

const data3 = [
    { name: 'Group A', value: 38, fill: '#FFE60015' },
    { name: 'Group A', value: 62, fill: '#FFE600' },
]

export default function PieCharts(): JSX.Element {
    const classes = useStyles()

    return (
        <div className={classes.container}>
            <div className={classes.head}>
                <div className={classes.intro}>
                    <h3 className={classes.mainTitle}>Pie Chart</h3>
                </div>
            </div>
            <div className={classes.col}>
                <ResponsiveContainer width="100%" aspect={1}>
                    <PieChart startAngle={0}>
                        <Pie
                            data={data1}
                            innerRadius={30}
                            outerRadius={57}
                            startAngle={90}
                            endAngle={470}
                            fill="#FF0099"
                            dataKey="value"
                        />
                    </PieChart>
                </ResponsiveContainer>
                <b>
                    Total <br /> Order
                </b>
            </div>
            <div className={classes.col}>
                <ResponsiveContainer width="100%" aspect={1}>
                    <PieChart startAngle={0}>
                        <Pie
                            data={data2}
                            innerRadius={30}
                            outerRadius={57}
                            startAngle={90}
                            endAngle={470}
                            dataKey="value"
                        />
                    </PieChart>
                </ResponsiveContainer>
                <b>
                    Customer <br /> Growth
                </b>
            </div>
            <div className={classes.col}>
                <ResponsiveContainer width="100%" aspect={1}>
                    <PieChart startAngle={0}>
                        <Pie
                            data={data3}
                            innerRadius={30}
                            outerRadius={57}
                            startAngle={90}
                            endAngle={470}
                            dataKey="value"
                        />
                    </PieChart>
                </ResponsiveContainer>
                <b>Total Revenue</b>
            </div>
        </div>
    )
}
