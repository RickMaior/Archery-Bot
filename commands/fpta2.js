let Parser = require('rss-parser');
let parser = new Parser();
const fs = require('fs');



module.exports.run = async (bot, message, args) => {

  if (message && !message.member.hasPermission("MANAGE_WEBHOOKS"))
  return message.channel.send("YOU HAVE NO PERMISSIONS");

  let rawdata = fs.readFileSync('bot/db2.json');
  let db = JSON.parse(rawdata);

  let mostRecent = parseInt(db.mostRecent) || 0;
  console.log("Saved = " + mostRecent )
  let newMostRecent = mostRecent;




  let feed = await parser.parseURL('https://www.fpta.pt/feed/');
  // https://www.fpta.pt/feed/
  let send_message = "";




  console.log('\n' + feed.title);

  for await (const item of feed.items) {

    var match = item.guid.match(/[0-9]+$/)
    if (match) {
      var guid = parseInt(match[0]);
      console.log("guid = " + guid)

      if (guid > mostRecent) {
        send_message = send_message + '\n ' + item.title + ' : ' + item.link;
        //console.log(item.title + ' : ' + item.link + " + guid: + " + guid);
        if (guid > newMostRecent) { newMostRecent = guid; }
      } //else console.log("too old + " + `${mostRecent} vs ` + guid)
    }
  };

  mostRecent = { mostRecent: newMostRecent };
  // db = mostRecent;
  console.log("The most recent is " + mostRecent.mostRecent)
  let data = JSON.stringify(mostRecent);
  fs.writeFileSync("bot/db2.json", data);  // obs:This works because the code is being run only once, if i need to read and write many times in a loop i need to do in a diferent way

  if (send_message !== "") {
    bot.fetchWebhook(process.env.WEBHOOKDATAID, process.env.WEBHOOKDATATOKEN)
    .then((webhook) => {
      webhook.send(send_message);
    })
    .catch((err) => {
      console.log(err)
    })
  }else{
    bot.fetchWebhook(process.env.WEBHOOKDATAID, process.env.WEBHOOKDATATOKEN)
    .then((webhook) => {
      webhook.send("No news for now - FPTA");
    })
    .catch((err) => {
      console.log(err)
    })
   
    console.log("No news for this time ")}



};
module.exports.help = {
  name: "FPTA2",
  command: "fpta2",
  aliases: ["flecha2"],
};