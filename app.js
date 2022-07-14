const express = require("express");
const app = express();
const http = require("http").Server(app);
const cors = require("cors");
const { botTelegram } = require("./bot/BotTelegram.js");
const { getAllCoinGekoHttp } = require("./controller/CoinGekoController/CoinGekoController.js");
const PORT = 8080;

http.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

try {
setInterval(async () => {
  try {
    await botTelegram(); //get data from api to send on telegram
  } catch (error) {
    console.log(error);
  }
}, 120000);
} catch (error) {
  console.log(error);
}

//routes
app.get("/", getAllCoinGekoHttp); //it's to get all coins only one time beacuse after we'll send data with socket.io

module.exports = app;
