const {EmbedBuilder} = require("discord.js");
const Discord = require("discord.js")
const ms = require("ms")
const db = require("croxydb")
exports.run = async (client, message, args) => {
 let kanal = message.channel;
  let time = args[0];
  let insan = args[1];
  let odul = args.slice(2).join(" ");

  if (!time)
    return message.reply(
      "Lütfen bir süre belirt!"
    );
  if (!insan)
    return message.reply(
      "Lütfen kaç kişi kazanacağını yaz!"
    );
  if (!odul)
    return message.reply(
      "Lütfen ödülü yaz!"
    );

  let x = message.content;
  let ise = x
    .split(" ")
    .filter(val => val.match(/\d+/))
    .map(x =>
      x
        .split("")
        .filter(val => val.match(/\d+/))
        .join("")
    );

  let sures;
  let cst1 = ise[0];
  let insan = ise[1];
  if (time.includes("s")) sures = cst1 * 1000;
  if (time.includes("m")) sures = cst1 * 60 * 1000;
  if (time.includes("h")) sures = cst1 * 60 * 60 * 1000;
  if (time.includes("d")) sures = cst1 * 24 * 60 * 60 * 1000;

  let zaman = Date.now();

  let sure;
  let data
  try {
 data = ms(sures)
  } catch(err){
   message.reply("Girdiğin süre geçerli bir süre değil!")
  }
  if(data){
  let s = data.seconds;
  let m = data.minutes;
  let h = data.hours;
  let d = data.days;
  if (s) {
    sure = `${s} Seconds`;
  }
  if (m) {
    sure = `${m} Minutes`;
  }
  if (h) {
    sure = `${h} Hours`;
  }
  if (d) {
    sure = `${d} Days`;
  }
  let vars = await db.get(`cekilis.${message.guild.id}_${message.channel.id}`);
  if (!vars) {
    let cse = new Discord.EmbedBuilder()
      .setColor("#5865f2")
      .setTitle(odul)
      .setTimestamp()
.setDescription(`
Süre: <t:${Math.floor(Date.now() /1000) + Math.floor(sures/1000)}:R> (<t:${Math.floor(Date.now() /1000) + Math.floor(sures/1000)}:f>)
Düzenleyen: ${message.author}
Kazanan: ${cstss}`);
    kanal.send({embeds: [cse]}).then(mesaj => {
      mesaj.react("🎉");
       db.set(`reroll_${message.guild.id}`, { channelID: message.channel.id, messageID: mesaj.id })
      db.set(`cekilis.${message.guild.id}_${kanal.id}`, {
        kanalid: kanal.id,
        mesajid: mesaj.id,
        hosted: message.author.id,
        sure: sures,
        zaman: zaman,
        toplam: insan,
        odul: odul
      });
    });
   
  } else {
    message.reply("Zaten Bu Kanalda Aktif Bir Çekilis Var!");
  }
  }
};

exports.conf = {
  aliases: []
};

exports.help = {
  name: "başlat"
};
