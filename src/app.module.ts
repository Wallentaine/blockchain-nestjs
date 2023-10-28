import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { BlockchainModule } from './modules/blockchain/blockchain.module';
import * as process from 'process';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`,
        }),
        BlockchainModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
