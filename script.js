// Vérifiez si les capteurs sont disponibles
if ('Accelerometer' in window && 'Gyroscope' in window) {
  // Initialisez l'accéléromètre
  const accelerometer = new Accelerometer({frequency: 60});
  accelerometer.addEventListener('reading', () => {
    document.getElementById('accelerometer-data').innerText = 
      `Accéléromètre: 
      X: ${accelerometer.x.toFixed(2)}, 
      Y: ${accelerometer.y.toFixed(2)}, 
      Z: ${accelerometer.z.toFixed(2)}`;
  });
  accelerometer.start();

  // Initialisez le gyroscope
  const gyroscope = new Gyroscope({frequency: 60});
  gyroscope.addEventListener('reading', () => {
    document.getElementById('gyroscope-data').innerText = 
      `Gyroscope: 
      X: ${gyroscope.x.toFixed(2)}, 
      Y: ${gyroscope.y.toFixed(2)}, 
      Z: ${gyroscope.z.toFixed(2)}`;
  });
  gyroscope.start();
} else {
  document.getElementById('accelerometer-data').innerText = 'Accéléromètre non supporté';
  document.getElementById('gyroscope-data').innerText = 'Gyroscope non supporté';
}