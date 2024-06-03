"use client";

import { Line, LineChart, Tooltip, Legend, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from "recharts";
import moment from 'moment';
import numeral from 'numeral';

type DataEntry = {
    BUNDLER_NAME: string;
    DATE: string;
    NUM_ACCOUNTS?: number;
    NUM_BUNDLES?: number;
    [key: string]: string | number | undefined;
};

interface SBChartProps {
    data: DataEntry[];
    xaxis: string;
    yaxis: string;
    segment: string;
    usd: boolean;
}

type TransformedEntry = {
    DATE: string;
    [key: string]: string | number;
};

export function MultiLineChart({ data, xaxis, yaxis, segment, usd }: SBChartProps) {

    const transformData = (data: DataEntry[]) => {
        const transformed: { [date: string]: TransformedEntry } = {};

        data.forEach((entry) => {
            const formattedDate = moment(entry.DATE, 'YYYY-MM-DD').format('DD-MMM-YYYY').toUpperCase();
            if (!transformed[formattedDate]) {
                transformed[formattedDate] = {
                    DATE: formattedDate
                };
            }

            // Check if the keys exist in the entry object
            if (entry.hasOwnProperty(segment) && entry.hasOwnProperty(yaxis)) {
                const segmentKey = entry[segment] as string; // Cast to string because we know it exists
                const yAxisValue = entry[yaxis] as number; // Cast to number because we know it exists

                transformed[formattedDate][segmentKey] = yAxisValue;
            }
        });

        return Object.values(transformed);
    };


    const transformedData = transformData(data);

    const formatYAxisTick = (value: number) => {
        return numeral(value).format('0[.]0a'); // Formats the tick value
    };

    const getMaxValue = (data: TransformedEntry[]) => {
        let maxValue = 0;
        data.forEach((entry) => {
            Object.keys(entry).forEach((key) => {
                if (key !== 'DATE' && entry[key] !== undefined) {
                    maxValue = Math.max(maxValue, entry[key] as number);
                }
            });
        });
        return maxValue;
    };

    const maxValue = getMaxValue(transformedData);

    return (
        <ResponsiveContainer width="100%" height={350}>
            <LineChart data={transformedData}>
                <CartesianGrid vertical={false} horizontal={true} strokeDasharray="3 3" stroke="black" />
                <XAxis
                    dataKey={xaxis}
                    stroke="#000000"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                <YAxis
                    stroke="#000000"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={formatYAxisTick}
                    domain={[0, maxValue * 1.06]}
                />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="grantees" stroke="#d1345b" />
                {/* "#d1345b" */}
                <Line type="monotone" dataKey="total" stroke="#1044AD" />
            </LineChart>
        </ResponsiveContainer>
    );
}
