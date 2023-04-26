const { getDog } = require('animals-api');

module.exports = {
    name: "dog",
    category: "fun",
    permissions: [],
    devOnly: false,
    run: async ({client, message, args}) => {
        getDog()
            .then((res => message.channel.send(res)));
    }
  }