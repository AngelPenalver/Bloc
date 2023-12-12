import { DataTypes, Model, Sequelize } from "sequelize";

interface PostAttributes {
  id: number,
  title: string,
  description: string,
  userId: string
}
interface PostInstance extends Model<PostAttributes>, PostAttributes{}

const PostModel = (sequelize: Sequelize) => {
  const Post = sequelize.define<PostInstance>('Post', {
    id:{
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        len: [10, 100]
      }
    },
    description: {
      type: DataTypes.STRING(600),
      allowNull: false,
      validate: {
        len: [10, 600]
      }
    },
    userId:{
      type: DataTypes.UUID,
      allowNull:false

    }
  })
  return Post
}
export default PostModel;
