if ('Accelerometer' in window) {
    let accelerometer = new Accelerometer({frequency: 60});
    accelerometer.addEventListener('reading', () => {
        document.getElementById('accelerometer-data').textContent =
            `Accéléromètre: ${accelerometer.x}, ${accelerometer.y}, ${accelerometer.z}`;
    });
    accelerometer.start();
} else {
    console.log('L\'API Accéléromètre n\'est pas disponible.');
}

if ('Gyroscope' in window) {
    let gyroscope = new Gyroscope({frequency: 60});
    gyroscope.addEventListener('reading', () => {
        document.getElementById('gyroscope-data').textContent =
            `Gyroscope: ${gyroscope.x}, ${gyroscope.y}, ${gyroscope.z}`;
    });
    gyroscope.start();
} else {
    console.log('L\'API Gyroscope n\'est pas disponible.');
}
