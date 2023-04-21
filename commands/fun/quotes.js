const Quote = require('inspirational-quotes');
module.exports = {
    name: "quote",
    category: "fun",
    permissions: [],
    devOnly: false,
    run: async ({client, message, args}) => {
        let response =   + ": \n" + Quote.getRandomQuote().text;
        // console.log(response);
        message.channel.send(`${Quote.getQuote().author}: \n ${Quote.getQuote().text}`);
    }
  }