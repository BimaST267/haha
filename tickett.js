const {
  Client,
  MessageEmbed,
  MessageActionRow,
  MessageButton,
} = require("discord.js");
const { token, guildId } = require("./settings");

const client = new Client({
  intents: [
    "GUILDS",
    "GUILD_MEMBERS",
    "GUILD_MESSAGES",
    "GUILD_MESSAGE_REACTIONS",
  ],
});

client.on("ready", async () => {
  console.log(`${client.user.username} Sudah siap bekerja!`);

  client.user.setActivity("PRoT STORE", { type: "WATCHING" });
  client.user.setPresence({
    activities: [{ name: "PRoT STORE", type: "WATCHING" }],
    status: "dnd",
  });

  let guild = client.guilds.cache.get(guildId);
  if (guild) {
    await guild.commands.set([
      {
        name: "ping",
        description: `test ping of bot`,
        type: "CHAT_INPUT",
      },
    ]);
  }

  client.on("messageCreate", async (message) => {
    if (!message.content.startsWith(".")) return;
    const args = message.content.slice(1).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    const colors = [
      "#0099ff",
      "#ff0000",
      "#00ff00",
      "#ff00ff",
      "#ffff00",
      "#00ffff",
    ];

    const randomColor = colors[Math.floor(Math.random() * colors.length)];

  });

  require("./cmd/embedbuild")(client);
});

client.login(token);
