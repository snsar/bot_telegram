const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config()
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const botToken = process.env.TELEGRAM_TOKEN
const weatherToken = process.env.WEATHER_API_TOKEN



const bot = new TelegramBot(botToken, {polling: true});


    

// bot.onText(/\/start/, (msg) => {

//     bot.sendMessage(msg.chat.id, "Welcome mice fence");
    
// });



bot.onText(/\/yasuo/, (msg) => {
    bot.sendPhoto(msg.chat.id,"https://images.contentstack.io/v3/assets/blt187521ff0727be24/blt41c476486b063ef8/60ee13df31f9ee2ab08a4dfe/Yasuo_0.jpg" );
});

bot.onText(/\/ptit/, (msg) => {
    bot.sendPhoto(msg.chat.id,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSN6PdXJbvNtX_xnM7c4q5UXWOSyGpaTNLXTivEFtHOujNRrBDOUAH_GKmjx1dN02qyNvs&usqp=CAU" );
});

//https://api.openweathermap.org/data/3.0/onecall?lat=20.980940&lon=105.787330&exclude=current&appid=${weatherToken}
let lat = '20.980940'
let lon = '105.787330'
let lang = 'vi'
let units = 'metric'

// let 


// const location = {
//    thanhHoa: {

//    }
// }

let weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherToken}&units=${units}&lang=${lang}`



const getWeatherData = async () => {
  console.log(weatherURL.toString());
  const resp = await fetch(weatherURL.toString());
  const data = await resp.json();
  return data;
}



const generateWeatherMessage = weatherData =>
  `Thời tiết ở ${weatherData.name} hiện tại là: ${weatherData.weather[0].description}, Nhiệt độ ${weatherData.main.temp}°C, tốc độ gió ${weatherData.wind.speed}`;


const main = async () => {
  const weatherData = await getWeatherData();
  const weatherString = generateWeatherMessage(weatherData);
//   console.log(weatherString);
  
//   bot.sendMessage(process.env.TELEGRAM_CHAT_ID, weatherString);
  bot.onText(/\/weather hadong/, (msg) => {

        bot.sendMessage(msg.chat.id, weatherString);
    
    });
}

main();

bot.onText(/\/help/, (msg) => {

  bot.sendMessage(msg.chat.id, "Welcome", {
  "reply_markup": {
      "keyboard": [["/yasuo", "/ptit", "/weather hadong"],   ["Keyboard"], ["I'm robot"], ["/start"]]
      }
  });
  
});





