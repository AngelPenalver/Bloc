import NoteModel from './models/Note';
import UserModel from './models/User';

require('dotenv').config();

const { Sequelize } = require('sequelize');
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(
  // URL
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/bloc`,
  { logging: false, native: false }
);
UserModel(sequelize);
NoteModel(sequelize);

const { User, Note } = sequelize.models;

User.hasMany(Note, { foreignKey: 'userId', onDelete: 'CASCADE', hooks: true });
Note.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
  conn: sequelize,
  User,
  Note,
};
