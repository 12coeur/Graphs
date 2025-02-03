function initializeChart(canvasId, label) {
    var ctx = document.getElementById(canvasId).getContext('2d');
    return new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [label],
            datasets: [{
                label: `Valeur ${label}`,
                data: [0],
                backgroundColor: 'rgba(75, 152, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

let accelerometerChartX = initializeChart('accelerometerChartX', 'Accéléromètre X');
let accelerometerChartY = initializeChart('accelerometerChartY', 'Accéléromètre Y');
let accelerometerChartZ = initializeChart('accelerometerChartZ', 'Accéléromètre Z');
let gyroscopeChartX = initializeChart('gyroscopeChartX', 'Gyroscope X');
let gyroscopeChartY = initializeChart('gyroscopeChartY', 'Gyroscope Y');
let gyroscopeChartZ = initializeChart('gyroscopeChartZ', 'Gyroscope Z');

function toBinary(value) {
    return value >= 0 ? 1 : -1;
}

function updateChart(chart, elementId, value) {
    let binaryValue = toBinary(value);
    document.getElementById(elementId).textContent = `${elementId.split('-')[0]}: ${binaryValue}`;
    chart.data.datasets[0].data[0] = binaryValue;
    chart.update();
}

if ('Accelerometer' in window) {
    let accelerometer = new Accelerometer({ frequency: 60 });
    accelerometer.addEventListener('reading', () => {
        updateChart(accelerometerChartX, 'accelerometer-data-x', accelerometer.x);
        updateChart(accelerometerChartY, 'accelerometer-data-y', accelerometer.y);
        updateChart(accelerometerChartZ, 'accelerometer-data-z', accelerometer.z);
    });
    accelerometer.start();
} else {
    console.log('L\'API Accéléromètre n\'est pas disponible.');
}

if ('Gyroscope' in window) {
    let gyroscope = new Gyroscope({ frequency: 60 });
    gyroscope.addEventListener('reading', () => {
        updateChart(gyroscopeChartX, 'gyroscope-data-x', gyroscope.x);
        updateChart(gyroscopeChartY, 'gyroscope-data-y', gyroscope.y);
        updateChart(gyroscopeChartZ, 'gyroscope-data-z', gyroscope.z);
    });
    gyroscope.start();
} else {
    console.log('L\'API Gyroscope n\'est pas disponible.');
}
