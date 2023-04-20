const { EmbedBuilder } = require("discord.js")
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

module.exports = {
    name: "meme",
    category: "fun",
    permissions: [],
    devOnly: false,
    command: {
        enabled: true,
    },
    run: async ({client, message, args, interaction}) =>{
        await fetch('https://www.reddit.com/r/meme/random/.json').then(async res => {
            let meme = await res.json();

            let image = meme[0].data.children[0].data.url;

            return message.channel.send(image);
        });
    }
}
