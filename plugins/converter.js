const config = require("../config");
const { command, isPrivate, getJson, sleep, tiny, getBuffer, styletext, listall } = require("../lib/");
const { Image } = require("node-webpmux");

command(
  {
    pattern: "sticker",
    fromMe: isPrivate,
    desc: "Converts Photo or video to sticker",
    type: "converter",
  },
  async (message, match, m) => {
    if (!(message.reply_message.video || message.reply_message.image))
      return await message.reply("*_Reply to photo or video!_*");
    let buff = await m.quoted.download();
    message.sendMessage(
      buff,
      { packname: config.STICKER_DATA.split(";")[0], author: config.STICKER_DATA.split(";")[1],}
    );
  }
);



command(
  {
    pattern: "take",
    fromMe: isPrivate,
    desc: "Changes Exif data of stickers",
    type: "converter",
  },
  async (message, match, m) => {
    if (!message.reply_message && !message.reply_message.sticker)
      return await message.reply("*_Reply to sticker_*");
    let buff = await m.quoted.download();
    let [packname, author] = match.split(",");
    await message.sendMessage(
      buff,
      {
        packname: packname || config.STICKER_DATA.split(";")[0],
        author: author || config.STICKER_DATA.split(";")[1], contextInfo: { externalAdReply: {
title: "𝐄𝐙𝐑𝐀-𝐗𝐃",
body: `𝙏𝙖𝙠𝙚𝙙 𝙏𝙤 ${match}`,
sourceUrl: "",
mediaUrl: "",
mediaType: 1,
showAdAttribution: true,
renderLargerThumbnail: false,
thumbnailUrl: "https://i.imgur.com/Ou56ggv.jpeg" }}
      },
      "sticker"
    );
  }
);
