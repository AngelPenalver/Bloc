import { DataTypes, Model, Sequelize } from "sequelize";

interface NoteAttributes {
  id: number,
  title: string,
  description: string,
  userId: string
}
interface NoteInstance extends Model<NoteAttributes>, NoteAttributes{}

const NoteModel = (sequelize: Sequelize) => {
  const Note = sequelize.define<NoteInstance>('Note', {
    id:{
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        len: [0, 100]
      }
    },
    description: {
      type: DataTypes.STRING(600),
      allowNull: false,
      validate: {
        len: [10, 1000]
      }
    },
    userId:{
      type: DataTypes.UUID,
      allowNull:false

    }
  })
  return Note
}
export default NoteModel;
