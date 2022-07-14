const axios = require("axios");
const { OK, INTERNAL_SERVER_ERROR } = require("../../constants/httpCodes");
const { searchCoinApiGeko } = require("./SearchCoinApiGeko");
const { maximumDifferenceGeko } = require("./MaximumDifferenceGeko.js");


const getAllCoinGeko = async () => {

  const coins = ["aave", "maker", "the-graph", "kusama", "zilliqa", "waves", "neo", "quant-network", "dash"];

  const response = async (coins) => {
    const data = [];

    for (let i = 0; i < coins.length; i++) {
      try {
        const res = await axios.get("https://pro-api.coingecko.com/api/v3/coins/" + coins[i] + "/tickers?x_cg_pro_api_key=CG-1Xcb8LwXVcZVdgQp3VpqDjfs");
        
        data.push(
          {
            name: coins[i],
            data: await searchCoinApiGeko(res.data.tickers), //it's a function to filter data in different markets and targets in usdt 
            maximumDifference: await maximumDifferenceGeko(res.data.tickers), //it's a function to do the calculation of the maximum difference between the price of the coin in different markets
          }
        );
      } catch (error) {
        console.log(error);
      }
    }

    return data;
  };

  let data = await response(coins);

  return data;
};

async function getAllCoinGekoHttp(req, res) {
  try {
    const data = await getAllCoinGeko();
    res.status(OK).send(data);
  } catch (error) {
    console.log(error);
    res.status(INTERNAL_SERVER_ERROR).send({
      msg: "there is an error with the server,try later",
    });

  }
}

module.exports = { getAllCoinGeko, getAllCoinGekoHttp };
