const { command , isPrivate , getBuffer, getJson } = require("../lib");
const fetch = require("node-fetch");
const { CAPTION } = require("../config");
const axios = require("axios");
const X = require("../config");

command(
    {
        pattern: "song",
        fromMe: isPrivate,
        desc: "Song Downloader",
        type: "downloader",
    },
    async (message, match) => {
        if (!match) return await message.reply("_Enter Name Or Url_");
var res = await axios.get(`https://api-viper-x.koyeb.app/api/song?name=${match}`)
var song = res.data
await message.client.sendMessage(message.jid, { text: `_Downloading ${song.data.title}_` },{ quoted: message})
const aswinsparky = await (await fetch(`${song.data.downloadUrl}`)).buffer()
 await message.client.sendMessage(message.jid,{ audio :aswinsparky },{ mimetype:"audio/mpeg" },{quoted: message })
    }
    );
