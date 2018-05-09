// On dit que lorsque l'on utilise la constante Discord, on appel les fonctions de la bibliothèque discord.js issue des bibliothèques npm.
const Discord = require("discord.js");
// On dit que lorsque l'on utilise la constante bot, on appel la fonction Client.
const bot = new Discord.Client();
// On créer la constante PREFIX qui contient 
const PREFIX = "!";

// On défini que lorsque la fonction "on" du bot est en mode "ready", soit, connecté, il doit faire un certain nombres d'oppération.
bot.on("ready", funtion () {
// Le bot doit changé le "jeu" affecté au bot (voir documentation)
	bot.user.setGame("Aiiroz Bot | !help", "")

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
			.addField("!hello", "Premier dialogue avec le bot")
			.setColor("#FFFF00")
			message.delete()
			message.channel.sendEmbed(embed)
		break;
		case "comment":
			var question = arg[1]
			message.channel.reply("https://www.lmgtfy.com/?q=${question}");
			
		break;

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
