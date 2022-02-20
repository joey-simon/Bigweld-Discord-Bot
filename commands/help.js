module.exports = {
  name: "help",
  description: "Provides a list of my dope commands",
  execute(message, args, commands) {
    let commandList = "";
    commands.forEach((command) => {
      commandList += "`-" + command.name + "`    " + command.description + "\n";
    });
    message.channel.send(commandList);
  },
};
