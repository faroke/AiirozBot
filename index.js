// On dit que lorsque l'on utilise la constante Discord, on appel les fonctions de la bibliothèque discord.js issue des bibliothèques npm.
const Discord = require("discord.js");
// On dit que lorsque l'on utilise la constante bot, on appel la fonction Client.
const bot = new Discord.Client();
const YoutubeDL = require('youtube-dl');
const YTDL = require("ytdl-core");
const erreurperm = "Erreur permission invalide"
const erreurarg = "Erreur Argument"
const PREFIX = "!";

bot.on("ready", function () {
// Le bot doit changé le "jeu" affecté au bot (voir documentation)
	bot.user.setGame("Aiiroz Bot | !help", "https://github.com/faroke/Aiirozbot")

// Etant donné que le bot à pour statue "ready", on indique dans la console qu'il est connecté.
	console.log("Aiiroz Bot - Connected");
// On demande le nombre d'utilisateurs qui ont accès au bot
	console.log("Membres : " + bot.users.size)
});


bot.on('message', msg => {

  if (msg.content === 'Ping') {
    msg.reply('Pong :ping_pong: ');
  }


});
bot.on('guildMemberAdd', member => {
  member.createDM().then(channel => {
    return channel.send('Bienvenue sur mon serveur ' + member.displayName)
  }).catch(console.error)
  // On pourrait catch l'erreur autrement ici (l'utilisateur a peut être désactivé les MP)
})


bot.on("message", function(message) {
    if (message.author.equals(bot.user)) return;

    if (!message.content.startsWith(PREFIX)) return;

    var args = message.content.substring(PREFIX.length).split (" ");

    var args2 = message.content.split(" ").slice(1);

    var suffix = args2.join(" ");

    var reason = args.slice(1).join(" ");

    var user = message.mentions.users.first();
    
    var guild = message.guild;
    
    var member = message.member;
    
    var modlog = member.guild.channels.find("name", "mod-log")


    switch (args[0].toLowerCase()) {
            
            case "help":
            var embed = new Discord.RichEmbed()
            .addField("!ban", "Cette commande permet de bannir un utilisateur ! Pour l'utiliser, faites !ban @(utilisateur)")
                .addField("!kick", "Cette commande permet de kick un utilisateur ! Pour l'utiliser, faites !kick @(utilisateur)")
                .addField("!ping ou Ping", "Joue au ping pong avec le chatbot")
                .addField("!github", "Obtenir le code source de notre ChatBot")
                .addField("!purge", "Supprimer un nombre de message à la suite ! Pour l'utiliser, faites !purge nombredemessage")
                .setColor("#01A9DB")
                .setAuthor(message.author.username, message.author.avatarURL)
                .setDescription("Voici les commandes du bot !")
                .setTimestamp()
                message.delete()
                message.channel.sendEmbed(embed);
            break;
        case "kick":
            if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.sendMessage("Erreur, permission invalide");
            if(!modlog) return message.reply("Je ne trouve pas de channel mod-log.");
            if (message.mentions.users.size < 1) return message.reply("Erreur Argument")
            message.guild.member(user).kick();

            var embed = new Discord.RichEmbed()
            .addField("Commande :", "KICK")
            .addField("Utilisateur :", user.username)
            .addField("Modérateur :", message.author.username)
             .addField("Heure:", message.channel.createdAt)
            .setColor("#01A9DB")
            .setAuthor(message.author.username, message.author.avatarURL)
            .setTimestamp()
            member.guild.channels.find("name", "mod-log").sendEmbed(embed);
            message.delete();
            break;
        case "ban":
            if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.sendMessage("Erreur permission invalide");
            if(!modlog) return message.reply("Je ne trouve pas de channel mod-log.");
            if (message.mentions.users.size < 1) return message.reply("Erreur Argument")
            message.guild.ban(user, 2);

            var embed = new Discord.RichEmbed()
            .addField("Commande :", "BAN")
            .addField("Utilisateur :", user.username)
            .addField("Modérateur :", message.author.username)
             .addField("Heure:", message.channel.createdAt)
            .setColor("#01A9DB")
            .setAuthor(message.author.username, message.author.avatarURL)
            .setTimestamp()
            member.guild.channels.find("name", "mod-log").sendEmbed(embed);
            message.delete();
            break;
      case "comment":
      message.reply("https://www.lmgtfy.com/?q=" + args[1]);
      break;
      /*
      case "avatar":
      var newavatar = args[1]
      bot.user.setAvatar("{0}", [newavatar])
      break;
*/

       case "github":
       message.reply('Voici notre dépot Git: https://github.com/faroke/Aiirozbot');
       message.delete();
       break;
       
       case "ping":
       message.reply('Pong ! :ping_pong: ');
       break; 




      case "purge":
            if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.sendMessage("Erreur permission invalide");
            if(!modlog) return message.reply("Je ne trouve pas de channel mod-log.");
            if (!args[1]) return message.reply("Erreur Argument")
            message.channel.bulkDelete(args[1])

            var embed = new Discord.RichEmbed()
            .addField("Commande :", "La purge annuel")
            .addField("Nombre de message purgé:", args[1])
            .addField("Modérateur :", message.author.username)
             .addField("Heure:", message.channel.createdAt)
            .setColor("#01A9DB")
            .setAuthor(message.author.username, message.author.avatarURL)
            .setTimestamp()
            member.guild.channels.find("name", "mod-log").sendEmbed(embed);
            message.delete();
      break;
      

            
            default:
            message.channel.sendMessage("Commande invalide")
    }
});

bot.login(TOKEN)
