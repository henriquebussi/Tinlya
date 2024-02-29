// const temperaturaid = document.getElementById("temperaturaid");
// const umidadeid = document.getElementById("umidadeid");
// const velocidadedoventoid = document.getElementById("velocidadedoventoid");
// const climadesid = document.getElementById("climadesid");
document
  .getElementById("formClima")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const city = document.getElementById("cityInput").value;

    fetch(`http://localhost:7777/climatempo/${city}`)
      .then((response) => response.json())
      .then((data) => {
        const tempoResult = document.getElementById("climaResult");
        if (data.Temperatura) {
        document.getElementById("temperaturaid").textContent = `${data.Temperatura}ºC`;
        document.getElementById("umidadeid").textContent = `${data.Umidade}`;
        document.getElementById("velocidadedoventoid").textContent = `${data.VelocidadeDoVento}m/s`;
        document.getElementById("climaid").textContent = `${data.Clima}`
        } else {
          tempoResult.innerHTML = "Erro ao obter dados metereológicos";
        }
      })
      .catch((error) => console.error("Erro ao obter dados"));
  });

function atualizarHorario() {
  var agora = new Date();
  var hora = agora.getHours();
  var minutos = agora.getMinutes();
  var segundos = agora.getSeconds();

  hora = hora < 10 ? "0" + hora : hora;
  minutos = minutos < 10 ? "0" + minutos : minutos;
  segundos = segundos < 10 ? "0" + segundos : segundos;

  var horarioAtual = hora + ":" + minutos;

  document.getElementById("horario").innerHTML = horarioAtual;
}

setInterval(atualizarHorario, 1000);

atualizarHorario();
