import { Module } from '@nestjs/common';
import { TrackerController } from './controllers/tracker.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Visit } from './entities/visit.entity';
import { Page } from './entities/page.entity';
import { VisitService } from './services/visit.service';
import { VisitController } from './controllers/visit.controller';
import { PageController } from './controllers/page.controller';
import { PageService } from './services/page.service';
import { Website } from './entities/website.entity';
import { WebsiteController } from './controllers/website.controller';
import { WebsiteService } from './services/website.service';
import { TrafficController } from './controllers/traffic.controller';
import { TrafficService } from './services/traffic.service';
import { OpenAIService } from './services/openai-service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [Website, Page, Visit],
        synchronize: true,
      }),
    }),
    TypeOrmModule.forFeature([Website, Page, Visit])
  ],
  controllers: [WebsiteController, PageController, TrackerController, VisitController, TrafficController],
  providers: [
    WebsiteService, 
    PageService, 
    VisitService, 
    TrafficService,
    {
      provide: 'AIService',
      useClass: OpenAIService
    }
  ],
})
export class AppModule {}
