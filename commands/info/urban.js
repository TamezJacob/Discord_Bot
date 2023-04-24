const {Client, Message, EmbedBuilder} = require('discord.js');
const axios = require("axios")
module.exports = {
    name: "urban",
    category: "info",
    permissions: [],
    devOnly: false,
    command: {
        enabled: true,
        usage: "<type>",
        minArgsCount: 1,
    },
    run: async ({client, message, args}) => {
        let input = args.join(" ");
        if(!input) return message.channel.send("ERROR! Must add a word to define");

        input = encodeURIComponent(input);


        const { data: { list }} = await axios.get(`https://api.urbandictionary.com/v0/define?term=${input}`);

        const [ answer ] = list;

        const embed = new EmbedBuilder()
            .setTitle(answer.word)
            .setURL(answer.permalink)
            .setColor(0x0099FF)
            .addFields({name: "DEFINITION", value: trim(answer.definition)})
            .addFields({name: "EXAMPLE", value: trim(answer.example)})
        message.channel.send({embeds: [embed]});
    },
};


function trim(input){
    return input.length > 1024 ? `${input.slice(0,1020)} ... ` : input;
}