import { Sequelize } from "sequelize";
import { initUserModel } from "../model/authUser";
import {initFlowerModel} from "../model/FlowerModel";
import dotenv from "dotenv";

dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASSWORD as string,
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "postgres",
    logging: false,
  }
);

// Initialize User model
export const User = initUserModel(sequelize);
export const Flower = initFlowerModel(sequelize);

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully.");

    await sequelize.sync({ alter: true }); 

    console.log("Database synced successfully.");
  } catch (error) {
    console.error("Unable to connect to or sync the database:", error);
  }
};
