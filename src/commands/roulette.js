const path = require("path");

module.exports = {
  name: "roulette",
  description: `Play russian roulette by yourself, or @ someone you want to challenge`,
  enabled: false,

  execute(message, args) {
    // check if the author has mentioned someone they want to challenge
    if (message.mentions.members.first()) {
      const otherPlayer = message.mentions.members.first().user;

      // check if the mention was a bot
      if (otherPlayer.bot) {
        return message.channel.send(
          `You cannot challenge a bot, ${message.author}`
        );
        // check if the author mentioned themself
      } else if (otherPlayer.id == message.author.id) {
        return message.channel.send(
          `You cannot challenge yourself, ${message.author}`
        );
      }
      // the roulette gamemode must be twoPlayer since the mention was valid
      twoPlayer(message, otherPlayer);
    } else {
      // the roulette gamemode must be singleplayer since nobody was mentioned
      singlePlayer(message);
    }
  },
};

singlePlayer = (message) => {
  message.channel.sendTyping();
  message.channel.send({
    files: [
      {
        attachment: path.join(__dirname, "rick-roll.gif"),
        name: "rick-roll.gif",
        description: "Get rick rolled lol",
      },
    ],
  });
};

twoPlayer = (message, otherPlayer) => {
  // const {
  //   MessageActionRow,
  //   MessageButton,
  //   MessageEmbed,
  // } = require("discord.js");

  message.channel.send("Two player roulette is coming soon...");

  // const embed = new MessageEmbed()
  //   .setTitle(`Do you accept this challenge, ${otherPlayer.username}?`)
  //   .setColor("BLURPLE");
  // const acceptButton = new MessageButton()
  //   .setCustomId("accept")
  //   .setLabel("Accept")
  //   .setStyle("SUCCESS");
  // const declineButton = new MessageButton()
  //   .setCustomId("decline")
  //   .setLabel("Decline")
  //   .setStyle("DANGER");
  // const row = new MessageActionRow().addComponents([
  //   acceptButton,
  //   declineButton,
  // ]);

  //
  // TODO: Send this message only to the person who the author wants to duel
  //
  // message.channel.send({
  //   embeds: [embed],
  //   components: [row],
  // });
};
