// Quote-A-Bot by Caleb Rodgers
// calebrodgers.com

// Setup Discord, the client, quotes, and dotenv
const Discord = require('discord.js');
const client = new Discord.Client();
const quotes = require('./quotes.json');
require('dotenv').config();

console.log('[🤖] Beep Boop! Quote-A-Bot Running!');

// Login the client to Discord
client.login(process.env.TOKEN);

client.on('ready', () => {
    console.log('[🤩] Bot successfully connected to Discord!');
});

// When a message is received
client.on('message', msg => {
    // Check if the bot is tagged
    if (msg.mentions.has(client.user)) {
        // Select a quote
        const quoteIndex = Math.floor(Math.random() * quotes.length);
        // Check if the quote has an author
        let anonymous = false;
        if (quotes[quoteIndex].author === null) {
            anonymous = true;
        }

        // Reply to the message with the quote and log it
        if(anonymous) {
            msg.reply('\n >>> Somebody once said that, \n ***\'' + quotes[quoteIndex].text + '\'***');
            console.log('[📝] Replied to ' + msg.author.username + '#' + msg.author.discriminator + ' on \'' + msg.guild.name + '\' with quote \'' + quotes[quoteIndex].text + '\' by Anonymous.');
        } else {
            msg.reply('\n >>> ' + quotes[quoteIndex].author + ' once said that, \n ***\'' + quotes[quoteIndex].text + '\'***');
            console.log('[📝] Replied to ' + msg.author.username + '#' + msg.author.discriminator + ' on \'' + msg.guild.name + '\' with quote \'' + quotes[quoteIndex].text + '\' by ' + quotes[quoteIndex].author + '.');
        }
    }
});