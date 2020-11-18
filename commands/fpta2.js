let Parser = require('rss-parser');
let parser = new Parser();
const fs = require('fs');



module.exports.run = async (bot, message, args) => {



    let mostRecent = 0;
    console.log("most recent = " + mostRecent)
    let newMostRecent = mostRecent;



    let send_message = "";
    let feed = await parser.parseURL('https://www.fpta.pt/feed/');

    for await (const item of feed.items) {
        console.log(item.title + ' : ' + item.link + " + guid: +" + item.guid);
        send_message = send_message + '\n ' + item.title + ' : ' + item.link;
    };

    if(send_message !== "")message.channel.send(send_message) ;
    else message.channel.send("There is nothing new")


    /*
     
   
   
   
   
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
    
     console.log("The most recent is " + mostRecent.mostRecent)
     
     
     if(send_message !== "")message.channel.send(send_message) ;
     else message.channel.send("There is nothing new")
   */

};

module.exports.help = {
    name: "FPTA2",
    command: "fpta2",
    aliases: ["flecha2"],
};