const TypeOrmNamingStrategy = require("./src/config/TypeOrmNamingStrategy.ts");

module.exports = {
  type: "mysql",
  host: "127.0.0.1",
  port: 3103,
  username: "root",
  password: "password",
  database: "typeorm",
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
