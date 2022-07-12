const axios = require("axios");
const { OK, INTERNAL_SERVER_ERROR } = require("../../constants/httpCodes");
const { searchCoinApiGeko } = require("./SearchCoinApiGeko");
const { maximumDifferenceGeko } = require("./MaximumDifferenceGeko.js");


const getAllCoinGeko = async () => {
  try {
    const coins = ["aave", "maker", "the-graph", "kusama", "zilliqa", "waves", "neo", "quant-network", "dash"];
    
    const response = async (coins) => {
      const data = [];
      for (let i = 0; i < coins.length; i++) {
        const res = await axios.get("https://pro-api.coingecko.com/api/v3/coins/" + coins[i] + "/tickers?x_cg_pro_api_key=CG-1Xcb8LwXVcZVdgQp3VpqDjfs");
        data.push(
          {
            name: coins[i],
            data: await searchCoinApiGeko(res.data.tickers),
            maximumDifference: await maximumDifferenceGeko(res.data.tickers),
          }
        );
      }
      return data;
    };

    return await response(coins);

  } catch (error) {
    console.log(error);
  }
};

async function getAllCoinGekoHttp(req, res) {
  try {
    const data = await getAllCoinGeko();
    res.status(OK).send(data);
  } catch (error) {
    console.log(error);
    res.status(204).send({
      msg: "there is an error with the server,try later",
    });
  }
}
module.exports = { getAllCoinGeko, getAllCoinGekoHttp };
