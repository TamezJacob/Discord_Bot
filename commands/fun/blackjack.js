const { EmbedBuilder, embedLength } = require('discord.js');
const fs = require('fs');

const cardValues = {
    'Ace': 11,
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9,
    '10': 10,
    'Jack': 10,
    'Queen': 10,
    'King': 10
};

module.exports = {
    name: "blackjack",
    category: "fun",
    permissions: [],
    devOnly: false,
    run: async ({client, message, args}) => {

        let deck = [];
        deck = deckCreator();

        const [playerHand, dealerHand] = dealCards(deck);

        let playerHandValue = calculateHandValue(playerHand);
        let dealerHandValue = calculateHandValue(dealerHand.slice(0, 1));

        let user = message.author.id;
        let win = false;

        readFile(user, 10, win);
            

        const embed = new EmbedBuilder()
            .setTitle(`Blackjack!`)
            .setColor(0x0099FF)
            .setDescription("Dealer stands on 17. Minimum bet is 10. Blackjack pays 3:2")
            .setThumbnail('https://i.imgur.com/xibQEop.png')
            .addFields({ name: "Dealer is Showing", value: dealerHand[0] })
            .addFields({ name: "Dealer: ", value: dealerHandValue.toString() })
            .addFields({ name: "Your Hand", value: playerHand[0] + " & " + playerHand[1]})
            .addFields({ name: "Value: ", value: playerHandValue.toString() })

        message.channel.send({embeds: [embed]});
        let botMessage = "Would you like to hit or stay?";
        

        if (playerHandValue === 21 && dealerHandValue === 21) {
            message.channel.send('Both you and the dealer have blackjack! It\'s a tie!');
            win = true;
            readFile(user, 10, win);
        } else if (playerHandValue === 21) {
            message.channel.send('You have blackjack! You win 25 tokens!');
            win = true;
            readFile(user, 25, win);
        } else if (dealerHandValue === 21) {
            message.channel.send(`Dealer's face-down card was ${dealerHand[1]}.`);
            message.channel.send('Dealer has blackjack! You lose 10 tokens!');
        } else {
            message.channel.send(botMessage);
            let playerTurn = true;

            const filter = message => message.author.id === message.author.id;
            let options = {
                max: 26,
                time: 150000
            };
            let collector = message.channel.createMessageCollector(options, filter);
    
            collector.on('collect', (message) => {
                if (message.author.bot) {return;}
                else if (message.content === "hit" || message.content === "stay"){
                    
                    if(message.content == "hit" && playerTurn){
                        playerHand.push(deck.shift());
                        const newPlayerHandValue = calculateHandValue(playerHand);
                        console.log(newPlayerHandValue);
                        if (newPlayerHandValue > 21) {
                            message.channel.send(`Your hand value is ${newPlayerHandValue}. You bust!`);
                            playerTurn = false;
                            collector.stop();
                            return;
                        } else if (newPlayerHandValue === 21) {
                            message.channel.send(`Your hand value is ${newPlayerHandValue}. You have BLACKJACK! You win 25 tokens`);
                            playerTurn = false;
                            collector.stop();
                            win = true;
                            readFile(user, 25, win);
                            return;
                        } else {
                            message.channel.send(`Your hand: ${playerHand.join(', ')}.`);
                            message.channel.send(`With a value of ${newPlayerHandValue}. Do you want to hit or stay?`)
                        }
                    } else if (message.content === "stay" || !(playerTurn)) {
                        message.channel.send(`Dealer's face-down card was ${dealerHand[1]}.`);
                        const newPlayerHandValue = calculateHandValue(playerHand);
                        message.channel.send(`Your hand value is ${newPlayerHandValue}.`);
                        playerTurn = false;
                        collector.stop();

                        let newDealerHandValue = calculateHandValue(dealerHand);
                        while (newDealerHandValue < 17) {
                            // Dealer draws a card
                            dealerHand.push(deck.shift());
                            message.channel.send(`Dealer's hand: ${dealerHand.join(', ')}`);
                            // Calculate new hand value
                            let newDealerHandValue = calculateHandValue(dealerHand);
                            // Check if dealer busts
                            if (newDealerHandValue > 21) {
                                message.channel.send(`Dealer's hand value is ${newDealerHandValue}. Dealer busts! You win 10 tokens!`);
                                win = true;
                                readFile(user, 20, win);
                                return;
                            }

                        }

                    }
                    
                }
            });
    
            collector.on('end', (collected) => {
                console.log(`Collected ${collected.size} items`);
                // Compare hand values
                const newPlayerHandValue = calculateHandValue(playerHand);
                if(newPlayerHandValue > 21){/* message.channel.send(`You bust!`); */ return;}
                if(newPlayerHandValue == 21) { return; }
                else{
                    const finalPlayerHandValue = calculateHandValue(playerHand);
                    const finalDealerHandValue = calculateHandValue(dealerHand);
                
                    if (finalPlayerHandValue > finalDealerHandValue) {
                        message.channel.send(`Your hand value is ${finalPlayerHandValue}. Dealer's hand value is ${finalDealerHandValue}. You win 10 tokens!`);
                        win = true;
                        readFile(user, 20, win);
                    } else if (finalPlayerHandValue < finalDealerHandValue) {
                        message.channel.send(`Your hand value is ${finalPlayerHandValue}. Dealer's hand value is ${finalDealerHandValue}. You lose!`);
                    } else {
                        message.channel.send(`Your hand value is ${finalPlayerHandValue}. Dealer's hand value is ${finalDealerHandValue}. It's a tie!`);
                    }
                }
            });   
        }

    }
}

function readFile(user, bet, win){
    fs.readFile(`./commands/fun/tokens/${user}.txt`, 'utf8', (err, data) => {
        if (err) {
          console.error(err);
        } else {
            if(!win){
                const bank = parseInt(data);
                const newBank = bank - bet;
                console.log("bank: " + bank);
                console.log("newbank: " + newBank);
                fs.writeFile(`./commands/fun/tokens/${user}.txt`, newBank.toString(), (err) => {
                    if (err) {
                        console.error(err);
                    }
                });
            }
            else{
                const bank = parseInt(data);
                const newBank = bank + bet;
                console.log("bank: " + bank);
                console.log("newbank: " + newBank);
                fs.writeFile(`./commands/fun/tokens/${user}.txt`, newBank.toString(), (err) => {
                    if (err) {
                        console.error(err);
                    }
                });
            }
        }
    });
}

function deckCreator(){
    
    // Define card suits
    const cardSuits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    
    // Define deck
    let deck = [];
    
    // Create deck
    for (const value in cardValues) {
        for (const suit of cardSuits) {
            deck.push(`${value} of ${suit}`);
        }
    }
    
    // Shuffle deck
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    
    return deck;
  
}

function calculateHandValue(hand) {
    let value = 0;
    let numAces = 0;
    for (const card of hand) {
      const cardValue = card.split(' ')[0];
      if (cardValue === 'Ace') {
        numAces++;
      }
      value += cardValues[cardValue];
    }
    while (numAces > 0 && value > 21) {
      value -= 10;
      numAces--;
    }
    return value;
}

function dealCards(deck) {
    const playerHand = [deck.shift(), deck.shift()];
    const dealerHand = [deck.shift(), deck.shift()];
    return [playerHand, dealerHand];
}