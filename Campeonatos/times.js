"use strict";
var tabelaTimes = document.getElementById("tbTimes");
var times = JSON.parse(localStorage.getItem("times") || "[]");
function atualizarTime() {
    tabelaTimes.innerHTML = "";
    times.forEach((t) => {
        tabelaTimes.innerHTML += `
      <tr>
           <td>${t.nomeCurto}</td>
           <td>${t.nomeLongo}</td>
      </tr>
    `;
    });
}
function salvarTimes() {
    let timesSalvar = JSON.stringify(times);
    localStorage.setItem("times", timesSalvar);
}
function salvarTime(event) {
    event === null || event === void 0 ? void 0 : event.preventDefault(); //cancelar o disparo do evento
    const novoTime = {
        id: Date.now(),
        nomeCurto: document.getElementById("nomeCurto").value,
        nomeLongo: document.getElementById("nomeLongo").value,
    };
    times.push(novoTime);
    atualizarTime();
    salvarTimes();
}
atualizarTime();
