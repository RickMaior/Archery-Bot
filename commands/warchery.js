let Parser = require('rss-parser');
let parser = new Parser();




module.exports.run = async (bot, message, args) => {


  let feed = await parser.parseURL('https://worldarchery.org/news/latest/rss');
  // https://www.fpta.pt/feed/
  let send_message = "";




  console.log('\n' + feed.title);

  for await (const item of feed.items) {
      send_message = send_message + '\n ' + item.title + ' : ' + item.link;
      console.log(item.title + " " + item.guid + ' : ' + item.link);
  };



  if(send_message !== "")message.channel.send(send_message) ;
  else message.channel.send("There is nothing new")


};

module.exports.help = {
  name: "Warchery",
  command: "warchery",
  aliases: ["arrow","fpta"],
};