# 🚀 Guía de Optimización para Render (Plan Gratuito)

## Problema
En Render con el plan gratuito, las aplicaciones se "duermen" después de 15 minutos de inactividad y tardan en "despertar" cuando reciben una nueva petición.

## Soluciones Implementadas

### 1. **Health Check Endpoint**
- Endpoint `/health` para verificar el estado de la aplicación
- Endpoint `/ping` para mantener la app activa
- Configurado en `render.yaml` con `healthCheckPath: /health`

### 2. **Optimización de Scripts**
- Script de producción optimizado: `npm run start:prod`
- Límite de memoria: `--max-old-space-size=512`
- Variables de entorno optimizadas

### 3. **Configuración de Base de Datos**
- Pool de conexiones optimizado (máximo 20 conexiones)
- Timeouts configurados
- Logging deshabilitado en producción
- `synchronize: false` en producción

### 4. **Script de Keep-Alive**
- Archivo `keep-alive.js` para mantener la app activa
- Ping automático cada 10 minutos
- Ejecutar con: `npm run keep-alive`

## Cómo Usar

### Opción 1: Script Local (Recomendado)
```bash
# En tu computadora, ejecuta:
npm run keep-alive
```

### Opción 2: Servicio Externo
Usa servicios como:
- **UptimeRobot** (gratuito): https://uptimerobot.com
- **Cron-job.org** (gratuito): https://cron-job.org
- **Pingdom** (gratuito limitado)

### Opción 3: GitHub Actions
Crea un workflow que haga ping cada 10 minutos:

```yaml
name: Keep API Alive
on:
  schedule:
    - cron: '*/10 * * * *'  # Cada 10 minutos

jobs:
  ping:
    runs-on: ubuntu-latest
    steps:
      - name: Ping API
        run: |
          curl -X GET https://api-portal-backend.onrender.com/ping
```

## Configuraciones en Render Dashboard

### Variables de Entorno
- `NODE_ENV=production`
- `NODE_VERSION=18.0.0`
- `PORT=3000`

### Configuraciones Adicionales
- **Auto Deploy**: Habilitado
- **Health Check Path**: `/health`
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm run start:prod`

## Monitoreo

### Verificar Estado
```bash
# Health check
curl https://api-portal-backend.onrender.com/health

# Ping simple
curl https://api-portal-backend.onrender.com/ping
```

### Logs en Render
- Ve a tu dashboard de Render
- Sección "Logs" para ver el rendimiento
- Monitorea los tiempos de respuesta

## Alternativas de Hosting

Si el problema persiste, considera:

### 1. **Railway** (Alternativa a Render)
- Plan gratuito más generoso
- Menos tiempo de "despertar"

### 2. **Heroku**
- Plan gratuito discontinuado
- Planes pagos desde $7/mes

### 3. **Vercel** (Solo Frontend)
- Excelente para frontend
- Backend con serverless functions

### 4. **Netlify** (Solo Frontend)
- Similar a Vercel
- Funciones serverless incluidas

## Costos de Optimización

### Plan Gratuito de Render
- ✅ Gratis
- ❌ 15 min de sleep
- ❌ Tiempo de despertar lento

### Plan Pago de Render ($7/mes)
- ✅ Sin sleep
- ✅ Respuesta inmediata
- ✅ Más recursos

## Recomendaciones

1. **Usa el script de keep-alive** durante desarrollo
2. **Considera un plan pago** para producción
3. **Implementa caching** en el frontend
4. **Usa CDN** para assets estáticos
5. **Optimiza las consultas** de base de datos

## Troubleshooting

### La app sigue tardando en cargar
1. Verifica que el script de keep-alive esté funcionando
2. Revisa los logs en Render
3. Confirma que las variables de entorno estén correctas

### Error de conexión a la base de datos
1. Verifica las credenciales de la BD
2. Confirma que la BD esté activa
3. Revisa la configuración SSL

### Build falla
1. Verifica las dependencias
2. Revisa el comando de build
3. Confirma la versión de Node.js 