import { NestFactory } from '@nestjs/core'
import { AppModule } from './modules/app/app.module'
import { ConfigService } from '@nestjs/config'
import { ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import 'reflect-metadata'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {})
  const configService = app.get(ConfigService)

  app.enableCors({
    origin: [
      'http://localhost:3001',
      'https://localhost:3001',
      'http://localhost:3000',
      'https://localhost:3000',
      'http://localhost',
      'https://localhost',
    ],
    methods: ['POST', 'GET', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
  })

  const config = new DocumentBuilder()
    .setTitle('NUMEROLOGY API')
    .setDescription('The NUMEROLOGY API!')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'JWT',
      description: 'Enter JWT token',
      in: 'header',
    })
    .build()

  const port = configService.get('port')

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      tagsSorter: 'alpha',
      persistAuthorization: true,
    },
    customSiteTitle: 'GRAVITINO ASU API',
  })

  app.useGlobalPipes(new ValidationPipe())
  await app.listen(port)
}
bootstrap()
