require("dotenv").config();

module.exports = {
  host: process.env.HOST || "http://localhost",
  port: process.env.PORT || 3000,
  db: {
    url: process.env.DATABASE_URL,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    options: {
      dialect: process.env.DIALECT || "mysql",
      host: process.env.DB_HOST,
    },
  },
  authentication: {
    jwtSecret: process.env.JWT_SECRET,
  },
};
