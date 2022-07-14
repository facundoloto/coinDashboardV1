require("dotenv").config();
const { Telegraf } = require("telegraf");
const { getAllCoinGeko } = require("../controller/CoinGekoController/CoinGekoController.js");
const id = process.env.ID_CHAT;

async function botTelegram() {
  try {
    let coin = [];
    let data;
    const res = await getAllCoinGeko();

    res.map((res) => {
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

    const bot = new Telegraf("5199627189:AAHmc6M7GbsYYjO0HwrhCcJ3RGfVgEKRXOE");
    await bot.telegram.sendMessage(id, `top de las monedas con operaciones más rentables detectadas en las ultimos 2 minutos `, { parse_mode: "Markdown" });
    await bot.telegram.sendMessage(id,
      `
    1-*${data[0].name}*
      ${data[0].marketPriceHight}>${data[0].marketPriceLow}
     +${data[0].maximumDifference}%
     
   2-*${data[1].name}*  
     ${data[1].marketPriceHight}>${data[1].marketPriceLow} 
    +${data[1].maximumDifference}% 

    3-*${data[2].name}* 
     ${data[2].marketPriceHight}>${data[2].marketPriceLow} 
    +${data[2].maximumDifference}%
     `, { parse_mode: "Markdown" });

    bot.launch();

  } catch (error) {
    console.log(error);
  }
}

module.exports = { botTelegram };
