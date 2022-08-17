const { Client, GatewayIntentBits, Partials, EmbedBuilder } = require("discord.js");
const config = require("./config.js");

const client = new Client({
  partials: [
    Partials.Message, // for message
    Partials.Channel, // for text channel
    Partials.GuildMember, // for guild member
    Partials.Reaction, // for message reaction
    Partials.GuildScheduledEvent, // for guild events
    Partials.User, // for discord user
    Partials.ThreadMember, // for thread member
  ],
  intents: [
    GatewayIntentBits.Guilds, // for guild related things
    GatewayIntentBits.GuildMembers, // for guild members related things
    GatewayIntentBits.GuildBans, // for manage guild bans
    GatewayIntentBits.GuildEmojisAndStickers, // for manage emojis and stickers
    GatewayIntentBits.GuildIntegrations, // for discord Integrations
    GatewayIntentBits.GuildWebhooks, // for discord webhooks
    GatewayIntentBits.GuildInvites, // for guild invite managing
    GatewayIntentBits.GuildVoiceStates, // for voice related things
    GatewayIntentBits.GuildPresences, // for user presence things
    GatewayIntentBits.GuildMessages, // for guild messages things
    GatewayIntentBits.GuildMessageReactions, // for message reactions things
    GatewayIntentBits.GuildMessageTyping, // for message typing things
    GatewayIntentBits.DirectMessages, // for dm messages
    GatewayIntentBits.DirectMessageReactions, // for dm message reaction
    GatewayIntentBits.DirectMessageTyping, // for dm message typinh
    GatewayIntentBits.MessageContent, // enable if you need message content things
  ],
});

module.exports = client;
const db = require("croxydb")
client.db = db;
require("./events/message.js")
require("./events/ready.js")

client.login(config.token)
client.on("ready", async () => {
   const moment = require("moment") 
   require("moment-duration-format")
   moment.locale("tr")
  setInterval(async () => {
    client.guilds.cache.map(async guild => {
      guild.channels.cache.map(async channel => {
        let data = db.get(`cekilis.${guild.id}_${channel.id}`);
        if (data) {
          let time = Date.now() - data.zaman;
          let sure = data.sure;
let kanal = guild.channels.cache.get(data.kanalid);
kanal.messages.fetch(data.mesajid).then(async mesaj => {
  let toplam = data.toplam
            })

          if (time >= sure) {
            
            let win = client.channels.cache.get(data.kanalid)
            if(win){
              win = await win.messages.fetch(data.mesajid).then(a => a.reactions.cache.get("🎉").users.fetch())
            } 
           if(win){
            let toplam = data.toplam
             
            let won = []
            let winner = []

            for(let i = 0; i < toplam; i += 1){
          await client.channels.cache.get(data.kanalid).messages.fetch(data.mesajid).then(a => a.reactions.cache.get("🎉").users.fetch()).then(a => a.map(u => {
            if (!u.bot) {
            won.push("<@"+ u.id + ">");
            db.push(`rerollusers_${data.mesajid}`, u.id);
            }}))

           let kazanan = won[Math.floor(Math.random() * won.length)]

            if(!winner.map(cs => cs).includes(kazanan))
            winner.push(kazanan)
            }
              
           
            
      
            kanal.messages.fetch(data.mesajid).then(async mesaj => {
              const Discord = require("discord.js")
             const row = new Discord.ActionRowBuilder()
             .addComponents(
             new Discord.ButtonBuilder()
               .setLabel("Reroll")
               .setStyle(Discord.ButtonStyle.Success)
               .setCustomId("reroll")
             )
              const embed = new EmbedBuilder()
                .setTitle(data.odul)
               .setColor("#5865f2")
                .setTimestamp()
              .setDescription(`
Sona Erdi: <t:${Math.floor(Date.now() /1000)}:R> (<t:${Math.floor(Date.now() /1000)}:f>)
Düzenleyen: <@${data.hosted}>
Kazanan: ${winner.join(", ")}`)
            mesaj.edit({embeds: [embed], components: [row]})  
     
             if(winner.join(", ")){
            kanal.send(`Tebrikler ${winner} **${data.odul}** Kazandın!`)
             } else {
                  db.delete(`cekilis.${guild.id}_${channel.id}`);
                const embed = new EmbedBuilder()
                .setTitle(data.odul)
               .setColor("#5865f2")
              .setDescription(`
Sona Erdi: <t:${Math.floor(Date.now() /1000)}:R> (<t:${Math.floor(Date.now() /1000)}:f>)
Düzenleyen: <@${data.hosted}>
Kazanan: Bilinmiyor`) 
mesaj.edit({embeds: [embed], components: []})
          
             }
                    })                                           
          
          }
        }
        }
      });
    });
  }, 5000);
});
client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;
    if (interaction.customId === "reroll") {
        let data = db.get(`rerollusers_${interaction.channel.id}`)
          let kazanan = db.get(`rerollusers_${interaction.message.id}`)[
      Math.floor(Math.random() * db.get(`rerollusers_${interaction.message.id}`).length)
    ]

                    interaction.reply(`Tebrikler <@${kazanan}> Yeni Kazanan Sensin!`)
                  
                
            }
        })
 
          