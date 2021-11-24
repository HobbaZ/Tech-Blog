const User = require('./User');
const Comment = require('./Comment');
const Post = require('./post');

User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Post.belongsTo(User, {
  foreignKey: 'user_id'
});

Post.hasMany(Comment, {
    foreignKey: 'post_id'
})

module.exports = { User, Project };