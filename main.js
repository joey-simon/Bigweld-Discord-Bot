const Discord = require("discord.js");
const fs = require("fs");

const client = new Discord.Client({
  intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES],
});

// this prefix must be in front of any bot command
const prefix = "-";
client.commands = new Discord.Collection();
const commandFiles = fs
  .readdirSync("./commands/")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.once("ready", () => {
  console.log("Bigweld is online");
});

client.on("messageCreate", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  // ensures that the command is valid
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

client.login("OTI3ODEyNzA2MTY0MTcwODAz.YdPq6w.hgpfZRuG1sVzevF3wEDzBTBWPZU");
