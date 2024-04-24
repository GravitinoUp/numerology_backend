export default () => ({
  refresh_token: process.env.REFRESH_SECRET,
  access_secret: process.env.ACCESS_SECRET,
  port: process.env.PORT,
  dialect: process.env.DIALECT,
  db_host: process.env.DB_HOST,
  db_port: process.env.DB_PORT,
  db_username: process.env.DB_USERNAME,
  db_password: process.env.DB_PASSWORD,
  db_name: process.env.DB_NAME,
  smtp_host: process.env.SMTP_HOST,
  smtp_domain: process.env.SMTP_DOMAIN,
  smtp_user: process.env.SMTP_USER,
  smtp_password: process.env.SMTP_PASSWORD,
  redis_host: process.env.REDIS_HOST,
  redis_port: process.env.REDIS_PORT,
  cache_ttl: process.env.CACHE_TTL,
  disable_ssl: process.env.DISABLE_SSL,
})
