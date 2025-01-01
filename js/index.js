"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const form = document.querySelector("#searchForm > form");
const input = document.querySelector("#inpLocalização");
const tempoInfo = document.querySelector("#tempoInfo");
console.log(input);
console.log(form);
form === null || form === void 0 ? void 0 : form.addEventListener("submit", (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    if (!input || !tempoInfo)
        return;
    const localização = input.value;
    if (localização.length < 3) {
        alert("Digite uma localização válida");
        return;
    }
    try {
        const response = yield fetch(`https://api.openweathermap.org/data/2.5/weather?q=${localização}&appid=5db2cb028d7ad8fd287db19fd4df58be&lang=pt_br&units=metric`);
        const dados = yield response.json();
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
    }
    catch (error) {
        alert("Localização não encontrada!");
        console.log("Erro: ", error);
    }
}));
