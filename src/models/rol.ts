
import { DataTypes } from "sequelize";
import db from "../db/connection";

const Role = db.define("role", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    description: {
        type: DataTypes.STRING,
    }
}, {
    timestamps: false, // disable timestamps
});
    

export default Role;