const settings = require("../bot/settings.json");

const fs = require("fs");
const ms = require("ms");

module.exports = async (bot, guild) => {

  let welcome = guild.channels.find(channel => channel.name === "welcome");

  console.log("I just connected to-> " + guild)

  if (welcome) {
    welcome.send("Hi everyone, now you can relax, i am here");
  } else {
    messsage.defaultChannel.send("Hi everione, now you can relax, i am here here");
  }
};

module.exports.help = { // when the bot joins one server
  name: "Join Server",
  event: "guildCreate"
};