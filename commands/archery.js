let Parser = require('rss-parser');
let parser = new Parser();
const fs = require('fs');



module.exports.run = async (bot, message, args) => {

let rawdata = fs.readFileSync('bot/db.json');
let db = JSON.parse(rawdata);

  let mostRecent = parseInt(db.mostRecent) || 0;
  console.log("most recent = " + mostRecent + "+ " + db.mostRecent)
  let newMostRecent = mostRecent;




  let feed = await parser.parseURL('https://worldarchery.org/news/latest/rss');
  // https://www.fpta.pt/feed/
  let send_message = "";




  console.log('\n' + feed.title);

  for await (const item of feed.items) {
    guid = parseInt(item.guid)
    if (guid > mostRecent) {
      send_message = send_message + '\n ' + item.title + ' : ' + item.link;
      console.log(item.title + " " + guid + ' : ' + item.link);
      if (guid > newMostRecent) { newMostRecent = guid; }
    } else console.log("too old + " + `${mostRecent} vs ` + guid)

  };

  mostRecent = { mostRecent: newMostRecent };
 // db = mostRecent;
  console.log("The most recent is " + mostRecent.mostRecent)
  let data = JSON.stringify(mostRecent);
  fs.writeFileSync("bot/db.json", data);  // obs:This works because the code is being run only once, if i need to read and write many times in a loop i need to do in a diferent way

  if(send_message !== "")message.channel.send(send_message) ;
  else message.channel.send("There is nothing new")


};

module.exports.help = {
  name: "Archery",
  command: "archery",
  aliases: ["arrow"],
};