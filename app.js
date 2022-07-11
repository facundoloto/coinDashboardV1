const express = require("express");
const app = express();
const http = require("http").Server(app);
const cors = require("cors");
const {botTelegram} = require("./bot/BotTelegram.js");
const { getAllCoinHttp } = require("./controller/CoinController/CoinController.js");
const { getAllCoinGekoHttp } = require("./controller/CoinGekoController/CoinGekoController.js");
const PORT = 8080;

http.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

setInterval(async () => {
  await botTelegram(); //get data from api
  }, 540000);
//routes
app.get("/", getAllCoinHttp); //it's to get all coins only one time beacuse after we'll send data with socket.io
app.get("/geko",getAllCoinGekoHttp); //it's to get all coins only one time beacuse after we'll send data with socket.io
module.exports = app;
