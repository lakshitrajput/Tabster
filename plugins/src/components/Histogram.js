import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Histogram = ({ data }) => {

    const aggregatedData = data.reduce((acc, item) => {
        const title = item.title.substring(0, 10);
        if (title === "New Tab") return acc;
        const totalUsedTimeInMin = item.totalUsedTime / 60;
        if (acc[title]) {
            acc[title].totalUsedTime += totalUsedTimeInMin;
        } else {
            acc[title] = { ...item, totalUsedTime: totalUsedTimeInMin };
        }
        return acc;
    }, {});

    console.log(aggregatedData);
    
    
    const chartData = {
        labels: Object.keys(aggregatedData), 
        datasets: [
            {
                label: 'Total Used Time(in min)',
                data: Object.values(aggregatedData).map(item => item.totalUsedTime),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
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
                text: 'URLs Usage Time Histogram',
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'URLs',
                },
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Total Used Time',
                },
            },
        },
        plugins: [{
            id: 'custom-x-axis-images',
            afterDraw: (chart) => {
                const { ctx, chartArea: { bottom }, scales: { x } } = chart;

                Object.values(aggregatedData).forEach((item, index) => {
                    const xPos = x.getPixelForValue(index);
                    const img = new Image();
                    img.src = item.favIconUrl || 'https://banner2.cleanpng.com/20190913/yst/transparent-chrome-icon-logo-icon-social-icon-5d7b8d87d1fba1.0463989115683782478601.jpg';

                    img.onload = () => {
                        const imgSize = 30; 
                        ctx.drawImage(img, xPos - imgSize / 2, bottom + 10, imgSize, imgSize);
                    };
                });
            }
        }]
    };

    return (
        <div style={{width:"100%"}} className='d-flex justify-content-center align-items-center'>

            <Bar data={chartData} options={options} />
        </div>
    );
};

export default Histogram;
