// On dit que lorsque l'on utilise la constante Discord, on appel les fonctions de la bibliothèque discord.js issue des bibliothèques npm.
const Discord = require("discord.js");
// On dit que lorsque l'on utilise la constante bot, on appel la fonction Client.
const bot = new Discord.Client();
// On créer la constante PREFIX qui contient 
const PREFIX = "!";

// On défini que lorsque la fonction "on" du bot est en mode "ready", soit, connecté, il doit faire un certain nombres d'oppération.
bot.on("ready", funtion () {
/*
// Le bot doit changé le "jeu" affecté au bot (voir documentation)
	bot.user.setGame("Aiiroz Bot | !help", "https://github.com/faroke/Aiirozbot")
// Notre bot est concidéré comme un utilisateur, ainsi un peu définir quel est son status: "Online", "idle", "invisible" et "dnd"
	bot.user.SetStatus("Online")
*/
   client.user.setPresence({ game: { name: 'Aiiroz Bot | !help', 'https://github.com/faroke/Aiirozbot' }, status: 'Online' })
  .then(console.log)
  .catch(console.error);
       
// Etant donné que le bot à pour statue "ready", on indique dans la console qu'il est connecté.
	console.log("Aiiroz Bot - Connected");
// On demande le nombre d'utilisateurs qui ont accès au bot
	console.log("Membres : " + bot.users.size)
});

// On appel la fonction guildMemberAdd qui gère les nouveaux membre sur le serveur.
bot.on("guildMemberAdd", member () {
	console.log(member_username + "joined the server")
	var role = member.guild.roles.find('name', 'Membre'); // Le script cherche dans la liste de role un role qui porte le nom Membre.
	member.addRole(role)//On défini le role trouver au nouvelle utilisateur
});

// On appel la fonction message pour définir les commandes commençant pas la constante PREFIX
bot.on("message", async function(mesage) {
	var args = message.content.substring(PREFIX.length).split (" ");
	switch (args[0].toLowerCase()) {
		case "hello":
			message.channel.sendMessage("Bonjour, comment vas tu?");
			return;
		break;
		case "help":
		var embed = new Discord.RichEmbed()
			.addField("!hello", "On discute un peu")
			.addField("!comment + question", "Me poser une question")
			.addField("!avatar + Lien Image", "Changer mon Avatar")
			.addField("!BeFriend? + Pseudo", "J'ajoute qui tu veux en ami")
	
			.setColor("#FFFF00")
			message.delete()
			message.channel.sendEmbed(embed)
		break;
		case "comment":
			var question = arg[1]
			if(!question)
				return message.reply("Si t'as pas de question tais toi");
			message.reply("https://www.lmgtfy.com/?q=${question}");
			
		break;
		case "avatar":
			var picture = arg[1]
			if(!picture)
				return message.reply("Ajoute un lien");
			else:
				message.reply("Veux tu vraiment setup ce nouvelle avatar: (Oui/Non)")
				message.reply({
					files: [picture]
				})
				if (message.content === 'Oui') {
					client.user.setAvatar(picture)
					.then(user => console.log(`New avatar set!`))
					.catch(console.error); 
				}
				
		break;
		case "BeFriend?":
			var MyNewFriend = arg[1]
			if (!MyNewFriend)
				return message.reply("Qui dois-je ajouté?");
			.addFriend(MyNewFriend)
		break;
		case "purge":
			const deleteCount = parseInt(args[0], 10);
    
    			if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      				return message.reply("Il faut donné un nombre entre 2 et 100");
    
  			const fetched = await message.channel.fetchMessages({count: deleteCount});
   			message.channel.bulkDelete(fetched)
				.catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
			
			
			
		case "Spotify":
			if(!message.member.roles.some(r=>["ADMIN"].includes(r.name)) )
				return message.reply("Pas la permission");
			else:
				return message.reply("https://discordapp.com/oauth2/authorize?client_id=303904389968560129&scope=bot&permissions=0");
		break;
		case "YoutubeMusic":
			if(!message.member.roles.some(r=>["ADMIN"].includes(r.name)) )
				return message.reply("Pas la permission");
			else: 
				return message.reply("https://discordapp.com/oauth2/authorize?client_id=235088799074484224&permissions=8&scope=bot&response_type=code&redirect_uri=https%3A%2F%2Frythmbot.co%2Fthanks");
			
			
			
		//Reponse par défaut si aucune des demandes commençant par "!" n'a de reponse prédéfini
		default:	
			// On indique donc que la commande est inconnu
			message.channel.sendMessage("Commande invalide, try !help for more information")
			// On suprime le précédent message, soit le message de l'utilisateur (le bot à besoin des droits de gestion du salon (voir documentation)
			message.delete();
	}
});

// La fonction login sert à s'identifié en tant que bot sur discord, un code d'identification (voir documentation)
bot.login(token)


/*Permission Module:
if(!message.member.roles.some(r=>["Role"].includes(r.name)) )
return message.reply("Sorry, you don't have permissions to use this!");
*/
