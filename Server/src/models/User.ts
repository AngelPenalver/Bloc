import {DataTypes, Model, Sequelize } from 'sequelize';

interface UserAttributes {
  id: string,
  first_name: string,
  last_name: string,
  password: string,
  email: string
}
interface UserInstance extends Model<UserAttributes>, UserAttributes{}
const UserModel = (sequelize: Sequelize) => {
  const User = sequelize.define<UserInstance>('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min:8,
        max: 16,
        is: /(?=\w*\d)(?=.*[a-z])/
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
  })
  return User;
}
export default UserModel;
