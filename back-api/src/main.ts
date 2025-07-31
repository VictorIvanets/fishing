import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
const PORT = process.env.PORT || 5550

async function bootstrap(): Promise<void> {
	const app = await NestFactory.create(AppModule)
	app.enableCors()
	app.setGlobalPrefix('api')
	const config = new DocumentBuilder()
		.setTitle('API документація')
		.setDescription('Автоматично згенерована Swagger документація')
		.setVersion('1.0')
		.addBearerAuth()
		.build()

	const document = SwaggerModule.createDocument(app, config)
	SwaggerModule.setup('api', app, document)
	app.enableCors()
	await app.listen(PORT)
	console.log(`Server: http://localhost:${PORT}/api`)
}

bootstrap()
