const settings = require("../bot/settings.json");
const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
const activity = "Ping me";
const fpta = require("../commands/fpta2.js")

module.exports = async bot => {
  bot.user.setActivity(activity);

  bot.me = bot.users.get("265122531114090496"); // bot.me é meu id
  console.log("Bot is loading...\n");

  console.log("Bot Username: " + bot.user.tag);
  console.log("Bot ID: " + bot.user.id);
  console.log("Users: " + bot.users.size);
  console.log("Servers: " + bot.guilds.size);

  console.log("Bot has been successfully loaded.");

  fpta.run(bot)

  let pings = 0;
  setInterval(() => {
    pings++;

    require('node-fetch')('https://isitup.org/archery-t.glitch.me.json/').then(() => console.log(`[${pings}] Ping`));
  }, 5 * 60 * 1000);

  setInterval(runHooks, 3600000); //  each hour -> 3600000

  function runHooks() {
    fpta.run(bot)
  }
};

module.exports.help = {
  name: "Ready",
  event: "ready"
};
