module.exports = {
  name: "ping",
  description: `Send a ping to make sure I'm not sleeping or dead lol`,
  execute(message, args) {
    message.channel.send("pong!");
  },
};
