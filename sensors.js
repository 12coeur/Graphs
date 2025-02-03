var accelCtx = document.getElementById('accelerometerChart').getContext('2d');
var gyroCtx = document.getElementById('gyroscopeChart').getContext('2d');

var accelChart = new Chart(accelCtx, {
    type: 'bar',
    data: {
        labels: ['Accéléromètre X', 'Accéléromètre Y', 'Accéléromètre Z'],
        datasets: [{
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
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            },
            x: {
                display: true // Afficher les libellés sur l'axe X
            }
        },
        plugins: {
            legend: {
                display: false // Retirer les libellés de la légende
            }
        }
    }
});

var gyroChart = new Chart(gyroCtx, {
    type: 'bar',
    data: {
        labels: ['Gyroscope X', 'Gyroscope Y', 'Gyroscope Z'],
        datasets: [{
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
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            },
            x: {
                display: true // Afficher les libellés sur l'axe X
            }
        },
        plugins: {
            legend: {
                display: false // Retirer les libellés de la légende
            }
        }
    }
});

function toBinary(value) {
    return value >= 0 ? 1 : -1;
}

function updateChart(chart, dataIndex, value) {
    let binaryValue = toBinary(value);
    chart.data.datasets[0].data[dataIndex] = binaryValue;
    chart.update();
}

if ('Accelerometer' in window) {
    let accelerometer = new Accelerometer({ frequency: 60 });
    accelerometer.addEventListener('reading', () => {
        console.log(`Accéléromètre lecture: X=${accelerometer.x}, Y=${accelerometer.y}, Z=${accelerometer.z}`);
        updateChart(accelChart, 0, accelerometer.x);
        updateChart(accelChart, 1, accelerometer.y);
        updateChart(accelChart, 2, accelerometer.z);
    });
    accelerometer.start();
} else {
    console.log('L\'API Accéléromètre n\'est pas disponible.');
}

if ('Gyroscope' in window) {
    let gyroscope = new Gyroscope({ frequency: 60 });
    gyroscope.addEventListener('reading', () => {
        console.log(`Gyroscope lecture: X=${gyroscope.x}, Y=${gyroscope.y}, Z=${gyroscope.z}`);
        updateChart(gyroChart, 0, gyroscope.x);
        updateChart(gyroChart, 1, gyroscope.y);
        updateChart(gyroChart, 2, gyroscope.z);
    });
    gyroscope.start();
} else {
    console.log('L\'API Gyroscope n\'est pas disponible.');
}
