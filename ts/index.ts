const form = document.querySelector("#searchForm > form");
const input: HTMLInputElement | null =
  document.querySelector("#inpLocalização");
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
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${localização}&appid=5db2cb028d7ad8fd287db19fd4df58be&lang=pt_br&units=metric`
  );
  const dados = await response.json();

  console.log(dados);

  const infos = {
    temperatura: Math.round(dados.main.temp),
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
});
