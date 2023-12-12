import PostModel from './models/Post';
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
PostModel(sequelize);

const { User, Post } = sequelize.models;

User.hasMany(Post, { foreingKey: 'userId' });
Post.belongsTo(User, { foreingKey: 'userId' });

module.exports = {
  conn: sequelize,
  User,
  Post

};

