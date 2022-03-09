module.exports = {
  name: "sudoku",
  description: "`easy/medium/hard` Solution for the nytimes Sudoku",
  enabled: true,

  execute(message, args) {
    const validArgs = ["easy", "medium", "hard"];

    // If no arguments were provided
    if (!args.length) {
      // Alert the author and exit this method
      return message.channel.send(
        `You didn't provide any arguments, ${message.author}`
      );
    } else if (!validArgs.includes(args[0])) {
      // Send an error message if no relevant arguments were provided
      return message.channel.send(
        `You didn't provide a relevant argument, ${message.author}`
      );
    }

    const request = require("request");
    const cheerio = require("cheerio");

    message.channel.sendTyping();

    request(
      "https://www.nytimes.com/puzzles/sudoku/easy",
      (error, response, html) => {
        if (!error && response.statusCode == 200) {
          const $ = cheerio.load(html);
          // get the html element that has the solution for the sudoku
          let solution = $(
            `.pz-game-screen script[type="text/javascript"]`
          ).html();
          // remove all of the unnecessary code before the difficulty level (args[0])
          solution = solution.slice(solution.indexOf(`"${args[0]}":`));
          // remove all of the unnecessary code before the solution
          solution = solution.slice(solution.indexOf('"solution":[') + 12);
          // remove all of the unnecessary code after the solution
          solution = solution.slice(0, solution.indexOf("]"));
          // store the answers in an array
          const answers = solution.split(",");
          // prepare the solution to be reused
          solution = "` ";
          // create an undefined element at the beginning of answers
          answers.unshift(undefined);

          for (let i = 1; i < answers.length; i++) {
            solution += answers[i] + " ";
            if (i % 27 === 0) {
              // unless the index is 81, add a horizontal divider
              solution +=
                i === 81 ? "`" : "`\n~~`       │       │       `~~\n` ";
            } else if (i % 9 === 0) {
              // at the end of a line, go the next line
              solution += "`\n` ";
            } else if (i % 3 === 0) {
              // at the end of a square, add a vertical divider
              solution += "│ ";
            }
          }
          // send out the answers as one big message
          message.channel.send(solution);
        }
      }
    );
  },
};
