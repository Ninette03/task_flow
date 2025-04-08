import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import path from 'path';

dotenv.config();
dotenv.config({ path: path.resolve('backend', '.env') });

const isProduction = process.env.NODE_ENV === 'production';
const isRender = process.env.RENDER === 'true';

const baseConfig = {
  dialect: 'postgres',
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

// SSL Configuration (for both Render and other production environments)
if (isProduction || isRender) {
  baseConfig.dialectOptions = {
    ssl: {
      require: true,
      rejectUnauthorized: isRender ? false : true
    }
  };
}

// Database connection
const sequelize = new Sequelize(
  isProduction ? process.env.DATABASE_URL : process.env.DB_NAME,
  isProduction ? undefined : process.env.DB_USER,
  isProduction ? undefined : process.env.DB_PASS,
  {
    host: isProduction ? undefined : process.env.DB_HOST,
    port: isProduction ? undefined : (process.env.DB_PORT || 5432),
    ...baseConfig
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('PostgreSQL connected successfully');
    console.log('SSL mode:', baseConfig.dialectOptions?.ssl ? 'enabled' : 'disabled');
  } catch (error) {
    console.error('PostgreSQL connection failed:', error.message);
    
    if (!isProduction && error.message.includes('SSL')) {
      console.log('Retrying without SSL...');
      const localConfig = { ...baseConfig, dialectOptions: { ssl: false } };
      const localSequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASS,
        {
          host: process.env.DB_HOST,
          port: process.env.DB_PORT || 5432,
          ...localConfig
        }
      );
      await localSequelize.authenticate();
      return;
    }
    
    process.exit(1);
  }
};

export { sequelize, connectDB };