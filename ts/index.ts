const form = document.querySelector("#searchForm > form");
const input: HTMLInputElement | null = document.querySelector("#inpLocalização");
const tempoInfo = document.querySelector("#tempoInfo");

console.log(input);
console.log(form);

form?.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!input || !tempoInfo) return;
  const localização = input.value;
  if (localização.length < 3) {
    alert("Digite uma localização válida");
    return;
  }
  try {
    const dados = await fetchWeatherData(localização);
    displayWeatherData(dados);
  } catch (error) {
    alert("Localização não encontrada!");
    console.log("Erro: ", error);
  }
});

async function fetchWeatherData(localização: string) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${localização}&appid=5db2cb028d7ad8fd287db19fd4df58be&lang=pt_br&units=metric`
  );
  if (!response.ok) {
    throw new Error("Erro ao buscar dados do tempo");
  }
  return response.json();
}

function displayWeatherData(dados: any) {
  if (!tempoInfo) return; // Verificação adicional para garantir que tempoInfo não seja nulo
  const infos = {
    temperatura: `${Math.round(dados.main.temp)} °C`,
    local: dados.name,
    icone: `https://openweathermap.org/img/wn/${dados.weather[0].icon}.png`,
  };
  tempoInfo.innerHTML = `
    <div class="tempoDados">
      <h2>${infos.local}</h2>
      <span>${infos.temperatura}</span>
    </div>
    <img src="${infos.icone}" width="100" alt="Sol e nuvens">
  `;
}