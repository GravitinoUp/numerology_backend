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
import { LanguageModule } from '../language/language.module'
import { OnboardModule } from '../onboard/onboard.module'
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler'
import { APP_GUARD } from '@nestjs/core'
import { ThrottlerStorageRedisService } from 'nestjs-throttler-storage-redis'

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
    ScheduleModule.forRoot(),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        storage: new ThrottlerStorageRedisService(),
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
        migrations: ['dist/src/db/**/*{.ts,.js}'],
        autoLoadEntities: false,
        synchronize: false,
        migrationsRun: true,
        logging: true,
      }),
    }),
    AuthModule,
    AuthCodeModule,
    LanguageModule,
    OnboardModule,
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
