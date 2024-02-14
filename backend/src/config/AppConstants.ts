import dotenv from "dotenv";

dotenv.config();

export const AppConstants = {
  port: process.env.PORT || 3000,
  clientUrl: process.env.CLIENT_URL || "http://localhost:3000",
  db: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    name: process.env.DB_NAME,
  },
};
