"use client"
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, TooltipItem } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
    data: { NAME: string;[key: string]: string | number }[];
    yaxis: string;
}

const PieChartC: React.FC<PieChartProps> = ({ data, yaxis }) => {
    const chartData = {
        labels: data.map((item) => item.NAME),
        datasets: [
            {
                data: data.map((item) => item[yaxis as keyof typeof item]),
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40',
                ],
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right' as const,
            },
            title: {
                display: true,
                text: 'Pie Chart',
            },
            tooltip: {
                callbacks: {
                    label: (context: TooltipItem<'pie'>) => {
                        const value = context.parsed as number;
                        return `${value.toFixed(2)}%`;
                    },
                },
            },
        },
    };

    return (
        <div style={{ height: '350px' }}>
            <Pie data={chartData} options={options} />
        </div>
    );
};

export default PieChartC;