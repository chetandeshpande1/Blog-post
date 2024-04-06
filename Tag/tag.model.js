import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/database';
import { ApplicationError } from '../error-handler/applicationerror';

class Tag extends Model {
  constructor(name, id) {
    super();
    this._id = id;
    this.name = name;
  }
}

Tag.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  },
  {
    sequelize,
    modelName: 'Tag'
  }
);

export default Tag;
