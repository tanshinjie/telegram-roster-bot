require("dotenv").config();
const Telegram = require("node-telegram-bot-api");
const fs = require("fs");

const bot = new Telegram(process.env.TELEGRAM_TOKEN);

const toilet = ["@andrea_lye", "@iamshinjie", "@fruitcakee", "@AdLye94"];
const house = ["@andrea_lye", "@fruitcakee", "@AdLye94", "@iamshinjie"];

const getToiletCleaner = async () => {
  const turn = fs.readFileSync("toilet.txt", "utf8");
  const user = toilet[turn];
  const newTurn = (parseInt(turn,10) + 1) % 4;
  fs.writeFileSync("toilet.txt", newTurn.toString(), { encoding: "utf8" });
  return user;
};

const getHouseCleaner = async () => {
  const isBiweek = fs.readFileSync("biweekly-check", "utf8");
  if (parseInt(isBiweek, 10) ===  0) {
    fs.writeFileSync("biweekly-check", "1", { encoding: "utf8" });
    return '-'
  } else {
    const turn = fs.readFileSync("house.txt", "utf8");
    const user = house[turn];
    const newTurn = (parseInt(turn,10) + 1) % 4;
    fs.writeFileSync("biweekly-check", "0", { encoding: "utf8" });
    fs.writeFileSync("house.txt", newTurn.toString(), { encoding: "utf8" });
    return user;
  }
};

const generateWeeklyRosterMessage = (toiletCleaner, houseCleaner) => 
  `Roster for this week\n\nClean toilet 🚽 : ${toiletCleaner}\nClean house 🧹 : ${houseCleaner}\nThank you for keeping our house clean! Love you memeda~ 😘`;

const main = async () => {
  const toiletCleaner = await getToiletCleaner();
  const houseCleaner = await getHouseCleaner();
  const message = generateWeeklyRosterMessage(toiletCleaner, houseCleaner);
  console.log(message)
  bot.sendMessage(process.env.TELEGRAM_CHAT_ID, message);
};

main();