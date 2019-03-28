// On dit que lorsque l'on utilise la constante Discord, on appel les fonctions de la bibliothèque discord.js issue des bibliothèques npm.
const Discord = require("discord.js");
// On dit que lorsque l'on utilise la constante bot, on appel la fonction Client.
const bot = new Discord.Client();
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

// Demonstration basique d'une intéraction utilisateur/Bot
bot.on('message', msg => {

  if (msg.content === 'Ping') {
    msg.reply('Pong :ping_pong: ');
  }
});

// Ici on envoie un message lorsqu'un Nouveau membre entre sur le serveur, le message de bienvenue est envoyé en message privé
bot.on('guildMemberAdd', member => {
  member.createDM().then(channel => {
    return channel.send('Bienvenue sur mon serveur ' + member.displayName)
  }).catch(console.error)
  // On pourrait catch l'erreur autrement ici (l'utilisateur a peut être désactivé les MP)
})


bot.on("message", function(message) {
    // Lorsqu'un message pouvant être intercepté par le Bot est un message qu'il a lui même écrit, alors on ne s'en occupe pas
    if (message.author.equals(bot.user)) return;
    //Si un message ne commence pas par le préfix attribué (soit "!"), alors on ne s'en occupe pas
    if (!message.content.startsWith(PREFIX)) return;

    // On définit la variable args qui sera égal au message commençent par le prefix, chaque mot correspondra à une valeur de 0 à K
    var args = message.content.substring(PREFIX.length).split (" ");


    // Raccourcis
    var user = message.mentions.users.first();
    // Raccourcis
    var guild = message.guild;
    // Raccourcis
    var member = message.member;
    // On définit que modlog est une variable qui correspond à un salon discord qui à pour nom mod-log
    var modlog = member.guild.channels.find("name", "mod-log")

    //Switch va nous permettre d'interragir à chaque fois que quelqu'un utilisera une commande, donc un message contenant en première argument (args[0]) le prefix, chaque demande sera traiter en minuscule, si quelqu'un ecrit !PURGE, le bot traitera !purge
    switch (args[0].toLowerCase()) {
            //Simple affichage de texte
            case "help":
            var embed = new Discord.RichEmbed()
            .addField("!ban", "Cette commande permet de bannir un utilisateur ! Pour l'utiliser, faites !ban @(utilisateur)")
                .addField("!kick", "Cette commande permet de kick un utilisateur ! Pour l'utiliser, faites !kick @(utilisateur)")
                .addField("!ping ou Ping", "Joue au ping pong avec le chatbot")
                .addField("!github", "Obtenir le code source de notre ChatBot")
                .addField("!purge", "Supprimer un nombre de message à la suite ! Pour l'utiliser, faites !purge nombredemessage")
                .addField("!question", "Poser une question au ChatBot! Pour l'utiliser, faite !question 'ma question'")
                .setColor("#01A9DB")
                .setAuthor(message.author.username, message.author.avatarURL)
                .setDescription("Voici les commandes du bot !")
                .setTimestamp()
                message.delete()
                message.channel.sendEmbed(embed);
            break;
        case "kick":
            // gestion de droit d'administration
            if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.sendMessage("Erreur, permission invalide");
            if(!modlog) return message.reply("Je ne trouve pas de channel mod-log.");
            if (message.mentions.users.size < 1) return message.reply("Erreur Argument")
            message.guild.member(user).kick();
// Systeme de log
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
      case "question":
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

bot.login(process.env.TOKEN)
