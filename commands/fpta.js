let Parser = require('rss-parser');
let parser = new Parser();
const fs = require('fs');



module.exports.run = async (bot, message, args) => {


  let feed = await parser.parseURL('https://www.fpta.pt/feed/');
  // https://www.fpta.pt/feed/
  let send_message = "";




  console.log('\n' + feed.title);

  for await (const item of feed.items) {
  
    send_message = send_message + '\n ' + item.title + ' : ' + item.link;
    console.log(item.title + ' : ' + item.link + " + guid: + " + item.guid);
  };
  
  if (send_message !== "") message.channel.send(send_message);
  else message.channel.send("Não há nenhuma novidade")


};
module.exports.help = {
  name: "FPTA",
  command: "fpta",
  aliases: ["flecha"],
};