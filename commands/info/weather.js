const { EmbedBuilder } = require("discord.js")
const weather = require("weather-js");

module.exports = {
    name: "weather",
    category: "info",
    permissions: [],
    devOnly: false,
    command: {
        enabled: true,
        usage: "<type>",
        minArgsCount: 1,
    },
    run: async ({client, message, args, interaction}) =>{
    
        const city = args.join(" ");
        if(!city) { return message.channel.send("ERROR! No city included");}

        weather.find({ search: city, degreeType: "F"}, (error, result) => {
            if(error) return message.channel.send("Error occured");
            else if (result.length === 0) return message.channel.send("Error, city not found");

            let data = result[0];
            let time = `${data.current.date}. ${data.current.observationtime}`;
            const embed = new EmbedBuilder()
                .setTitle(`Current weather of ${data.location.name}`)
                .setColor(0x0099FF)
                .setThumbnail(data.current.imageUrl)
                .addFields({ name: "City", value: data.location.name})
                .addFields({ name: "Sky Condition", value: data.current.skytext})
                .addFields({ name: "Temperature", value: data.current.temperature})
                .addFields({ name: "Wind Speed", value: data.current.windspeed})
                .addFields({ name: "Timezone", value: data.location.timezone})
                .addFields({ name: "Day", value: data.current.day})
                

            return message.channel.send({embeds: [embed]});
        })
        
    }
}
