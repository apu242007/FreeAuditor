import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { FormulariosModule } from './formularios/formularios.module';
import { SeccionesModule } from './secciones/secciones.module';
import { PreguntasModule } from './preguntas/preguntas.module';
import { OpcionesModule } from './opciones/opciones.module';
import { RespuestasModule } from './respuestas/respuestas.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    UsuariosModule,
    FormulariosModule,
    SeccionesModule,
    PreguntasModule,
    OpcionesModule,
    RespuestasModule,
  ],
})
export class AppModule {}