import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Env } from './env';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    const configSwagger = new DocumentBuilder()
    .setTitle('Horto Florestal API')
    .setDescription('API para gerenciamento de plantas e usuários do Horto Florestal')
    .setVersion('1.0')
    .addTag('Users')
    .addTag('Plants')
    .build();
    
    const document = SwaggerModule.createDocument(app, configSwagger);
    SwaggerModule.setup('/', app, document);
    const config = app.get<ConfigService<Env, true>>(ConfigService);
    const port = config.get('PORT', { infer : true });
    await app.listen(port);
}
bootstrap();
