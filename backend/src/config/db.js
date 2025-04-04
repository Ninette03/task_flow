import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import path from "path";

dotenv.config ();
dotenv.config({ path: path.resolve("backend", ".env") });

const sequelize = new Sequelize(
    process.env.DB_NAME, // Database name
    process.env.DB_USER, // PostgreSQL username
    process.env.DB_PASS, // PostgreSQL password
    {
      host: process.env.DB_HOST, // Database host
      dialect: "postgres", // Ensures Sequelize uses PostgreSQL
      logging: false,
      schema: 'public',
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      }
    }
  );

  const connectDB = async () => {
    try {
      await sequelize.authenticate();
      console.log("PostgreSQL connected successfully.");
      console.log('Using database at:', process.env.DATABASE_URL);
    } catch (error) {
      console.error("PostgreSQL connection failed:", error);
      process.exit(1);
    }
  };
  
  export { sequelize,connectDB};