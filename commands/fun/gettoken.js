const fs = require('fs');
module.exports = {
    name: "gettoken",
    category: "fun",
    permissions: [],
    devOnly: false,
    run: async ({client, message}) => {

      // Get the token from the message
      const args = message.content.split(' ');
      const token = args[1];
      const value = message.author.id;
  
      // Read the token value from a file
      const filePath = `./commands/fun/tokens/${value}.txt`;
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          message.channel.send(`Token ${token} not found.`);
        } else {
          const value = parseInt(data);
          message.channel.send(`Value of tokens for ${message.author} is ${value}.`);
        }
      }); 
    }       
}