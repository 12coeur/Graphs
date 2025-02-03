if ('Accelerometer' in window) {
    let accelerometer = new Accelerometer({ frequency: 60 });
    accelerometer.addEventListener('reading', () => {
        document.getElementById('accelerometer-data').textContent =
            `Accéléromètre: ${accelerometer.x}, ${accelerometer.y}, ${accelerometer.z}`;
    });
    accelerometer.start();
} else {
    console.log('L\'API Accéléromètre n\'est pas disponible.');
}

if ('Gyroscope' in window) {
    let gyroscope = new Gyroscope({ frequency: 60 });
    gyroscope.addEventListener('reading', () => {
        document.getElementById('gyroscope-data').textContent =
            `Gyroscope: ${gyroscope.x}, ${gyroscope.y}, ${gyroscope.z}`;
    });
    gyroscope.start();
} else {
    console.log('L\'API Gyroscope n\'est pas disponible.');
}

if ('Magnetometer' in window) {
    let magnetometer = new Magnetometer({ frequency: 60 });
    magnetometer.addEventListener('reading', () => {
        document.getElementById('magnetometer-data').textContent =
            `Magnétomètre: ${magnetometer.x}, ${magnetometer.y}, ${magnetometer.z}`;
    });
    magnetometer.start();
} else {
    console.log('L\'API Magnetometer n\'est pas disponible.');
}
function handleSensor(sensorType, elementId) {
    if (sensorType in window) {
        try {
            let sensor = new window[sensorType]({ frequency: 60 });
            sensor.addEventListener('reading', () => {
                document.getElementById(elementId).textContent =
                    `${sensorType}: ${sensor.x}, ${sensor.y}, ${sensor.z}`;
            });
            sensor.start();
        } catch (error) {
            console.error(`Erreur lors de l'initialisation du ${sensorType}:`, error);
        }
    } else {
        console.log(`L'API ${sensorType} n'est pas disponible.`);
    }
}

handleSensor('Accelerometer', 'accelerometer-data');
handleSensor('Gyroscope', 'gyroscope-data');
handleSensor('Magnetometer', 'magnetometer-data');
