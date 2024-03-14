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
        menu += `╔══════════════╗`;
        menu += `\n╠═ ⪼ 「 *${cmmd.toUpperCase()}* 」`;
        menu += `\n╚══════════════╝`
menu += `\n`;
        let comad = cmnd.filter(({ type }) => type == cmmd);
        comad.forEach(({ cmd }) => {
          menu += `\n  ➪  ${cmd.trim()}`;
        });
        });
        menu += `\n`;
        menu += `\n 𝘛𝘩𝘪𝘴 𝘮𝘦𝘯𝘶 𝘤𝘳𝘦𝘢𝘵𝘦𝘥 𝘣𝘺`;
      });
      menu += `*𝘚𝘜𝘗𝘌𝘙𝘐𝘖𝘙*`;
      let penu = tiny(menu)
      let img = config.BOT_INFO.split(';')[2]
      return await message.sendFromUrl(img, {fileLength: "5555544444", gifPlayback: true, caption: (penu)}, {quoted: message })
    }
}catch(e){
message.reply(e)
}
  }
);
