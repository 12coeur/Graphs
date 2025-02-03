var ctx = document.getElementById('sensorChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Accéléromètre X', 'Accéléromètre Y', 'Accéléromètre Z', 'Gyroscope X', 'Gyroscope Y', 'Gyroscope Z'],
        datasets: [
            {
                label: 'Accéléromètre',
                data: [0, 0, 0],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)', // Couleur pour X
                    'rgba(255, 159, 64, 0.2)',  // Couleur pour Y
                    'rgba(255, 205, 86, 0.2)'   // Couleur pour Z
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 205, 86, 1)'
                ],
                borderWidth: 1
            },
            {
                label: 'Gyroscope',
                data: [0, 0, 0],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)', // Couleur pour X
                    'rgba(75, 192, 192, 0.2)', // Couleur pour Y
                    'rgba(153, 102, 255, 0.2)' // Couleur pour Z
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 1
            }
        ]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

function toBinary(value) {
    return value >= 0 ? 1 : -1;
}

function updateChart(sensorType, axis, dataIndex, value) {
    let binaryValue = toBinary(value);
    document.getElementById(`${sensorType}-data-${axis}`).textContent = `${sensorType} ${axis.toUpperCase()}: ${binaryValue}`;
    
    if (sensorType === 'accelerometer') {
        myChart.data.datasets[0].data[dataIndex] = binaryValue;
    } else if (sensorType === 'gyroscope') {
        myChart.data.datasets[1].data[dataIndex - 3] = binaryValue; // indices 3, 4 et 5 pour le gyroscope
    }
    
    myChart.update();
}

if ('Accelerometer' in window) {
    let accelerometer = new Accelerometer({ frequency: 60 });
    accelerometer.addEventListener('reading', () => {
        updateChart('accelerometer', 'x', 0, accelerometer.x);
        updateChart('accelerometer', 'y', 1, accelerometer.y);
        updateChart('accelerometer', 'z', 2, accelerometer.z);
    });
    accelerometer.start();
} else {
    console.log('L\'API Accéléromètre n\'est pas disponible.');
}

if ('Gyroscope' in window) {
    let gyroscope = new Gyroscope({ frequency: 60 });
    gyroscope.addEventListener('reading', () => {
        updateChart('gyroscope', 'x', 3, gyroscope.x);
        updateChart('gyroscope', 'y', 4, gyroscope.y);
        updateChart('gyroscope', 'z', 5, gyroscope.z);
    });
    gyroscope.start();
} else {
    console.log('L\'API Gyroscope n\'est pas disponible.');
}
