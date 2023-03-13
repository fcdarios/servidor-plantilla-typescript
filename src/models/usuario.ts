
import { DataTypes } from "sequelize";
import db from "../db/connection";

const User = db.define("user", {
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
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'USER_ROLE',
    },
});
    

export default User;