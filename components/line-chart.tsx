"use client";

import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer, ReferenceLine } from 'recharts';
import moment from 'moment';
import numeral from 'numeral';
import { TooltipProps } from 'recharts';

type DataItem = {
    [key: string]: string;
};

interface LineChartProps {
    data: DataItem[];
    yaxis: string;
    usd: boolean;
    fill: string;
    date_label?: string;
}

const formatDate = (date: string) => {
    return moment(date, 'YYYY-MM-DD').format('DD-MMM-YYYY');
};

const CustomTooltip: React.FC<TooltipProps<any, any>> = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip" style={{ backgroundColor: '#fff', padding: '5px', border: '1px solid #ccc' }}>
                <p className="label">{`${moment(label, 'YY-MM-DD').format('DD-MMM-YYYY')}`}</p>
                <p style={{ color: '#8884d8' }}>{`VALUE: ${payload[0].value}`}</p>
            </div>
        );
    }

    return null;
};

const LChart: React.FC<LineChartProps> = ({ data, yaxis, usd, fill, date_label }) => {

    const transformedData = data.map(item => ({
        ...item,
        [yaxis]: parseFloat(item[yaxis])
    }));

    const formatYAxisTick = (value: number) => {
        return numeral(value).format('0a'); // Formats the tick value
    };

    const axisLabelStyle = {
        fontSize: '0.8rem' // Adjust the font size as needed
    };

    // Function to find the closest date
    const findClosestDate = () => {
        if (!date_label) return null;
        const labelDate = moment(date_label, 'MM/DD/YYYY');
        let closestDate = null;
        let smallestDiff = Infinity;

        transformedData.forEach(item => {
            const currentDate = moment(item.DATE, 'YYYY-MM-DD');
            const diff = Math.abs(labelDate.diff(currentDate));
            if (diff < smallestDiff) {
                smallestDiff = diff;
                closestDate = item.DATE;
            }
        });

        return closestDate;
    };

    const closestDate = findClosestDate();

    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={transformedData}>
                <CartesianGrid vertical={false} horizontal={true} strokeDasharray="3 3" stroke="black" />
                <XAxis dataKey="DATE"
                    tick={{ style: axisLabelStyle }}
                    tickFormatter={formatDate}
                    stroke="#000000"
                    tickLine={false}
                    axisLine={false} />
                <YAxis
                    domain={[0, 'dataMax']}
                    tick={{ style: axisLabelStyle }}
                    tickFormatter={(value) =>
                        usd ? `$${formatYAxisTick(value)}` : formatYAxisTick(value)
                    }
                    stroke="#000000"
                    tickLine={false}
                    axisLine={false}
                />
                <Tooltip />
                <Line type="monotone" dataKey={yaxis} stroke={fill} />
                {closestDate && (
                    <ReferenceLine x={closestDate} stroke="red" strokeWidth={2} />
                )}
            </LineChart>
        </ResponsiveContainer>
    );
};

export default LChart;