import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import path from 'path';

dotenv.config();
dotenv.config({ path: path.resolve('backend', '.env') });

// Detect environment
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

// Render-specific configuration
if (isRender) {
  baseConfig.dialectOptions = {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  };
}
// Local development with SSL support
else if (isProduction && !isRender) {
  baseConfig.dialectOptions = {
    ssl: {
      require: true
    }
  };
}
// Local development without SSL
else {
  baseConfig.dialectOptions = {
    ssl: false
  };
}

const sequelize = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, baseConfig)
  : new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASS,
      {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT || 5432,
        ...baseConfig
      }
    );

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('PostgreSQL connected successfully');
    console.log('SSL mode:', sequelize.config.dialectOptions?.ssl ? 'enabled' : 'disabled');
  } catch (error) {
    console.error('PostgreSQL connection failed:', error.message);
    
    // Special handling for local SSL issues
    if (!isProduction && error.message.includes('SSL')) {
      console.log('Retrying without SSL...');
      sequelize.config.dialectOptions.ssl = false;
      await sequelize.authenticate();
      return;
    }
    
    process.exit(1);
  }
};

export { sequelize, connectDB };