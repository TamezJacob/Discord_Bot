const fetch = require('node-fetch')

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
        showQuestion(trivia.results[0]);

        message.reply(`
        ${trivia.results[0].question}

        A - ${trivia.results[0].incorrect_answers[0]}
        B - ${trivia.results[0].incorrect_answers[1]}
        C - ${trivia.results[0].incorrect_answers[2]}
        D -${trivia.results[0].correct_answer}
        `);
    }
}

function showQuestion(trivia){
    // https://www.youtube.com/watch?v=-cX5jnQgqSM
}