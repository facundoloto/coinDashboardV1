require("dotenv").config();
const { Telegraf } = require("telegraf");
const {
  getAllCoin,
} = require("../controller/CoinController/CoinController.js");
const bot = new Telegraf("5199627189:AAEe0I5JO7R2Z0pP8i_zB7hwPx1T_nssHQg");

async function botTelegram() {

  try {
    let coin = [];
    let data;
    const res = await getAllCoin();

    await res.map((res) => {
      coin.push({
        name: res.name,
        marketPriceHight: res.maximumDifference.marketPriceHight,
        marketPriceLow: res.maximumDifference.marketPriceLow,
        maximumDifference: parseFloat(
          res.maximumDifference.percentageMarketDiffLow.slice(1, -1)
        ),
      });
    });

    data = [...coin];
    data.sort((a, b) => {
      return b.maximumDifference - a.maximumDifference;
    });
    
    try {
      const id = 1183249684;
      await bot.telegram.sendMessage(
        id,
        `*top 1*` +
        "```" +
        `**${data[0].name}**` +
        "```" +
        `${data[0].marketPriceHight}` +
        ">" +
        `${data[0].marketPriceLow}` +
        "```" +
        `+${data[0].maximumDifference}%` +
        "```",
        { parse_mode: "Markdown" }
      );

      await bot.telegram.sendMessage(
        id,
        `*top 2*` +
        "```" +
        `**${data[1].name}**` +
        "```" +
        `${data[1].marketPriceHight}` +
        ">" +
        `${data[1].marketPriceLow}` +
        "```" +
        `+${data[1].maximumDifference}%` +
        "```",
        { parse_mode: "Markdown" }
      );

      await bot.telegram.sendMessage(
        id,
        `*top 3*` +
        "```" +
        `**${data[2].name}**` +
        "```" +
        `${data[2].marketPriceHight}` +
        ">" +
        `${data[2].marketPriceLow}` +
        "```" +
        `+${data[2].maximumDifference}%` +
        "```",
        { parse_mode: "Markdown" }
      );

      bot.launch();
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = { botTelegram };
