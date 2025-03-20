"use strict";
var formPartida = document.getElementById("formPartida");
var opcoes = document.getElementById("opcoesCampeonatos");
var campeonatos = JSON.parse(localStorage.getItem("campeonatos") || "[]");
var tabelaPartida = document.getElementById("tbPartidas");
var partidas = JSON.parse(localStorage.getItem("partidas") || "[]");
function atualizarCampeonatos() {
    opcoes.innerHTML = "";
    campeonatos.forEach((c) => {
        opcoes.innerHTML += `
    <option>${c.nome}</option>
  `;
    });
}
function atualizarPartidas() {
    tabelaPartida.innerHTML = "";
    partidas.forEach((p) => {
        tabelaPartida.innerHTML += `
      <tr>
           <td>${p.mandante}</td>
           <td>${p.visitante}</td>
           <td>${p.campeonato}</td>
           <td>${p.data}</td>
      </tr>
    `;
    });
}
function salvarPartidas() {
    let partidasSalvar = JSON.stringify(partidas);
    localStorage.setItem("partidas", partidasSalvar);
}
function salvarPartida(event) {
    event === null || event === void 0 ? void 0 : event.preventDefault(); //cancelar o disparo do evento
    const novaPartida = {
        id: Date.now(),
        mandante: document.getElementById("mandante").value,
        visitante: document.getElementById("visitante").value,
        campeonato: document.getElementById("opcoesCampeonatos").value,
        data: document.getElementById("data").value
    };
    partidas.push(novaPartida);
    atualizarPartidas();
    salvarPartidas();
}
document.addEventListener('DOMContentLoaded', () => {
    atualizarCampeonatos();
});
atualizarPartidas();
