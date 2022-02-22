module.exports = {
  name: "help",
  description: "Provides a list of my dope commands",
  enabled: true,

  execute(message, args, commands) {
    // empty string that will store all commands and descriptions
    let commandList = "";
    // loop through each of the commands
    commands.forEach((command) => {
      // add the command name and description to the list if it's enabled
      if (command.enabled) {
        commandList +=
          "`-" + command.name + "`    " + command.description + "\n";
      }
    });
    // send the list of enabled commands
    message.channel.send(commandList);
  },
};
