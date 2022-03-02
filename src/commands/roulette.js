module.exports = {
  name: "roulette",
  description: `Play russian roulette by yourself, or @ someone you want to challenge`,
  enabled: false,

  execute(message, args) {
    const {
      MessageActionRow,
      MessageButton,
      MessageEmbed,
    } = require("discord.js");

    // determine if the roulette game will be single or two player
    if (!args.length) {
      singlePlayer(message);
    } else {
      twoPlayer(message);
    }
  },
};

function singlePlayer(message) {
  message.channel.send("Single player roulette is coming soon...");
}

function twoPlayer(message) {
  //
  // TODO: Exit this method and alert the player if the
  //       first argument is NOT a member in the server
  //       OR the first argument is themself
  //

  let otherPlayer; // will store the ID of the challenged user

  // if the author did mention someone they wanted to challenge
  if (message.mentions.members.first()) {
    // store the id of the challenged member
    otherPlayer = message.mentions.members.first().user.id;
    message.channel.send("Two player roulette is coming soon...");
  } else {
    console.log("there was no mention");
  }

  // const embed = new MessageEmbed()
  //   .setTitle("Do you accept this challenge?")
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
  // message.channel.send({ embeds: [embed], components: [row] });
}
