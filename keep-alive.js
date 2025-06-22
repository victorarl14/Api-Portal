// Script para mantener la aplicación activa en Render
// Ejecuta este script en tu computadora para hacer ping cada 10 minutos

const https = require('https');

const API_URL = 'https://api-portal-backend.onrender.com'; // Cambia por tu URL
const PING_INTERVAL = 10 * 60 * 1000; // 10 minutos

function pingServer() {
  const options = {
    hostname: new URL(API_URL).hostname,
    port: 443,
    path: '/ping',
    method: 'GET',
    timeout: 10000
  };

  const req = https.request(options, (res) => {
    console.log(`✅ Ping exitoso - Status: ${res.statusCode} - ${new Date().toISOString()}`);
  });

  req.on('error', (error) => {
    console.error(`❌ Error en ping: ${error.message} - ${new Date().toISOString()}`);
  });

  req.on('timeout', () => {
    console.error(`⏰ Timeout en ping - ${new Date().toISOString()}`);
    req.destroy();
  });

  req.end();
}

// Hacer ping inmediatamente
pingServer();

// Configurar ping periódico
setInterval(pingServer, PING_INTERVAL);

console.log(`🚀 Script de keep-alive iniciado para ${API_URL}`);
console.log(`⏰ Ping cada ${PING_INTERVAL / 1000 / 60} minutos`);
console.log('Presiona Ctrl+C para detener');

// Manejar cierre limpio
process.on('SIGINT', () => {
  console.log('\n👋 Script detenido');
  process.exit(0);
}); 