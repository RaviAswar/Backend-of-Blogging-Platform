const User = require('./User');
const Post = require('./Post');

// Define relationships
Post.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Post, { foreignKey: 'userId' });

module.exports = {
  User,
  Post
};