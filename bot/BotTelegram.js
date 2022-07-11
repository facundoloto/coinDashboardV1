require("dotenv").config();
const { Telegraf } = require("telegraf");
const {
  getAllCoin,
} = require("../controller/CoinController/CoinController.js");
const bot = new Telegraf(process.env.BOT_TOKEN);

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
      const id = process.env.ID_CHAT;
      await bot.telegram.sendMessage(id,"**top 1**");
      await bot.telegram.sendMessage(id, `*${data[0].name}*`);
      await bot.telegram.sendMessage(id,`"marketPriceHight:" ${data[0].marketPriceLow}*`);
      await bot.telegram.sendMessage(id,`"marketPriceLow:" ${data[0].marketPriceLow}*`);
      await bot.telegram.sendMessage(id,`"maximumDifference:" "+${data[0].percentageMarketDiffLow}%"`);
   
      await bot.telegram.sendMessage(id,"**top 2**");
      await bot.telegram.sendMessage(id, `*${data[1].name}*`);
      await bot.telegram.sendMessage(id,`"marketPriceHight:" ${data[1].marketPriceLow}*`);
      await bot.telegram.sendMessage(id,`"marketPriceLow:" ${data[1].marketPriceLow}*`);
      await bot.telegram.sendMessage(id,`"maximumDifference:" "+${data[1].percentageMarketDiffLow}%"`);

      await bot.telegram.sendMessage(id,"**top 3**");
      await bot.telegram.sendMessage(id, `*${data[2].name}*`);
      await bot.telegram.sendMessage(id,`"marketPriceHight:" ${data[2].marketPriceLow}*`);
      await bot.telegram.sendMessage(id,`"marketPriceLow:" ${data[2].marketPriceLow}*`);
      await bot.telegram.sendMessage(id,`"maximumDifference:" "+${data[2].percentageMarketDiffLow}%"`);

      bot.launch();
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = { botTelegram };
