import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import configuration from 'src/config/configuration'
import { AcceptLanguageResolver, I18nModule } from 'nestjs-i18n'
import { join } from 'path'
import { AuthModule } from '../auth/auth.module'
import { PersonModule } from '../person/person.module'
import { RoleModule } from '../role/role.module'
import { UserModule } from '../user/user.module'
import { ScheduleModule } from '@nestjs/schedule'
import { AuthCodeModule } from '../auth_code/auth_code.module'
import { OnboardModule } from '../onboard/onboard.module'
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler'
import { APP_GUARD } from '@nestjs/core'
import { FormulaTypeModule } from '../formula-type/formula-type.module'
import { FormulaResultModule } from '../formula-result/formula-result.module'
import { NumberModule } from '../number/number.module'
import { ThrottlerStorageRedisService } from 'nestjs-throttler-storage-redis'
import { CategoryModule } from '../category/category.module'
import { PageModule } from '../page/page.module'
import { FilesModule } from '../files/files.module'
import { NotificationsModule } from '../notifications/notifications.module'
import { CacheModule } from '@nestjs/cache-manager'
import { redisStore } from 'cache-manager-redis-yet'

@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      fallbacks: {
        'ru-*': 'ru',
        'en-*': 'en',
      },
      loaderOptions: {
        path: join(__dirname.split('src')[0], '/i18n/'),
        watch: true,
      },
      resolvers: [AcceptLanguageResolver],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      isGlobal: true,
      useFactory: async (configService: ConfigService) => ({
        store: redisStore,
        host: configService.get('redis_host'),
        port: configService.get('redis_port'),
        ttl: configService.get('cache_ttl'),
      }),
    }),
    ScheduleModule.forRoot(),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        storage: new ThrottlerStorageRedisService({
          host: config.get('redis_host'),
          port: config.get('redis_port'),
        }),
        throttlers: [
          {
            ttl: config.get('throttle_ttl'),
            limit: config.get('throttle_limit'),
          },
        ],
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('db_host'),
        port: config.get('db_port'),
        username: config.get('db_username'),
        password: config.get('db_password'),
        database: config.get('db_name'),
        entities: ['dist/src/modules/**/entities/*.entity{.ts,.js}'],
        autoLoadEntities: false,
        synchronize: false,
        migrationsRun: false,
        logging: true,
      }),
    }),
    AuthModule,
    AuthCodeModule,
    CategoryModule,
    FormulaResultModule,
    FormulaTypeModule,
    FilesModule,
    NotificationsModule,
    NumberModule,
    OnboardModule,
    PageModule,
    PersonModule,
    RoleModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
