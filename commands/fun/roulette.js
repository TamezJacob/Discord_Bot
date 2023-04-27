const rouletteOptions = [
    { number: "00", color: "green" },
    { number: "0", color: "green" },
    { number: "1", color: "red" },
    { number: "2", color: "black" },
    { number: "3", color: "red" },
    { number: "4", color: "black" },
    { number: "5", color: "red" },
    { number: "6", color: "black" },
    { number: "7", color: "red" },
    { number: "8", color: "black" },
    { number: "9", color: "red" },
    { number: "10", color: "black" },
    { number: "11", color: "black" },
    { number: "12", color: "red" },
    { number: "13", color: "black" },
    { number: "14", color: "red" },
    { number: "15", color: "black" },
    { number: "16", color: "red" },
    { number: "17", color: "black" },
    { number: "18", color: "red" },
    { number: "19", color: "red" },
    { number: "20", color: "black" },
    { number: "21", color: "red" },
    { number: "22", color: "black" },
    { number: "23", color: "red" },
    { number: "24", color: "black" },
    { number: "25", color: "red" },
    { number: "26", color: "black" },
    { number: "27", color: "red" },
    { number: "28", color: "black" },
    { number: "29", color: "black" },
    { number: "30", color: "red" },
    { number: "31", color: "black" },
    { number: "32", color: "red" },
    { number: "33", color: "black" },
    { number: "34", color: "red" },
    { number: "35", color: "black" },
    { number: "36", color: "red" }
  ];
const fs = require('fs');

  module.exports = {
    name: "roulette",
    category: "fun",
    permissions: [],
    devOnly: false,
    run: async ({client, message}) => {
        const args = message.content.split(" ");
        const user = message.author.id;
        const response = handleRouletteCommand(args.slice(1), user);

        message.channel.send(response);

    }
}

function handleRouletteCommand(args, user) {
    let amount = parseInt(args[0]);
    const betOption = args.slice(2).join(" ").toLowerCase();
  
    if (isNaN(amount) || amount <= 0) {
      return "Invalid bet amount. Please enter a positive number.";
    }
  
    let betType;
    let betNumbers = [];
    if (betOption === "red" || betOption === "black" || betOption === "green") {
      betType = "color";
    } else {
      betType = "numbers";
      betNumbers = betOption.split(" ").map(num => parseInt(num.trim()));
      amount = amount * betNumbers.length;
    }
  
    const result = rouletteOptions[Math.floor(Math.random() * rouletteOptions.length)];
    let isWin = false;
    readFile(user, amount, isWin);
    if (betType === "color") {
      isWin = (betOption === result.color);
    } else {
      isWin = (betNumbers.indexOf(result.number) !== -1);
    }
  
    if (isWin) {
      let payout;
      if (betType === "color") {
        if (betOption === "green") {
          payout = 35 * amount;
        } else {
          payout = 2 * amount;
        }
      } else {
        payout = 36 / betNumbers.length * amount;
      }
      readFile(user, payout, isWin);
      return `Congratulations, you won ${payout} coins! The result is ${result.color} ${result.number}.`;
    } else {
      return `Sorry, you lost ${amount} coins. The result is ${result.color} ${result.number}.`;
    }
  }
  
  

function spinRoulette() {
    const randomOption = rouletteOptions[Math.floor(Math.random() * rouletteOptions.length)];
    return { number: randomOption.number, color: randomOption.color };
}

function readFile(user, bet, win){
    fs.readFile(`./commands/fun/tokens/${user}.txt`, 'utf8', (err, data) => {
        if (err) {
          console.error(err);
        } else {
            if(!win){
                const bank = parseInt(data);
                const newBank = bank - bet;
                fs.writeFile(`./commands/fun/tokens/${user}.txt`, newBank.toString(), (err) => {
                    if (err) {
                        console.error(err);
                    }
                });
            }
            else{
                const bank = parseInt(data);
                const newBank = bank + bet;
                fs.writeFile(`./commands/fun/tokens/${user}.txt`, newBank.toString(), (err) => {
                    if (err) {
                        console.error(err);
                    }
                });
            }
        }
    });
}