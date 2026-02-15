import { Sequelize, DataTypes, Model, Optional } from "sequelize";

// Define TypeScript interface for User attributes
interface AuthUserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
}

// Optional fields for creation
interface AuthUserCreationAttributes extends Optional<AuthUserAttributes, "id"> {}

// Model class
export class AuthUser extends Model<AuthUserAttributes, AuthUserCreationAttributes>
  implements AuthUserAttributes {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Function to initialize model
export const initUserModel = (sequelize: Sequelize) => {
  AuthUser.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "users",
    }
  );

  return AuthUser;
};
