const fetch = require('node-fetch')

module.exports = {
    name: "cat",
    category: "fun",
    permissions: [],
    devOnly: false,
    run: async ({client, message, args}) => {
        let getCat = async() =>{
            let result = await fetch('https://api.thecatapi.com/v1/images/search');
            let json = await result.json()
            return json
        }
        let cat = await getCat();

        message.channel.send(`${cat[0].url}`);
    }
  }