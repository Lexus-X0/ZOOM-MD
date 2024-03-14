const events = require("../lib/event");
const { command, isPrivate, tiny, serif_B, clockString } = require("../lib");
const { OWNER_NAME, BOT_NAME, BOT_INFO } = require("../config");
const { hostname, uptime } = require("os");
command(
  {
    pattern: "menu",
    fromMe: isPrivate,
    desc: "Show All commands",
    dontAddCommandList: true,
  },
  async (message, match) => {
    if (match) {
      for (let i of events.commands) {
        if (i.pattern.test(message.prefix + match))
          message.reply(
            `\`\`\`Command : ${message.prefix}${match.trim()}
Description : ${i.desc}\`\`\``
          );
      }
    } else {
      let { prefix } = message;
      let [date, time] = new Date()
        .toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
        .split(",");
      let menu = `╭╔═════════════════╗
                *SUPERIOR𝛸*\n╚═════════════════╝
╔═════════════════╗
╠» Prefix : ${config.HANDLERS}
╠» Date : ${date}
╠» Time : ${time}
╠» Commands : ${plugins.commands.length}
╚═════════════════╝ \n${readMore}\n`;
      let cmnd = [];
      let cmd;
      let category = [];
      events.commands.map((command, num) => {
        if (command.pattern) {
          cmd = command.pattern
            .toString()
            .match(/(\W*)([A-Za-züşiğ öç1234567890]*)/)[2];
        }

        if (!command.dontAddCommandList && cmd !== undefined) {
          let type;
          if (!command.type) {
            type = "misc";
          } else {
            type = command.type.toLowerCase();
          }

          cmnd.push({ cmd, type: type });

          if (!category.includes(type)) category.push(type);
        }
      });
      cmnd.sort();
      category.sort().forEach((cmmd) => {
        menu += `
╔══════════════╗
╠═ ⪼⦿- ${cmmd}--⦿
╚══════════════╝;
        let comad = cmnd.filter(({ type }) => type == cmmd);
        comad.forEach(({ cmd }, num) => {
          menu += `\n  ➪ ${cmd.trim()}`;
        });
        menu += `\n`;
      });

      menu += `\n`;
      menu += `This menu created by SUPERIOR.`;
      return await message.client.sendMessage(message.jid, {
        image: config.BOT_INFO.split(';')[2]
        caption: menu,
        footer: tiny(
          `X-asena Public Bot\nVersion : ${require("../package.json").version}`
        )
      });
    }
  }
);
