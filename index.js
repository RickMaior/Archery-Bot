//Atualizaçao
//git add .
// git commit -m "lembrete de alteracao"
// git push origin master



require('dotenv').config()


const Discord = require("discord.js");
const { Client, Attachment } = require("discord.js");
const settings = require("./bot/settings.json");

const fs = require("fs");
const token = process.env.TOKEN;

const bot = new Client();


bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
bot.events = new Discord.Collection();


//Command Handler
fs.readdir("./commands/", (err, files) => {
  if (err) {
    console.error("An error has occured while loading commands: ");
    console.error(err);
  }

  let jsFile = files.filter(file => file.split(".").pop() == "js");
  if (jsFile.length < 0) {
    console.error("Couldn't load commands.");
    return;
  }

  jsFile.forEach((file, i) => {
    let props = require(`./commands/${file}`);
    console.log(`${props.help.name} command has been loaded.`);
    bot.commands.set(props.help.command, props);

    props.help.aliases.forEach(alias => {
      bot.aliases.set(alias, props.help.command);
    });
  });
});

//Event Handler
fs.readdir("./events/", (err, files) => {
  if (err) {
    console.error("An error has occured while loading events: ");
    console.error(err);
  }

  let jsFile = files.filter(file => file.split(".").pop() == "js");
  if (jsFile.length < 0) {
    console.error("Couldn't load events.");
    return;
  }

  jsFile.forEach((file, i) => {
    let props = require(`./events/${file}`);

    console.log(`${props.help.name} event has been loaded.`);
    bot.events.set(props.help.event, props);

    bot.on(props.help.event, props.bind(null, bot));
    delete require.cache[require.resolve(`./events/${file}`)];
  });
});

bot.login(token);