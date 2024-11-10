import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const PieChart = ({ data }) => {
    const aggregatedData = data.reduce((acc, item) => {
        const title = item.title.substring(0, 10);


        if (title === "New Tab") return acc;

        if (acc[title]) {
            acc[title].visitCount += item.visitCount;
        } else {
            acc[title] = { ...item, visitCount: item.visitCount };
        }
        return acc;
    }, {});


    const chartData = {
        labels: Object.keys(aggregatedData),
        datasets: [
            {
                label: 'Visit Count',
                data: Object.values(aggregatedData).map(item => item.visitCount),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                    'rgba(0, 128, 128, 0.6)',
                    'rgba(128, 0, 128, 0.6)',
                    'rgba(255, 69, 0, 0.6)',
                    'rgba(60, 179, 113, 0.6)',
                    'rgba(100, 149, 237, 0.6)',
                    'rgba(123, 104, 238, 0.6)',
                    'rgba(255, 140, 0, 0.6)',
                    'rgba(144, 238, 144, 0.6)',
                    'rgba(255, 20, 147, 0.6)',
                    'rgba(139, 69, 19, 0.6)',

                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(0, 128, 128, 1)',
                    'rgba(128, 0, 128, 1)',
                    'rgba(255, 69, 0, 1)',
                    'rgba(60, 179, 113, 1)',
                    'rgba(100, 149, 237, 1)',
                    'rgba(123, 104, 238, 1)',
                    'rgba(255, 140, 0, 1)',
                    'rgba(144, 238, 144, 1)',
                    'rgba(255, 20, 147, 1)',
                    'rgba(139, 69, 19, 1)',

                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Visit Count of websites',
            },
        },
    };

    return (
        <div className='w-100 h-100 d-flex justify-content-center'>
            <div className="w-50 h-50">
                <Pie data={chartData} options={options} />
            </div>
        </div>
    );
};

export default PieChart;
