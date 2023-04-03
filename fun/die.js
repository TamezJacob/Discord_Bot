module.exports = {
    name: "die",
    category: "fun",
    permissions: [],
    devOnly: false,
    command: {
        enabled: true,
        usage: "<type>",
        minArgsCount: 1,
    },
    run: async ({ client, message, args }) => {
        const choice = args[0];
        random = (Math.floor(Math.random() * 512) % choice);

        message.reply("Rolling Die");
        message.reply(random.toString());
    }
}