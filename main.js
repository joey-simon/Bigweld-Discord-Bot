const Discord = require('discord.js');
const fs = require('fs');

const client = new Discord.Client({
    intents: [ Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES ]
  })
  
// this prefix must be in front of any bot command
const prefix = '-';
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for(const file of commandFiles){
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('Bigweld is online');
});

client.on('messageCreate', message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'ping') {
      client.commands.get('ping').execute(message, args);
    } else if (command === 'spellingbee') {
        client.commands.get('spelling bee').execute(message, args);
    } else if (command === 'letterboxed') {
        client.commands.get('letter boxed').execute(message, args);
    } else if (command === 'sudoku') {
      // if the command has no arguments
      if (!args.length) {
        // send an error message
        return message.channel.send(`You didn't provide any arguments, ${message.author}`);
      }
      // execute the command if the argument is one of the following
      switch (args[0]) {
        case 'easy':
        case 'medium':
        case 'hard':
          client.commands.get('sudoku').execute(message, args);
          break;
        default:
          message.channel.send(`You didn't provide any correct arguments, ${message.author}`);
      }
    }
});

client.login('OTI3ODEyNzA2MTY0MTcwODAz.YdPq6w.hgpfZRuG1sVzevF3wEDzBTBWPZU');