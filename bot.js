const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = '!';

client.once('ready', () => {
	console.log("The bot is now online");
});

client.on('message', message =>{
	if(!message.author.bot && message.channel.name == "bots-quiet-space"){
		switch (Math.floor(Math.random() * 7)) {
			case 0:
				message.channel.send('stahp talking its annoying');
				break;
			case 1:
				message.channel.send('Man you blabbermouths stop talking!');
				break;
			case 2:
				message.channel.send('why do humans have to talk so much');
				break;
			case 3:
				message.channel.send('cant you respect a bots quiet space???');
				break;
			case 4:
				message.channel.send('this place is literally called, the bots quiet place. stahp talking!!! :angry:');
				break;
			case 5:
				message.channel.send('Welp I don't think you will ever stop talking. :weary:  ');
				break;
			case 6:
				message.channel.send('grr :bear: ');
				break;
				
		};
	};
});

client.login('Nzc0MzEyMDA5NDYxMzk5NTYy.X6V8QQ.iu1eeIPcXXmA8181L_QAH74-aY4');  