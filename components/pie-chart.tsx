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
    const presetColors: { [key: string]: string } = {
        'Pendle': '#1E4480',
        'Dolomite': '#B2B3B3',
        'Notional Finance': '#003643',
        'Overnight Finance': '#8C8DFC',
        'Moby': '#E6FF85',
        'Gas.zip': '#3A6EA5',
        'Other': '#FF9F40'
    };

    const defaultColors = [
        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
        '#4CAF50', '#E91E63', '#9C27B0', '#795548'
    ];

    const getColor = (name: string, index: number) => {
        return presetColors[name] || defaultColors[index % defaultColors.length];
    };

    const chartData = {
        labels: data.map((item) => item.NAME),
        datasets: [
            {
                data: data.map((item) => item[yaxis as keyof typeof item]),
                backgroundColor: data.map((item, index) => getColor(item.NAME, index)),
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