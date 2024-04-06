// models/Post.js
import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/database';

class Post extends Model {
  constructor(title, content, id) {
    super();
    this._id = id;
    this.title = title;
    this.content = content;
  }
}

Post.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'Post'
  }
);

export default Post;
