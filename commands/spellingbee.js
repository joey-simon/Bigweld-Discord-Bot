module.exports = {
    name: 'spelling bee',
    description: 'sends the answers for the nytimes spelling bee',
    execute(message, args){
        const request = require('request');
        const cheerio = require('cheerio');

        request('https://www.nytimes.com/puzzles/spelling-bee', (error,
        response, html) => {
        if (!error && response.statusCode == 200){
            const $ = cheerio.load(html);
            // convert the html to a string
            let answers = $('*').html().toString();
            // remove all of the unnecessary code before the answers
            answers = answers.slice(answers.indexOf('"answers":') + 12);
            // remove all of the unnecessary code after the answers
            answers = answers.slice(0, answers.indexOf(']') - 1);
            // store the answers in an array
            const answersArray = answers.split('","');
            // sort the array in descending order
            answersArray.sort((a,b) => b.length - a.length);
            // set answers to nothing so it can be reused
            answers = '';
            // add each answer to a new line in a string
            answersArray.forEach(answer => {
                answers += answer + "\n";
            });
            // send out the answers as one big message
            message.channel.send(answers);
        }
        })
    }
}