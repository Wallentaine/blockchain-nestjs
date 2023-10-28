import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'process';
import { Blockchain } from './modules/blockchain/blockchain';

const PORT: string = process.env.PORT;

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    await app.listen(PORT, () => {
        console.log(`SERVER STARTED ON PORT ${PORT}`);
    });

    const scamCHAIN = new Blockchain();
    console.log(scamCHAIN.getLatestBlock()['transactions'].data);
    console.log(JSON.parse(scamCHAIN.getLatestBlock()['transactions'].data));
}

bootstrap();
