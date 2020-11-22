const settings = require("../bot/settings.json");
const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
const activity = "Ping me";
const fpta = require("../commands/fpta2.js")
const warchery = require("../commands/warchery2.js")

module.exports = async bot => {
  bot.user.setActivity(activity);

  bot.me = bot.users.get("265122531114090496"); // bot.me é meu id
  console.log("Bot is loading...\n");

  console.log("Bot Username: " + bot.user.tag);
  console.log("Bot ID: " + bot.user.id);
  console.log("Users: " + bot.users.size);
  console.log("Servers: " + bot.guilds.size);

  console.log("Bot has been successfully loaded.");

  await fpta.run(bot)
  await warchery.run(bot)


  setInterval(runHooks, 3600000); //  each hour -> 3600000

  async function runHooks() {
    await fpta.run(bot)
    await warchery.run(bot)
  }
};

module.exports.help = {
  name: "Ready",
  event: "ready"
};
