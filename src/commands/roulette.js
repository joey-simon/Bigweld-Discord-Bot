const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");

// Array that will store all of the roulette sessions
let rouletteSessions = [];

module.exports = {
  name: "roulette",
  description: `Play by yourself, or @ someone you want to challenge`,
  enabled: true,

  interact(interaction) {
    // do not proceed if the interaction is invalid
    if (!validInteraction(interaction)) return;

    switch (interaction.customId) {
      case "acceptRoulette":
        acceptRoulette(interaction);
        break;
      case "declineRoulette":
        declineRoulette(interaction);
        break;
      case "shoot":
        shootButtonClicked(interaction);
        break;
      default:
        console.error("The customId of this button is unfamiliar!");
    }
  },

  execute(message, args) {
    // check if the author has mentioned someone they want to challenge
    if (message.mentions.members.first()) {
      const mentionedUser = message.mentions.members.first().user;

      // check if the mention was a bot
      if (mentionedUser.bot) {
        return message.channel.send(
          `You cannot challenge a bot, ${message.author}`
        );
        // check if the author mentioned themself
      } else if (mentionedUser.id == message.author.id) {
        return message.channel.send(
          `You cannot challenge yourself, ${message.author}`
        );
      }
      // the roulette gamemode must be twoPlayer since the mention was valid
      twoPlayer(message, mentionedUser);
    } else {
      // the roulette gamemode must be singleplayer since nobody was mentioned
      singlePlayer(message);
    }
  },
};

const singlePlayer = (message) => {
  // if the chamber is spun and there are no blanks before the bullet
  if (spinChamber() === 0) {
    return message.channel.send(`${message.author.username} died!`);
  }

  message.channel.send(`${message.author.username} lived!`);
};

const twoPlayer = (message, mentionedUser) => {
  // send an accept/decline message with two buttons
  const embed = new MessageEmbed()
    .setTitle(`Do you accept this challenge, ${mentionedUser.username}?`)
    .setColor("BLURPLE");
  const acceptButton = new MessageButton()
    .setCustomId("acceptRoulette")
    .setLabel("Accept")
    .setStyle("SUCCESS");
  const declineButton = new MessageButton()
    .setCustomId("declineRoulette")
    .setLabel("Decline")
    .setStyle("DANGER");
  const row = new MessageActionRow().addComponents([
    acceptButton,
    declineButton,
  ]);

  message.channel
    .send({
      embeds: [embed],
      components: [row],
    })
    .then((sent) => {
      // add a sessionId property to the accept/decline message
      sent["sessionId"] = sent.id;
      // add an indendedUser property to the accept/decline message
      sent["intendedUser"] = mentionedUser;
      // The accept/decline message ID will be used as the sessionId
      createNewRouletteSession(sent.id, message, mentionedUser);
    });
};

const acceptRoulette = (interaction) => {
  console.log(`roulette was accepted by ${interaction.user.username}`);
  interaction.channel.send(
    `${interaction.user.username} accepted the challenge!`
  );

  const sessionIndex = getSessionIndex(interaction.message.sessionId);

  // exit this message if the session no longer exists
  if (sessionIndex === -1) return;

  // Delete the accept/decline buttons
  interaction.update({ components: [] });

  // Send a shoot message with a SHOOT button
  sendShootButton(interaction);
};

const declineRoulette = (interaction) => {
  console.log(`roulette was declined by ${interaction.user.username}`);

  interaction.channel.send(
    `${interaction.user.username} declined the challenge. What a bitch!`
  );

  const sessionIndex = getSessionIndex(interaction.message.sessionId);

  if (sessionIndex != -1) {
    // Remove the session from rouletteSessions
    rouletteSessions.splice(sessionIndex, 1);
  }

  // Delete the accept/decline buttons
  interaction.update({ components: [] });
};

const createNewRouletteSession = (sessionId, message, mentionedUser) => {
  // add a new roulette session to the array
  rouletteSessions.push({
    sessionId: sessionId,
    shots: 0,
    blanks: spinChamber(),
    challenger: message.author,
    contender: mentionedUser,
  });
};

const validInteraction = (interaction) => {
  // Return false if the session does not exist
  if (getSessionIndex(interaction.message.sessionId) === -1) {
    console.log(`The session for that interaction does NOT exist!`);
    return false;
  }

  // Return false if the interaction was not by the intended user
  if (interaction.user.id != interaction.message.intendedUser.id) {
    console.log(
      `${interaction.user.username} was not the intended user for that interaction`
    );
    return false;
  }

  // the interaction must be valid if it passed the above checks
  return true;
};

const sendShootButton = (interaction) => {
  const shootButton = new MessageButton()
    .setCustomId("shoot")
    .setLabel("SHOOT")
    .setStyle("PRIMARY");

  const row = new MessageActionRow().addComponents([shootButton]);

  const sessionIndex = getSessionIndex(interaction.message.sessionId);

  // Exit this method if the session does not exist
  if (sessionIndex === -1) return;

  let intendedUser = undefined;

  // the challenger will always shoot when the number of shots fired is even
  if (rouletteSessions[sessionIndex].shots % 2 === 0) {
    intendedUser = rouletteSessions[sessionIndex].challenger;
  } else {
    intendedUser = rouletteSessions[sessionIndex].contender;
  }

  interaction.channel
    .send({
      content: `**➥ Your turn** ${intendedUser}`,
      components: [row],
    })
    .then((sent) => {
      // add a sessionId property to the accept/decline message
      sent["sessionId"] = interaction.message.sessionId;
      // add an indendedUser property to the accept/decline message
      sent["intendedUser"] = intendedUser;
    });
};

const shootButtonClicked = (interaction) => {
  // Delete the shoot button
  interaction.update({
    components: [],
  });

  const sessionIndex = getSessionIndex(interaction.message.sessionId);

  // Exit this method if the session does not exist
  if (sessionIndex === -1) return;

  // increment the number of shots by 1
  rouletteSessions[sessionIndex].shots++;

  // check if there are no more blanks before the bullet
  if (rouletteSessions[sessionIndex].blanks === 0) {
    // send message saying who died
    interaction.channel.send(`${interaction.user.username} died!`);
    // remove the session from the array
    rouletteSessions.splice(sessionIndex, 1);
  } else {
    // decrement the number of blanks until the bullet
    rouletteSessions[sessionIndex].blanks--;
    // send another shoot button
    sendShootButton(interaction);
  }
};

const spinChamber = () => {
  // Returns a random number of blanks before the bullet
  // Specifically, a random number between 0 and 5 (both inclusive)
  return Math.floor(Math.random() * (5 - 0 + 1));
};

const getSessionIndex = (sessionId) => {
  // returns the index of a session when it is given the sessionId
  // if the session cannot be found, -1 is returned
  return rouletteSessions.findIndex(
    (rouletteSessions) => rouletteSessions.sessionId === sessionId
  );
};
