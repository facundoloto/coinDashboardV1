const axios = require("axios");
const { OK, INTERNAL_SERVER_ERROR } = require("../../constants/httpCodes");
const { searchCoin } = require("./SearchCoin.js");
const { maximumDifference } = require("./MaximumDifference.js");

const getAllCoin = async () => {

  const coins = ["aave", "maker", "the-graph", "kusama", "zilliqa", "waves", "neo", "quant", "dash"];
  const host = "http://api.coincap.io/v2/markets?baseId=";
  const config = {
    headers: {
      Authorization: "Bearer " + "ddc4d486-638c-436f-b5a8-e6fc4a5040a4",
    },
  };

  try {
    //coinApi
    const response = async (coins) => {
      const data = [];
      for (let i = 0; i < coins.length; i++) {
        const res = await axios.get(host + coins[i], config);
        data.push(
          {
            name: coins[i],
            data: await searchCoin(res),
            maximumDifference: await maximumDifference(res),
          }
        );
      }
      return data;
    };

    return await response(coins);

  } catch (error) {
    console.log(error);
    return error;
  }
};

async function getAllCoinHttp(req, res) {
  try {
    const data = await getAllCoin();
    res.status(OK).send(data);
  } catch (error) {
    console.log(error);
    res.status(INTERNAL_SERVER_ERROR).send({
      msg: "there is an error with the server,try later",
    });
  }
}

module.exports = {
  getAllCoin, getAllCoinHttp,
};
