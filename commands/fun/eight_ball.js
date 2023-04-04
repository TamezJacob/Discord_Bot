module.exports = {
    name: "8ball",
    category: "fun",
    permissions: [],
    devOnly: false,
    run: async ({client, message, args}) => {
        random = (Math.floor(Math.random() * 512) % 20);
        fortune = [
            "Don\'t count on it", "It is certain", "As I see it\, Yes", "Reply hazy\, try again",
            "My reply is no", "Most likely", "It is decidedly so", "Ask again later",
            "My sources say no", "Looking good", "Without a doubt", "Better not tell you now",
            "Outlook not so good", "Signs point to yes", "Yes - Definitely", "Cannot predict now",
            "Very doubtful", "Yes", "You may rely on it", "Concentrate and ask again"
        ]

        message.reply(fortune[random]);
    }
  }