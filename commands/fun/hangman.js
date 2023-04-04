module.exports = {
    name: "hangman",
    category: "info",
    permissions: [],
    devOnly: false,
    run: async ({client, message, args}) => {
        const countries = [
            "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Argentina", "Armenia",
            "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh",  "Barbados",
            "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia", "Botswana",
            "Brazil", "Brunei", "Bulgaria", "Burkina", "Burundi", "Cambodia", "Cameroon", "Canada",
            "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Croatia", "Cuba", "Cyprus",
            "Denmark", "Djibouti", "Ecuador", "Egypt", "Eritrea", "Estonia", "Ethiopia", "Fiji", 
            "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada",
            "Guatemala", "Guinea", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia",
            "Iran", "Iraq", "Ireland", "Israel", "Italy", "Ivory",  "Jamaica", "Japan", "Jordan", "Kazakhstan",
            "Kenya", "Kiribati", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia",
            "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macedonia", "Madagascar", "Malawi", "Malaysia",
            "Maldives", "Mali", "Malta", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", 
            "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands",
            "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Paraguay", "Peru",
            "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Samoa", "Senegal", "Serbia",
            "Seychelles", "Singapore", "Slovakia", "Slovenia", "Somalia", "Spain", "Sudan", "Suriname", "Swaziland",
            "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo", "Tonga", "Tunisia",
            "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela",
            "Vietnam", "Yemen", "Zambia", "Zimbabwe"
        ];

        random = (Math.floor(Math.random() * 512) % countries.length);
        word = countries[random]
        wrongs = 0;
        const guessed = [];
        const lettersOfWord = Array.from(word);

        console.log(word);
        for(let i = 0; i > lettersOfWord.length; i++){
            console.log(lettersOfWord[i]);
            console.log(countries[i]);
        }
        printDisplay(word, wrongs, guessed, message);

        const filter = message => message.author.id === message.author.id;
        let options = {
            max: 5,
            time: 1500
        };
        let collector = message.channel.createMessageCollector(filter, options);
        
        collector.on('collect', (message) => {
            //console.log(`Collected ${message.content}`);
            game(lettersOfWord, wrongs, guessed, message, message.content);
        });
    
        collector.on('end', (collected) => {
            console.log(`Collected ${collected.size} items`);
        });

    }
}

async function game(lettersOfWord, wrongs, guessed, message, letterGuessed){

    if (letterGuessed.includes('`') || letterGuessed.includes('|') || letterGuessed.includes('‾') || letterGuessed.includes('_')){ return; }
    console.log(letterGuessed);
    guessed.push(letterGuessed);
    found = false;
    for(let i = 0; i < lettersOfWord.length; i++){
        if(letterGuessed == lettersOfWord[i]){
            found = true;
            console.log('POG');
            break;
        }
    }
    if(!found) { wrongs += guessed.length; }
    else { found = false; }
    printDisplay(word, wrongs, guessed, message)
}

async function printDisplay(word, wrongs, guessed, message){
    console.log(wrongs);
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

    if(wrongs > 4){
        message.reply("Game Over");
        throw new Error();
    }
}