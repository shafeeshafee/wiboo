const syncModels = async (sequelize) => {
    const { user, conversation, message, userToConversation } = sequelize.models;
  
    try {
      await user.sync();
      await conversation.sync();
      await userToConversation.sync();
      await message.sync();
      console.log("synced");
    } catch (error) {
      console.error(error);
    }
  };
  
  module.exports = { syncModels };