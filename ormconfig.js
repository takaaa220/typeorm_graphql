const TypeOrmNamingStrategy = require("./src/config/TypeOrmNamingStrategy.ts");

module.exports = {
  type: "mysql",
  extra: {
    socketPath: process.env.DATABASE_SOCKET || "/tmp/mysql.sock",
  },
  username: process.env.DATABASE_USER || "root",
  password: process.env.DATABASE_PASSWORD || "password",
  database: process.env.DATABASE_NAME || "typeorm",
  synchronize: false,
  logging: true,
  entities: ["src/entity/**/*.ts"],
  migrations: ["src/migration/**/*.ts"],
  subscribers: ["src/subscriber/**/*.ts"],
  cli: {
    entitiesDir: "src/entity",
    migrationsDir: "src/migration",
    subscribersDir: "src/subscriber",
  },
  namingStrategy: new TypeOrmNamingStrategy(),
};
