const {
  getFilter,
  setFilter,
  deleteFilter,
  toggleFilter,
} = require("../lib/database/filters");
const { command, isPrivate, tiny } = require("../lib");
const {
  setMessage,
  getMessage,
  delMessage,
  getStatus,
  toggleStatus,
} = require("../lib/database/greetings");
const config = require("../config");
const { isAdmin, parsedJid, isUrl } = require("../lib");
const { cron, saveSchedule } = require("../lib/scheduler");
const Jimp = require("jimp");
const Lang = {
  FILTER_DESC:
    "It adds a filter. If someone writes your filter, it send the answer. If you just write .filter, it show's your filter list.",
  NO_FILTER: "*❌ There are no filters in this chat!*",
  FILTERS: tiny("your filters for this chat"),
  NEED_REPLY: "*❌ Please type in reply!*\n*Example:*",
  FILTERED: "*✅ Successfully set* ```{}``` *to filter!*",
  STOP_DESC: "Stops the filter you added previously.",
  NEED_FILTER: "*❌ Please type a filter!*\n*Example:*",
  ALREADY_NO_FILTER: "*❌ There is already no filter like this!*",
  DELETED: "*✅ The filter was successfully deleted!*",
};

command(
  {
    pattern: "add ?(.*)",
    fromMe: true,
    desc: "Adds a person to the group",
    type: "group",
  },
  async (message, match) => {
    if (!message.isGroup) return await message.reply("_This Group Only Command_")
    let num = match || message.reply_message.jid
    if (!num) return await message.reply("_give add number or mention him_");
    let user = num.replace(/[^0-9]/g, "") + "@s.whatsapp.net"
    let admin = await isAdmin(message.jid, message.user, message.client);
    if (!admin) return await message.reply("*_Add Me Admin First_");
    await message.client.groupParticipantsUpdate(message.jid, [user], "add")
    return await message.client.sendMessage(message.jid, { text: `_@${user.split("@")[0]} Congratulations this person added this group_`, mentions: [user] })
  }
);


command(
  {
    pattern: "kick ?(.*)",
    fromMe: true,
    desc: "kick a person from the group",
    type: "group",
  },
  async (message, match) => {
    if (!message.isGroup) return await message.reply("_This group only command_")
    let num = match || message.reply_message.jid
    if (!num) return await message.reply("_give add number or mention him_");
    let user = num.replace(/[^0-9]/g, "") + "@s.whatsapp.net"
    let admin = await isAdmin(message.jid, message.user, message.client);
    if (!admin) return await message.reply("_Add Me admin first");
    await message.client.groupParticipantsUpdate(message.jid, [user], "remove")
    return await message.client.sendMessage(message.jid, { text: `_@${user.split("@")[0]}, Kicked from this group_`, mentions: [user] })
  }
);
