const events = require("../lib/event");
const { command, isPrivate, tiny, serif_B, clockString } = require("../lib");
const config = require("../config");
const plugins = require("../lib/event");
const { HANDLERS, BOT_NAME, BOT_INFO } = require("../config");
const { PluginDB, installPlugin } = require("../lib/database/plugins");
const { hostname, uptime } = require("os");
const more = String.fromCharCode(8206);
const readMore = more.repeat(4001);
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
      let menu = `╔════════════╗ \n         *SUPERIOR* \n╚════════════╝
╔══════════════╗
╠» Prefix : ${config.HANDLERS}
╠» mode :${config.WORK_TYPE.toLowerCase()}
╠» Date : ${date}
╠» Time : ${time}
╠» Creator : Superior
╚══════════════╝\n${readMore}\n`;
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
        menu += `╔══════════════╗`;
        menu += `\n╠═ ⪼ 「 *${cmmd.toUpperCase()}* 」`;
        menu += `\n╚══════════════╝`
menu += `\n`;
        let comad = cmnd.filter(({ type }) => type == cmmd);
        comad.forEach(({ cmd }) => {
          menu += `\n ➪  ${cmd.trim()}`;
        });
        menu += `\n`;
     
      menu += `\n`;
      menu += `_Created By Superior_`;
      return await message.client.sendMessage(message.jid, {
        image: { url: config.BOT_INFO.split(';')[2]},
        let penu = tiny(menu)
          `X-asena Public Bot\nVersion : ${require("../package.json").version}`
        )
      });
    }
  }
);
