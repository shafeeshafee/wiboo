function addAssociations(sequelize) {
    const { user, conversation, message, userToConversation } = sequelize.models;
  
    user.hasMany(userToConversation);
    userToConversation.belongsTo(user);
  
    conversation.hasMany(userToConversation);
    userToConversation.belongsTo(conversation);
  
    conversation.hasMany(message);
    message.belongsTo(conversation);
  
    user.hasMany(message);
    message.belongsTo(user);
  }
  
  module.exports = { addAssociations };