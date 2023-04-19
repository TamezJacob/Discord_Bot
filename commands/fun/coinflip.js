module.exports = {
  name: "flip",
  category: "info",
  permissions: [],
  devOnly: false,
  run: async ({client, message, args}) => {
      random = Math.floor(Math.random() * 512);
      if(random % 2 === 0 && random != 0){
        message.reply("https://upload.wikimedia.org/wikipedia/en/f/fe/Sacagawea_dollar_obverse.png")
      }
      else{
        message.reply("https://imgur.com/iiEKRYJ")
      }
  }
}