require("dotenv").config();
const Telegram = require("node-telegram-bot-api");
const fs = require("fs");

const bot = new Telegram(process.env.TELEGRAM_TOKEN);

const toilet = ["@iamshinjie", "@AdLye94"];
const house = ["@fruitcakee", "@andrea_lye"];

const getToiletCleaner = async () => {
  const turn = fs.readFileSync("toilet.txt", "utf8");
  const user = toilet[turn];
  const newTurn = (parseInt(turn, 10) + 1) % 2;
  fs.writeFileSync("toilet.txt", newTurn.toString(), { encoding: "utf8" });
  return user;
};

const getHouseCleaner = async () => {
  const turn = fs.readFileSync("house.txt", "utf8");
  const user = house[turn];
  const newTurn = (parseInt(turn, 10) + 1) % 2;
  fs.writeFileSync("biweekly-check", "0", { encoding: "utf8" });
  fs.writeFileSync("house.txt", newTurn.toString(), { encoding: "utf8" });
  return user;
};

const generateWeeklyRosterMessage = (toiletCleaner, houseCleaner) =>
  `Roster for this week\n\nClean toilet 🚽 : ${toiletCleaner}\nClean house 🧹 : ${houseCleaner}\nThank you for keeping our house clean! Love you memeda~ 😘`;

const main = async () => {
  const toiletCleaner = await getToiletCleaner();
  const houseCleaner = await getHouseCleaner();
  const message = generateWeeklyRosterMessage(toiletCleaner, houseCleaner);
  console.log(message);
  bot.sendMessage(process.env.TELEGRAM_CHAT_ID, message);
};

main();
