const form = document.querySelector("#searchForm > form");
const input: HTMLInputElement | null =
  document.querySelector("#inpLocalização");
const tempoInfo = document.querySelector("#tempoInfo");

console.log(input);
console.log(form);

form?.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!input) return;
  const localização = input.value;
  if (localização.length < 3) {
    alert("Digite uma localização válida");
    return;
  }
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${localização}&appid=5db2cb028d7ad8fd287db19fd4df58be&lang=pt_br&units=metric`
  );
  const dados = await response.json();

  console.log(dados);

  const infos = {
    temperatura: Math.round(dados.main.temp),
    local: dados.nome,
    icone: `https://openweathermap.org/img/wn/${dados.weather.icon}.png`
  };
  
});
