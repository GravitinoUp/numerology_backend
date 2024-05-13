import { DataSource } from 'typeorm'
import { config as dotenvConfig } from 'dotenv'

dotenvConfig({ path: '.env' })

export const SeedsDataSource = new DataSource({
  type: 'postgres',
  host: `${process.env.DB_HOST}`,
  port: +process.env.DB_PORT,
  username: `${process.env.DB_USERNAME}`,
  password: `${process.env.DB_PASSWORD}`,
  database: `${process.env.DB_NAME}`,
  entities: ['dist/src/modules/**/entities/*.entity{.ts,.js}'],
  migrations: ['dist/src/db/migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations',
  synchronize: true,
})
