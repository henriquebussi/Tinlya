const express = require('express'); //Express - Um Framework que facilita a criação de servidores web
const axios = require('axios'); // Axios - Da Para usar o XMLHttpRequest | XMLHttpRequest - Envia requisições para um servidor web, e depois carrega os dados diretamente para o script
const path = require ('path');
const cors = require ('cors'); // Cors - Faz a ponte do Express para o CORS | CORS - Basicamente Informa que seu Site não é um puta de um virus | https://developer.mozilla.org/pt-BR/docs/Web/HTTP/CORS//
const config = require('./config.json');
const apikey = config.apikey;
// As Requisições de bibliotecas para fazer esse codigo funcionar

const app = express();
app.listen(7777);
// Tem q ter n tem como

app.use(cors()); 
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


const TraducaoClima = { // Tradução da API de clima
    "Thunderstorm": "Tempestade",
    "thunderstorm with light rain": "Tempestade com chuva leve",
    "thunderstorm with rain": "Tempestade com chuva",
    "thunderstorm with heavy rain": "Tempestade com chuva intensa",
    "light thunderstorm": "Tempestade leve",
    "thunderstorm": "Tempestade",
    "heavy thunderstorm": "Tempestade intensa",
    "ragged thunderstorm": "Tempestade irregular",
    "thunderstorm with light drizzle": "Tempestade com garoa leve",
    "thunderstorm with drizzle": "Tempestade com garoa",
    "thunderstorm with heavy drizzle": "Tempestade com garoa intensa",
    "Drizzle": "Garoa",
    "light intensity drizzle": "Garoa de baixa intensidade",
    "drizzle": "Garoa",
    "heavy intensity drizzle": "Garoa de alta intensidade",
    "light intensity drizzle rain": "Chuva garoando de baixa intensidade",
    "drizzle rain": "Chuva garoando",
    "heavy intensity drizzle rain": "Chuva garoando de alta intensidade",
    "shower rain and drizzle": "Chuva forte e garoa",
    "heavy shower rain and drizzle": "Chuva forte e garoa intensa",
    "shower drizzle": "Garoa forte",
    "Rain": "Chuva",
    "light rain": "Chuva leve",
    "moderate rain": "Chuva moderada",
    "heavy intensity rain": "Chuva intensa",
    "very heavy rain": "Chuva muito intensa",
    "extreme rain": "Chuva extrema",
    "freezing rain": "Chuva congelante",
    "light intensity shower rain": "Chuva de baixa intensidade",
    "shower rain": "Chuva",
    "heavy intensity shower rain": "Chuva de alta intensidade",
    "ragged shower rain": "Chuva irregular",
    "Snow": "Neve",
    "light snow": "Neve leve",
    "snow": "Neve",
    "heavy snow": "Neve intensa",
    "sleet": "Aguaceiro",
    "light shower sleet": "Aguaceiro leve",
    "shower sleet": "Aguaceiro",
    "light rain and snow": "Chuva e neve leve",
    "rain and snow": "Chuva e neve",
    "light shower snow": "Neve e chuva leve",
    "shower snow": "Neve e chuva",
    "heavy shower snow": "Neve e chuva intensa",
    "Atmosphere": "Atmosfera",
    "mist": "Névoa",
    "smoke": "Fumaça",
    "haze": "Neblina",
    "sand/dust whirls": "Redemoinhos de areia/poeira",
    "fog": "Nevoeiro",
    "sand": "Areia",
    "dust": "Poeira",
    "volcanic ash": "Cinzas vulcânicas",
    "squalls": "Rajadas",
    "tornado": "Tornado",
    "Clear": "Céu limpo",
    "Clouds": "Nuvens",
    "few clouds": "Poucas nuvens",
    "scattered clouds": "Nuvens dispersas",
    "broken clouds": "Nuvens fragmentadas",
    "overcast clouds": "Nublado",
    "clear sky": "céu limpo"
  };

app.get('/climatempo/:cidade', async(req, res) => { // Define uma rota GET no Express, cidade é o paramtro
    const city = req.params.cidade; // Armazena a Resposta do Usuario

    try{ // "Tentar", se não der certo, faz alguma outra coisa
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`); //Faz a Requisição para a Open Weather, usando a Api como "Chave" e usa a Cidade sendo costumizada
        if (response.status === 200) { //Verifica se esta OK, o Codigo HTTP 200 diz que esta OK
            const clima = TraducaoClima[response.data.weather[0].description] || response.data.weather[0].description; //Verifica se tem uma tradução, se tiver a usa, se não tiver usa a descrição padrão

            const weatherData = {
                Temperatura: response.data.main.temp,
                Umidade: response.data.main.humidity,
                VelocidadeDoVento: response.data.wind.speed,
                Clima: clima
            };
            res.send(weatherData);
        } else {
            res.status(response.status).send({erro: "Erro ao obter dados metereológicos"});
        }
    } catch (error) {
        res.status(500).send({erro: "Erro ao obter dados metereológicos", error})
    } 
});