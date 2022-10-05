const Command = require("../../structures/Command");
const Guild = require("../../database/schemas/Guild");
const discord = require("discord.js");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "vaporwave",
      description: "Vaporwavefies a text.",
      category: "Fun",
      examples: ["vaporwave POG"],
    });
  }

  async run(message, args) {
    const guildDB = await Guild.findOne({
      guildId: message.guild.id,
    });

    const language = require(`../../data/language/${guildDB.language}.json`);

    if (!args[0]) return message.channel.sendCustom(`${language.whatdoIsay}`);

    const vaporwavefied = args
      .toString()
      .split("")
      .map((char) => {
        const code = char.charCodeAt(0);
        return code >= 33 && code <= 126
          ? String.fromCharCode(code - 33 + 65281)
          : char;
      })
      .join("")
      .replace(/，/g, "  ");
    message.channel.sendCustom({
      embeds: [
        new discord.MessageEmbed()
          .setDescription(vaporwavefied)
          .setColor(message.client.color.blue),
      ],
    });
  }
};
