const fetch = require('node-fetch')

module.exports = {
    name: "joke",
    category: "fun",
    permissions: [],
    devOnly: false,
    run: async ({client, message, args}) => {
        let getJoke = async() =>{
            let result = await fetch('https://official-joke-api.appspot.com/random_joke');
            let json = await result.json()
            return json
        }
        let joke = await getJoke()

        message.reply(`
        ${joke.setup}

        ${joke.punchline}
        `);
    }
  }