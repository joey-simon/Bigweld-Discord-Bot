module.exports = {
  name: "define",
  description: "Gimme a word and I'll define it. E.g. `-define banana`",
  enabled: true,

  execute(message, args) {
    // If no arguments were provided
    if (!args.length) {
      // Alert the author and exit this method
      return message.channel.send(
        `You didn't provide a word for me to define, ${message.author}`
      );
    }

    message.channel.sendTyping();

    const Dictionary = require("oxford-dictionary");

    // Create a new Dictionary object with the necessary config
    const dict = new Dictionary(JSON.parse(process.env.OXFORD_API_CONFIG));

    // lookup the definition of the first argument
    const lookup = dict.definitions(args[0]);

    lookup.then(
      function (response) {
        // Just because there was a response does not mean that there is a defintion
        // E.g. The word 'Riley' has a response but there is no defintion
        // This causes the Bot to crash when it is trying access a defintion that does not exist
        // so it is important to check that a definiton for the word exists before proceeding
        if (response.results[0].lexicalEntries[0].entries === undefined) {
          console.log(`There is no definition for the word ${args[0]}`);
          return message.channel.send(
            `There is no definiton for the word '${args[0]}', ${message.author}`
          );
        }

        // set the lexical category to the first one in the JSON response
        const lexicalCategory =
          response.results[0].lexicalEntries[0].lexicalCategory.text;
        // set the definition to the first one in the JSON response
        const definition =
          response.results[0].lexicalEntries[0].entries[0].senses[0]
            .definitions[0];
        // send the lexical category as well as the definition
        message.channel.send(
          `${
            args[0].charAt(0).toUpperCase() + args[0].slice(1)
          } (${lexicalCategory}):\n${definition}`
        );
      },
      function (error) {
        // send an error to the console and to the author of the message
        console.log(error);
        message.channel.send(`${error} ${message.author}`);
      }
    );
  },
};
