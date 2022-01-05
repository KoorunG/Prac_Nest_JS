import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);

  const serverConfig : { port : number } = config.get('server');
  await app.listen(serverConfig.port);

  // logger.error(`Application running on port ${port}`);
  // logger.warn(`Application running on port ${port}`);
  // logger.debug(`Application running on port ${port}`);
  logger.log(`Application running on port ${serverConfig.port}`);
  // logger.verbose(`Application running on port ${port}`);
}
bootstrap();
