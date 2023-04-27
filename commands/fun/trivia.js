const fetch = require('node-fetch');
const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "trivia",
    category: "fun",
    permissions: [],
    devOnly: false,
    run: async ({client, message, args}) => {
        let getTrivia = async() =>{
            let result = await fetch('https://opentdb.com/api.php?amount=1&type=multiple');
            let json = await result.json()
            return json
        }
        let trivia = await getTrivia()

        const author = message.author.id;
        const question = trivia.results[0].question;

        const incorrectAnswers = trivia.results[0].incorrect_answers;
        const correctAnswer = trivia.results[0].correct_answer;

        const allAnswers = incorrectAnswers.concat(correctAnswer);

        for (let i = allAnswers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [allAnswers[i], allAnswers[j]] = [allAnswers[j], allAnswers[i]];
        }

        console.log(correctAnswer);

        const embed = new EmbedBuilder()
            .setTitle('What is the correct answer?')
            .setDescription(`${question}`)
            .setColor(0x0099FF)
            .addFields(
                { name: 'Option A:', value: allAnswers[0] },
                { name: 'Option B:', value: allAnswers[1] },
                { name: 'Option C:', value: allAnswers[2] },
                { name: 'Option D:', value: allAnswers[3] }
            );

        

        message.channel.send({embeds: [embed]});

        const filter = message => message.author.id === message.author.id;
        let options = {
            max: 2,
            time: 1500
        };
        let collector = message.channel.createMessageCollector({filter, max: 2});

        let state = false;

        collector.on('collect', (message) => {
            const selectedAnswerIndex = message.content.toLowerCase().charCodeAt(0) - 97;
            if(message.author.id === author){    
                if (allAnswers[selectedAnswerIndex] === correctAnswer) {
                    message.channel.send(`${message.author} is correct! The answer is ${correctAnswer}.`);
                    state = true;
                } else {
                    message.channel.send(`${message.author} is incorrect. Try again!`);
                }
            }
        });

        collector.on('end', (collected) => {
            console.log(`Collected ${collected.size} items`);
        });
    }
}
