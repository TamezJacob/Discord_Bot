const fs = require('fs');

module.exports = {
    name: "settoken",
    category: "fun",
    permissions: [],
    devOnly: false,
    run: ({client, message}) => {
                
        // Get the token and value from the message
        const args = message.content.split(' ');
        const token = args[1];
        const value = message.author.id;
    
        // Write the token value to a file
        const filePath = `./commands/fun/tokens/${value}.txt`;
        fs.writeFile(filePath, token.toString(), (err) => {
            if (err) {
            console.error(err);
            message.channel.send('Error setting token value.');
            } else {
            message.channel.send(`Set value of token ${token} to ${message.author}.`);
            }
        });

    }       
}