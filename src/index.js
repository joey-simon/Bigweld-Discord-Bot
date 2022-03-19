require("dotenv").config();
const Discord = require("discord.js");
const fs = require("fs");

const client = new Discord.Client({
  intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES],
});

// this prefix must be in front of any bot command
const prefix = "-";
client.commands = new Discord.Collection();
const commandFiles = fs
  .readdirSync("./src/commands/")
  .filter((file) => file.endsWith(".js"));

// loop through each of the command files
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  // skip the command if it is disabled
  if (!command.enabled) continue;
  client.commands.set(command.name, command);
}

client.once("ready", () => {
  console.log("Bigweld is online");
});

// Even listener for messages
client.on("messageCreate", (message) => {
  // exit this method if the message does not start with the preifx or the author is a bot
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).toLowerCase().split(/ +/);
  const command = args.shift();

  // exit this method if the command is not valid or is disabled
  if (!client.commands.has(command)) return;

  try {
    // trys to run the command
    client.commands.get(command).execute(message, args, client.commands);
  } catch (error) {
    // if there is an issue running the command, print error message
    console.error(error);
    message.reply("there was an error trying to execute that command!");
  }
});

// Event listener for interactions
client.on("interactionCreate", (interaction) => {
  if (!interaction.isButton()) return;

  // handle the button click
  switch (interaction.customId) {
    case "acceptRoulette":
    case "declineRoulette":
      client.commands.get("roulette").interact(interaction);
      break;

    default:
      console.error("What kinda button are you pressing bro?");
  }
});

client.login(process.env.BOT_TOKEN);
