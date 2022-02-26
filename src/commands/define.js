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

    const Dictionary = require("oxford-dictionary");

    // Create a new Dictionary object with the necessary config
    const dict = new Dictionary(JSON.parse(process.env.OXFORD_API_CONFIG));

    // lookup the definition of the first argument
    const lookup = dict.definitions(args[0]);

    lookup.then(
      function (response) {
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
