module.exports = {
  name: "define",
  description: "Gimme a word and I'll define it. E.g. `-define banana`",
  enabled: false,

  execute(message, args) {
    //
    // TODO: Exit the method if there is no argument
    //       and send error to console and discord
    //

    const Dictionary = require("oxford-dictionary");

    // Create a new Dictionary object
    const dict = new Dictionary(
      require("../../process.json").env["oxford-api-config"]
    );

    // lookup the definition of the first argument
    const lookup = dict.definitions(args[0]);

    lookup.then(
      function (response) {
        //
        // TODO: Send the definition to discord.
        //       Analyse the JSON response to check
        //       where the definition is
        //
      },
      function (error) {
        console.log(error);
        //
        // TODO: Send error message to discord
        //
      }
    );
  },
};
