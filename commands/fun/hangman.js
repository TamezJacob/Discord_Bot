module.exports = {
    name: "hangman",
    category: "info",
    permissions: [],
    devOnly: false,
    run: async ({ client, message, args }) => {
        const countries = [
            "afghanistan", "albania", "algeria", "andorra", "angola", "argentina", "armenia",
            "australia", "austria", "azerbaijan", "bahamas", "bahrain", "bangladesh", "barbados",
            "belarus", "belgium", "belize", "benin", "bhutan", "bolivia", "bosnia", "botswana",
            "brazil", "brunei", "bulgaria", "burkina", "burundi", "cambodia", "cameroon", "canada",
            "chad", "chile", "china", "colombia", "comoros", "congo", "croatia", "cuba", "cyprus",
            "denmark", "ejibouti", "ecuador", "egypt", "eritrea", "estonia", "ethiopia", "fiji",
            "finland", "france", "gabon", "gambia", "georgia", "germany", "ghana", "greece", "grenada",
            "guatemala", "guinea", "guyana", "haiti", "honduras", "hungary", "iceland", "india", "indonesia",
            "iran", "iraq", "ireland", "israel", "italy", "ivory", "jamaica", "japan", "jordan", "kazakhstan",
            "kenya", "kiribati", "kosovo", "kuwait", "kyrgyzstan", "laos", "latvia", "lebanon", "lesotho", "liberia",
            "libya", "liechtenstein", "lithuania", "luxembourg", "macedonia", "madagascar", "malawi", "malaysia",
            "maldives", "mali", "malta", "mauritania", "mauritius", "mexico", "micronesia", "moldova", "monaco",
            "mongolia", "montenegro", "morocco", "mozambique", "myanmar", "namibia", "nauru", "nepal", "netherlands",
            "nicaragua", "niger", "nigeria", "norway", "oman", "pakistan", "palau", "panama", "paraguay", "peru",
            "philippines", "poland", "portugal", "qatar", "romania", "russia", "rwanda", "samoa", "senegal", "serbia",
            "seychelles", "singapore", "slovakia", "slovenia", "somalia", "spain", "sudan", "suriname", "swaziland",
            "sweden", "switzerland", "syria", "taiwan", "tajikistan", "tanzania", "thailand", "togo", "tonga", "tunisia",
            "turkey", "turkmenistan", "tuvalu", "uganda", "ukraine", "uruguay", "uzbekistan", "vanuatu", "venezuela",
            "vietnam", "yemen", "zambia", "zimbabwe"
        ];

        random = (Math.floor(Math.random() * 512) % countries.length);
        word = countries[random];
        wrongs = 0;
        const guessed = [];
        const lettersOfWord = Array.from(word);
        const wrongCount = [];

        console.log(word);
        printDisplay(word, wrongs, guessed, message)

        const filter = message => message.author.id === message.author.id;
        let options = {
            max: 26,
            time: 150000
        };
        let collector = message.channel.createMessageCollector(options, filter);

        collector.on('collect', (message) => {
            let num = game(lettersOfWord, wrongs, guessed, message, message.content, wrongCount);
            if (num > 4) { collector.stop(); message.reply('Game Over'); }
        });

        collector.on('end', (collected) => {
            console.log(`Collected ${collected.size} items`);
        });

    }
}

function game(lettersOfWord, wrongs, guessed, message, letterGuessed, wrongCount) {

    if (letterGuessed.includes('`') || letterGuessed.includes('|') || letterGuessed.includes('‾') || letterGuessed.includes('_')) { return; }
    guessed.push(letterGuessed);
    found = false;
    for (let i = 0; i < lettersOfWord.length; i++) {
        if (letterGuessed == lettersOfWord[i]) {
            found = true;
            break;
        }
    }
    if (!found) { wrongCount.push(letterGuessed); wrongs += wrongCount.length; }
    else { found = false; }
    printDisplay(word, wrongs, guessed, message)
    return wrongs;

}

async function printDisplay(word, wrongs, guessed, message) {
    message.reply('```'
        + '|‾‾‾‾‾‾|   \n|     '
        + (wrongs > 0 ? '🎩' : ' ')
        + '   \n|     '
        + (wrongs > 1 ? '😟' : ' ')
        + '   \n|     '
        + (wrongs > 2 ? '👕' : ' ')
        + '   \n|     '
        + (wrongs > 3 ? '🩳' : ' ')
        + '   \n|    '
        + (wrongs > 4 ? '👞👞' : ' ')
        + '   \n|     \n|__________\n\n'
        + word.split('').map(l => guessed.includes(l) ? l : '_').join(' ')
        + '```');

}