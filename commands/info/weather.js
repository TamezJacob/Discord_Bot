const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const weather = require("weather-js");

module.exports = {
    name: "weather",
    category: "info",
    permissions: [],
    devOnly: false,
    command: {
        enabled: true,
        usage: "<type>",
        minArgsCount: 2,
    },
    run: async ({client, message, args, interaction}) =>{
    
        const location = args[0].toString();
        const degree = args[1].toString();
        console.log(location);

        message.reply({ content: 'Loading the weather...'});

        await weather.find({ search: "Austin, TX", degreeType: "F", async function(err, result){
            console.log("in here");
            setTimeout(() => {
                if (err){
                    console.log(err);
                    message.reply({ content: `${err} | Error occured... Try again`});
                } else {
                    const temp = result[0].current.temperature;
                    const type = result[0].current.skytext;
                    const name = result[0].location.name;
                    const feel = result[0].current.feelslike;
                    const icon = result[0].current.imageUrl;
                    const wind = result[0].current.winddisplay;
                    const day = result[0].current.day;
                    const alert = result[0].location.alert || 'None';

                    const embed = new EmbedBuilder()
                    .setColor("Blue")
                    .setTitle(`Current weather of ${name}`)
                    .addFields({ name: "Temperature", value: `${temp}`})
                    .addFields({ name: "Feels Like", value: `${feel}`})
                    .addFields({ name: "Weather", value: `${type}`})
                    .addFields({ name: "Current Alerts", value: `${alert}`})
                    .addFields({ name: "Week Day", value: `${day}`})
                    .addFields({ name: "Wind Speed & Direction", value: `${wind}`})
                    .setThumbnail(icon)

                    message.reply({ content: ``, embeds: [embed]});
                    
                }
            }, 2000)
        }});
    }
}
