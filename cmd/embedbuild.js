const { Client, MessageEmbed } = require("discord.js");

module.exports = async (client) => {
  client.on("messageCreate", async (message) => {
    if (message.author.bot) return;

    if (message.content.startsWith(".embed")) {
      const args = message.content.slice(".embed".length).trim().split("|");
      const channelMention = args[0]?.trim();
      const title = args[1]?.trim();
      const description = args[2]?.trim();
      const messageContent = args[3]?.trim();
      const attachment = message.attachments.first();
      const imageURL = attachment?.url || args[4]?.trim();

      if (!channelMention) {
        return message.reply(
          `\`\`\`Cara Penggunaan : .embed Channel | Title | Description | Message | Image URL\n\nChannel (Required)\nTitle (Optional)\nDescription (Required)\nMessage (Optional)\nImage URL (Optional)\n\nOptional artinya index tersebut bisa diisi atau tidak\nRequired artinya index tersebut harus diisi\`\`\``
        );
      }
      const channel = message.mentions.channels.first();

      if (!channel) {
        return message.reply("Channel tidak ditemukan.");
      }

      if (!description) {
        return message.reply("Mohon isi description.");
      }

      const embed = new MessageEmbed()
        .setDescription(description)
        .setColor("RANDOM")
        .setFooter({
          text: `Official Prot Store`,
          iconURL: message.author.displayAvatarURL(),
        });

      if (title) {
        embed.setTitle(title);
      }

      if (messageContent) {
        embed.addField("Message", messageContent);
      }

      if (imageURL) {
        embed.setImage(imageURL);
      }

      await channel.send({ embeds: [embed] });
      await message.delete();
    }
  });
};
