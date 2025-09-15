import React, { PureComponent } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Area,
    Bar,
} from 'recharts';
import { drawerBackground, grayText, primary } from '../../constants/colors';

const data = [
    {
        name: '0',
        vested: 0,
        nonvested: 10000,
    },
    {
        name: '12 Months',
        vested: 5000,
        nonvested: 5000,
    },
    {
        name: '24 Months',
        vested: 10000,
        nonvested: 0,
    },
];

export default function VestingChart(props) {
    const isCliff = props.chartData.filter((el) => el.cliff !== undefined);
    return (
        <ResponsiveContainer
            width="100%"
            height={props.height ? props.height : '80%'}
        >
            <LineChart
                width={400}
                height={150}
                data={props.chartData}
                margin={{
                    top: 5,
                    right: 10,
                    left: 30,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" fontSize={12} />
                <YAxis fontSize={14} />
                <Tooltip itemStyle={{ fontSize: '12px' }} />
                <Legend />
                {isCliff.length > 0 && (
                    <Line
                        type="monotone"
                        // dataKey="cliff"
                        stroke={grayText}
                        // activeDot={{ r: 8 }}
                    />
                )}
                <Line
                    type="monotone"
                    dataKey="vested"
                    stroke={primary}
                    activeDot={{ r: 8 }}
                />
                <Line
                    type="monotone"
                    dataKey="nonvested"
                    stroke={drawerBackground}
                    activeDot={{ r: 8 }}
                />
            </LineChart>
        </ResponsiveContainer>
    );
}
