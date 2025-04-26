const fs = require("fs");
require("dotenv").config();

let config = {
    prefix: process.env.PREFIX || ".",
    ownerName: process.env.OWNER_NAME || "Jerry",
    ownerNumber: process.env.OWNER_NUMBER || "2348061427120",
    mode: process.env.MODE || "private",
    region: process.env.REGION || "Nigeria",
    botName: process.env.BOT_NAME || "𝐑𝐢𝐚𝐬 𝐆𝐫𝐞𝐦𝐨𝐫𝐲",
    exifPack: process.env.EXIF_PACK || "𝐑𝐢𝐚𝐬 𝐆𝐫𝐞𝐦𝐨𝐫𝐲",
    exifAuthor: process.env.EXIF_AUTHOR || "𝑴𝒂𝒅𝒆 𝑩𝒚 𝑻𝒐𝒙𝒙𝒊𝒄",
    timeZone: process.env.TIME_ZONE || "Africa/Lagos",
    presenceStatus: process.env.PRESENCE_STATUS || "unavailable",
    autoRead: process.env.AUTO_READ?.toLowerCase() === "true" || false,
    autoViewStatus: process.env.AUTO_VIEW_STATUS?.toLowerCase() === "true" || false,
    autoReact: process.env.AUTO_REACT?.toLowerCase() === "true" || false,
    sessionId: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR0NyYitZR09aMDdMREJXUjdodktILzdDcWg3K3BjVjJhY1U5NU5nRHdHaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoianYzV2hqSEY3cW0xVkZVQjdnOEdPMlVVd1R0bVBsZnk2K2NiU2xoM3AwWT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI0THVCdlpRZkV1bE9SQXdWZGx5ODlUYkVVejBGNnlYelg1NVUyOEFENWs0PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJHT05QdEZjd3ZJajJNNzI1UE9sNmtvYVN3cHRBdktsdXZkZDUzVndqVmpNPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjBKZkgveDRNcUtkK21wbUdCbkU5emROd1ZpTzlZOW5makR5a1JzOTNXbkU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InJrUFZQN2xOaXV5a2oxOVQwdEpaamozSDRJSCsxL0N3RmpGTkp6dWNxQ3M9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU0t6OFlBSENiZE5vbVIxajdPZk85NmZCUlRrZ05LMzEwTHBiWXl4V3kwWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS01PWWpsTnVhSC9hVjAveVRDaCtjM0VDRGlLNVlyeHY1T09Fbys2VjQyUT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ii9wMUdoUUdUTFdQNnE5ZXFXRlFmM0lQd3ZtRUwzOVVxd2U3NHZQZ29FUmJIRW5FcjBKODF5YWc3NVg2MzlSTFVTelZlV2MwZkdWVThpUW5vVjNuTkNBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NDIsImFkdlNlY3JldEtleSI6IkkrVWExMWFPMEZ4MkFUNTlma2luMEJJTWJucmJ1VkVhRG01aHNDOWV6SnM9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJyZWdpc3RlcmVkIjp0cnVlLCJwYWlyaW5nQ29kZSI6IjUxU1dIRjZNIiwibWUiOnsiaWQiOiIyMzQ4MDYxNDI3MTIwOjIyQHMud2hhdHNhcHAubmV0IiwibGlkIjoiMTU2MTg2OTA1MTc0MDM0OjIyQGxpZCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSnlycjhrRUVPRDNzc0FHR0FJZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiUE5ycCt5Uk0zcGsrSGRsSTNIbFY3bU5wUDlMTG5SY0YvQVZWNm1HTjJoVT0iLCJhY2NvdW50U2lnbmF0dXJlIjoicVZKN3YyNmgyRmdBTHBGQWNBTm9hREZ5UUFwOGxHVjhaSUw3RGhDQnZ1c0dJVloyZ2Nzd2FEQTRRSm5ZRVJ4cmdJUmNhUmxRZXVyZmZWenBrMWFDQ0E9PSIsImRldmljZVNpZ25hdHVyZSI6InpaNTJHVDY3NWNSbE00Wk5ocDJBNUx3ekRsMmpUa29vZTlzVXJiQnQyUlRjakxRZ3pvMFVBbXltT1BEU3IvNWNaWSsyNlhzK29FTU95c3pYLzVtb0FRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjM0ODA2MTQyNzEyMDoyMkBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJUemE2ZnNrVE42WlBoM1pTTng1VmU1amFUL1N5NTBYQmZ3RlZlcGhqZG9WIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQWdJQlE9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NDU2NjUwMDYsImxhc3RQcm9wSGFzaCI6IjNnUFVKayJ9",
    autoRejectEnabled: process.env.AUTO_REJECT_ENABLED?.toLowerCase() === "true" || false,
    antiDelete: process.env.ANTIDELETE?.toLowerCase() === "false" || true,
    sessionSite: process.env.SESSION_SITE || 'https://session-toxxictech.zone.id/', 
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(`🔥 Update detected in '${__filename}', reloading Rias Gremory's config...`);
    delete require.cache[file];
    config = require(file);
});

module.exports = config;
