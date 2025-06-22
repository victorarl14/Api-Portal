import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller() // Sin prefijo global
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health') // Endpoint de salud para verificar que la API funciona
  getHealth(): any {
    return { 
      status: 'ok',
      message: 'API funcionando correctamente',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: process.memoryUsage()
    };
  }

  @Get('ping') // Endpoint simple para mantener la app activa
  ping(): any {
    return { 
      pong: true,
      timestamp: new Date().toISOString()
    };
  }
}
