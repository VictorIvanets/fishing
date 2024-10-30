import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
const PORT = process.env.PORT || 5550

async function bootstrap(): Promise<void> {
	const app = await NestFactory.create(AppModule)
	app.enableCors()
	app.setGlobalPrefix('api')
	await app.listen(PORT)
	console.log(`🚀 Server graphql ready at http://localhost:${PORT}/graphql`)
	console.log(`🚀 Server rest ready at http://localhost:${PORT}/api`)
}
bootstrap()
