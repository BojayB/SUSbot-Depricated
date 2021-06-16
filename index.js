// require the discord.js module
const Discord = require('discord.js');
// create a new Discord client
const client = new Discord.Client();
const {Util} = require('discord.js');

//command set up
client.commands = new Discord.Collection();





// consts
const nonDiscordUserMsg = 'you need to be using Discord to get this feature!';

// NOTE IMPORTANT READ THIS
// This line is commented in the master/heroku version, but it is needed if you were to run the code locally
 let {prefix, token, clientID, luckyGuilds, luckyChannels, ownerID, NGappID, NGencKey, spreadsheetID, GOOGLE_API_KEY, MMappID, mongoURI} = require('./config.json');
//let {prefix, token, clientID, luckyGuilds, luckyChannels, ownerID, NGappID, NGencKey, spreadsheetID, GOOGLE_API_KEY, MMappID, mongoURI} = require('./config.example.json');


// THIS IS FOR HEROKU SHIT
if (process.env.prefix) prefix = process.env.prefix;
if (process.env.clientID) clientID = process.env.clientID;
if (process.env.ownerID) ownerID = process.env.ownerID;
if (process.env.token) token = process.env.token;
if (process.env.NGappID) NGappID = process.env.NGappID;
if (process.env.NGencKey) NGencKey = process.env.NGencKey;
if (process.env.spreadsheetID) spreadsheetID = process.env.spreadsheetID;
if (process.env.GOOGLE_API_KEY) GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
if (process.env.MMappID) MMappID = process.env.MMappID;
if (process.env.mongoURI) mongoURI = process.env.mongoURI;

exports.prefix = prefix;
exports.MMappID = MMappID;




// when the client is ready, run this code
// this event will trigger whenever your bot:
// - finishes logging in
// - reconnects after disconnecting
client.on('ready', async () => 
{
	

	console.log('Ready!');
	console.info("FULPTRON IS ONLINE");
	console.info(`FulpTron is on ${client.guilds.cache.size} servers!`);
	console.info(client.guilds.cache.map(g => g.name + " " + g.memberCount).join("\n"));

	// Specific code for newgrounds server, that finds the announcements channel, and caches the messages
	// Swap this with something for general purpose reacts later
	

});

let ngRef = ['Cock joke. username is here', 'username, just do what comes natural -T', 'le username has arrived', 'username, do you remember what a tardigrade is?',
			'Angels sang out in an immaculate chorus, down from the heavends decended username', 'username was blammed for this post', 'username has nice titties for a lil boy',
		"Aw gee whiz I hope a username doesn't totally come out of nowhere and own me.", 'Cryptic metaphor -username', 'What the hell is private username doing in there?'];

client.on('guildMemberAdd', async member =>
{
	// code specific to the Flash Holes server
	if (member.guild.id == 283807027720093697)
	{
		let curRole = member.guild.roles.cache.find(darole => darole.name === "Flash Hole");
			
		member.roles.add(curRole);
	}

	if (member.guild.id == 791394250557358111) {
		let curRole = member.guild.roles.cache.find(darole => darole.name === "funkhead");

		member.roles.add(curRole);
	}

	//G
	let guildIndex = luckyGuilds.indexOf(member.guild.id);

	console.log(guildIndex);
	if (guildIndex != -1)
	{
		//REFRESHES CACHE FOR ROLE REACTIONS FOR NEW PEOPLE?
		let ngServer = client.guilds.cache.find(ngGuild => ngGuild.id === ngServerID);
		let announcements = ngServer.channels.cache.find(announc => announc.id === ngChannelID);
		announcements.messages.fetchPinned();

		console.log("SOMEONE JOINED NG SERVER??");

		let infoPart = '*\nYou can use the command `fulpNG` to sign into the Newgrounds API, roles can be added in the <#578314067752779796> and `fulpHelp` for more info)'

		let intro = ngRef[Math.floor(Math.random() * ngRef.length)];
		intro = intro.replace('username',  "**" + member.user.username + "**");

		return member.guild.channels.cache.find(channel => channel.id === '578313756015329283').send("*" + intro + infoPart);
	}

});
var emojiname = ["VOID:854560616416804915", "🖥️", "🎵", "🎙️", "🎞️", "🎨", "✍️", "💩"],
    rolename = ["void", "Programmer", "Musician", "Voice Actor", "Animator", "Illustrator", "Writer", "Shitposter"];



client.on('message', async message => 
{
	// Don't respond to messages made by the bot itself
	if (message.author.id == client.user.id) return;

	let isInGuild = message.guild != null;
	let isDiscordUser = !message.author.bot;

	//RATING EMOTES ON NG SERVER
	let guildIndex = isInGuild ? luckyGuilds.indexOf(message.guild.id) : -1;
	if (guildIndex != -1)
	{
		if (!message.content.startsWith('[noreact]') && luckyChannels[guildIndex].includes(message.channel.id))
		{
			let regShit = new RegExp('((\.png|\.jpg|\.jpeg)|newgrounds\.com\/(art|audio|portal)\/(view|listen))', 'gi');
			if (message.attachments.size > 0 || regShit.test(message.content))
			{
				let picoSuffix = "";
				if (Math.random() > 0.5)
					picoSuffix = "pico"

				message.react(message.guild.emojis.cache.find(emoji => emoji.name === "0stars" + picoSuffix))
				.then(react => message.react(message.guild.emojis.cache.find(emoji => emoji.name === "1star" + picoSuffix)))
				.then(react => message.react(message.guild.emojis.cache.find(emoji => emoji.name === "2stars" + picoSuffix)))
				.then(react => 	message.react(message.guild.emojis.cache.find(emoji => emoji.name === "3stars" + picoSuffix)))
				.then(react => message.react(message.guild.emojis.cache.find(emoji => emoji.name === "4stars" + picoSuffix)))
				.then(react => message.react(message.guild.emojis.cache.find(emoji => emoji.name === "5stars" + picoSuffix)));
			}
		}
	}


	if (message.content.toLowerCase() === "are we talking about tom fulp?" || message.content.toLowerCase() === "are we talking about tom fulp?" )
	{
		// message.reply basically the same as message.channel.send, but @'s the person who sent it
		message.reply("I **LOVE** talking about Tom Fulp!");
	}
	else if (message.content.toLowerCase() === "can i get a rip in chat?")
	{
		// message.reply basically the same as message.channel.send, but @'s the person who sent it
		message.reply("\nRIP\nRIP\nRIP");
	}

	

	// if (message.content.includes())

	//Automate Welcome Channel WIP
	/*if(message.content.toLowerCase() === "test" || message.channel.id() === "read-the-rules-for-access"){
		//message.roles.add("NG");
		message.reply("works");

		let usr = args[0];
		if (usr == undefined)
		{
			return message.channel.send("Go to Newgrounds.com!\nhttps://newgrounds.com")
		}

		//let usr = args[0];
		//`https://${usr}.newgrounds.com`

		if(class === "level-${}-${}"){
			
		}
	}*/

	if(message.content.toLowerCase() === "monster mashing"){
		message.reply("Did someone say M0NSTER MASHING!?\nhttps://www.newgrounds.com/portal/view/707498");
	}

	//IF IT DOESNT START WITH "FULP" then IT DONT REGISTER PAST THIS POINT
	if (!message.content.toLowerCase().startsWith(prefix)) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

	console.log(args);
	console.log(args.length);
	


	// uncomment when all the commands are implemented
	// if (!client.commands.has(command))

	try {

		const daCommand = client.commands.get(command)
			|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));

		if (daCommand != undefined)
		{
			// Commands that need arguments
			if (daCommand.args && !args.length)
			{
				let reply = "You didn't provide any arguments!"
				
				if (daCommand.usage)
				{
					reply += `\nThe proper usage would be: \`${prefix}${daCommand.name} ${daCommand.usage}\``
				}

				return message.channel.send(reply);
			}

			// If needs to be discord user
			if (daCommand.discord && !isDiscordUser)
			{
				return message.reply(nonDiscordUserMsg);
			}

			// Commands that need to be in a server
			if (daCommand.guildOnly && message.channel.type !== 'text') {
				return message.reply('I can\'t execute that command inside DMs!');
			}

			daCommand.execute(message, args)
		}
		
	} catch (err)
	{
		console.error(err);
		message.reply(' there was an error trying to execute that command!');
	}

	// this message(and all others below it) does need a prefix, because it's after the if statement, and also needs the other info above, like command and args

	
	if (command == 'rolesetup')
	{
		if (!message.member.hasPermission('MANAGE_MESSAGES'))
			return;

		let rolesEmbed = new Discord.MessageEmbed()
		.setTitle('BOJAY SERVER ROLE MANAGER')
		.setDescription('REACT WITH EMOTE TO GET ROLE U WANT')
		.setColor(0x7289DA);

		var daString = "";
		var i;
		for (i = 0; i < emojiname.length; i++)
		{
			daString += `${rolename[i]} - ${emojiname[i]}\n`;
		}

		rolesEmbed.addField('ROLES', daString);

		let daMessage = await message.channel.send(rolesEmbed);
		message.delete();
		//"🎮", "🖥️", "🎵", "🎙️", "🎞️", "🎨", "✍️", "💩"
		daMessage.react('854560616416804915')
		.then(react => daMessage.react("🖥️"))
		.then(react => daMessage.react("🎵"))
		.then(react => daMessage.react("🎙️"))
		.then(react => daMessage.react("🎞️"))
		.then(react => daMessage.react("🎨"))
		.then(react => daMessage.react("✍️"))
		.then(react => daMessage.react("💩"));
	}

client.on("messageReactionAdd", (e, user) => {
	if (user && !user.bot && e.message.channel.guild)
        for (let o in emojiname)
            if (e.emoji.name == emojiname[o]) {
                let i = e.message.guild.roles.cache.find(e => e.name == rolename[o]);
				e.message.guild.member(user).roles.add(i).catch(console.error);
				// console.log('added role');
			}
});

client.on("messageReactionRemove", (e, n) => {
    if (n && !n.bot && e.message.channel.guild)
        for (let o in emojiname)
            if (e.emoji.name == emojiname[o]) {
                let i = e.message.guild.roles.cache.find(e => e.name == rolename[o]);
				e.message.guild.member(n).roles.remove(i).catch(console.error)
				// console.log('removed role');
            }
});

	if (command == 'discord')
	{
		message.channel.send("https://discord.gg/HzvnXfZ");
	}
	

	

	

	else if (command == "watching")
	{
		let text = args.slice(0).join(" ");
		client.user.setActivity(text, { type: 'WATCHING'});
	}

	
	else if (command == 'roll')
	{
		let min = 1;
		let max = parseInt(args[0]);

		if (isNaN(max))
			max = 20;
		
		message.channel.send(`🎲 You rolled a: ${Math.floor(Math.random() * (max - min + 1)) + min}`)

	}

	

	else if (command == 'loli')
	{
		 message.channel.send({ files: ['https://cdn.discordapp.com/attachments/422660110830272514/446516094006460417/unknown.png']})
		.then(message.channel.send('**inb4 BAN**'))
		.then(message.channel.send({ files: ['https://cdn.discordapp.com/attachments/422660110830272514/446516105880535041/unknown.png']}));
	}

	else if (command == 'source' || command == 'sourcecode' || command == 'github')
	{
		message.channel.send("Dig through my code on Github: \nhttps://github.com/ninjamuffin99/FulpTronJS");
	}

	
});

function clean(text)
{
	if (typeof(text) == "string")
		return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
	else
		return text;
}



var htmlEntities = {
    nbsp: ' ',
    cent: '¢',
    pound: '£',
    yen: '¥',
    euro: '€',
    copy: '©',
    reg: '®',
    lt: '<',
    gt: '>',
    quot: '"',
    amp: '&',
    apos: '\''
};


function unescapeHTML(str) {
    return str.replace(/\&([^;]+);/g, function (entity, entityCode) {
        var match;

        if (entityCode in htmlEntities) {
            return htmlEntities[entityCode];
            /*eslint no-cond-assign: 0*/
        } else if (match = entityCode.match(/^#x([\da-fA-F]+)$/)) {
            return String.fromCharCode(parseInt(match[1], 16));
            /*eslint no-cond-assign: 0*/
        } else if (match = entityCode.match(/^#(\d+)$/)) {
            return String.fromCharCode(~~match[1]);
        } else {
            return entity;
        }
    });
};




function randomFromArray(arr)
{
	let thePic = Math.floor(Math.random() * fulpPics[arr].length);
	console.log(fulpPics[arr][thePic]);
	return fulpPics[arr][thePic];
}

process.on('unhandledRejection', error => console.error(`Uncaught Promise Rejection:\n${error.stack}`));

// login to Discord with your app's token
client.login(token);
