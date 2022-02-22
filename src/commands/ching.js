module.exports = {
  name: "ching",
  description: `Send a ching to make sure I'm not sleeping or dead lol`,
  enabled: true,

  execute(message, args) {
    message.channel.send("chong!");
  },
};
