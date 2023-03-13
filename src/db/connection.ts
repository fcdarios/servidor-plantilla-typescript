import { Sequelize } from "sequelize";

const db = new Sequelize('dbtest', 'admin', 'admin', {
    host: 'localhost',
    dialect: 'mariadb'
});

export default db;