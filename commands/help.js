module.exports = {
  name: "help",
  description: "Provides a list of my dope commands",
  hidden: false,

  execute(message, args, commands) {
    let commandList = "";
    commands.forEach((command) => {
      if (!command.hidden) {
        commandList +=
          "`-" + command.name + "`    " + command.description + "\n";
      }
    });
    message.channel.send(commandList);
  },
};
