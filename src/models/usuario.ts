import { Model, DataTypes } from 'sequelize';
import sequelize from "../db/connection";


interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  status: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

class User extends Model<UserAttributes> implements UserAttributes {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public role!: string;
  public status!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    role: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: "USER_ROLE",  
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  }, 
    {
      tableName: 'users',
      sequelize,
    }
);


// Eliminar atributos password y createdAt y updatedAt
User.afterFind('hookDeleteColumns', (result: any) => {
  if (!result) return;
  
  if (Array.isArray(result)) {
    result.forEach((user) => {
      delete user.dataValues.password;
      delete user.dataValues.createdAt;
      delete user.dataValues.updatedAt;
    });
  } else {
    delete result.dataValues.password;
    delete result.dataValues.createdAt;
    delete result.dataValues.updatedAt;
  }
});


export default User;