const dreidel = ["Nun", "Gimel", "Hey", "Shin"];

module.exports = {
  name: "dreidel",
  description: "Hanukkah Matata",
  enabled: true,

  execute(message, args, commands) {
    // spin the dreidel and send the result (random num between 0 and 3)
    message.channel.send(dreidel[Math.floor(Math.random() * (3 - 0 + 1))]);
  },
};
