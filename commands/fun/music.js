const { CommandInteraction, Client, MessageEmbed } = require("discord.js");


module.exports = {
    name: "music",
    description: "Music System",
    options: [
        {
            name: "play",
            description: "plays song",
            type: "SUB_COMMAND",
            option: [{ name: "query", description: "Provide name or URL", type: "STRING", required: true}]   
        },
        {
            name: "volume",
            description: "Change volume",
            type: "SUB_COMMAND",
            options: [{ name: "percent", description: "10 = 10%", type: "NUMBER", required: true}]
        },
        {
            name: "settings",
            description: "Select an option",
            type: "SUB_COMMAND",
            options: [{ name: "options", description: "Select and option", type: "STRING", required: true,
            choices: [
               {name: "queue", value: "queue"},
               {name: "skip", value: "skip"},
               {name: "pause", value: "pause"},
               {name: "resume", value: "resume"},
               {name: "stop", value: "stop"},        
            ]}]
        }
    ],
    async execute(interaction, bot){
        const { options, member, guild, channel } = interaction;
        const VoiceChannel = member.voice.channel;

        if(!VoiceChannel) return interaction.reply({content: "Must be in voice channel", ephemeral: true});

        if(guild.me.voice.channelId && VoiceChannel.id !== guild.me.voice.channelId)
            return interaction.reply({content: `Already playing in <#${guild.me.voice.channelId}>. `, ephemeral: true});

        try{
            switch(options.getSubcommand()){
                case "play" : {
                    client.distube.playVoiceChannel( VoiceChannel, options.getString("query"), { textChannel: channel, member: member  });
                    return interaction.reply({content: "Request recieved."})
                }
                case "volume" : {
                    const Volume = options.getNumber("percent");
                    if(Volume > 100 || Volume < 1) return interaction.reply({content: "Volume must be between 1 and 100"});

                    client.distube.setVolume(VoiceChannel, Volume);
                    return interaction.reply({content: `Volume is set to \`${Volume}%\``})

                }
                case "settings": {
                    const queue = await client.distube.getQueue(VoiceChannel);

                    if(!queue) return interaction.reply({content: "There is no queue."})
                
                    switch(options.getString("options")){
                        case "skip" : 
                            await queue.skip(VoiceChannel);
                            return interaction.reply({content: "Song has been skipped"})
                        case "stop" :
                            await queue.stop(VoiceChannel);
                            return interaction.reply({content: "Song has been stopped"})
                        case "pause" :
                            await queue.pause(VoiceChannel);                         
                            return interaction.reply({content: "Song has been paused"})
                        case "resume" :
                            await queue.resume(VoiceChannel); 
                            return interaction.reply({content: "Song has resumed"})
                        case "queue" :
                            return interaction.reply({embeds: [new MessageEmbed()
                                .setColor("PURPLE")
                                .setDescription(`${queue.songs.map(
                                    (song, id) => `\n**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``
                                )}`)
                        ]})
                        return;
                    }
                }
            }

        } catch (e) {
            const errorEmbed = new MessageEmbed()
            .setColor("RED")
            .setDescription(`Alert: ${e}`)
            return interaction.reply({embeds: [errorEmbed]});
        }
        
    }
}