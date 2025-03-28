import { sequelize, connectDB } from '../config/db';
import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

describe('Database Connection', () => {
  afterAll(async () => {
    await sequelize.close(); // Ensure DB connection is closed after tests
  });

  it('should connect to the database successfully', async () => {
    await expect(connectDB()).resolves.not.toThrow();
  });

  it('should fail to connect with invalid credentials', async () => {
    const invalidSequelize = new Sequelize(
      'wrong_db', // Invalid database name
      'wrong_user', // Invalid username
      'wrong_pass', // Invalid password
      {
        host: 'localhost',
        dialect: 'postgres',
        logging: false,
      }
    );

    await expect(invalidSequelize.authenticate()).rejects.toThrow();
    await invalidSequelize.close(); // Ensure to close this connection
  });

  it('should load environment variables correctly', () => {
    expect(process.env.DB_NAME).toBeDefined();
    expect(process.env.DB_USER).toBeDefined();
    expect(process.env.DB_PASS).toBeDefined();
    expect(process.env.DB_HOST).toBeDefined();
  });
});