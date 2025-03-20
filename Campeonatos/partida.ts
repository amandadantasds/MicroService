var formPartida = document.getElementById(
    "formPartida"
  ) as HTMLFormElement;
var opcoes = document.getElementById("opcoesCampeonatos") as HTMLElement;
var campeonatos = JSON.parse(localStorage.getItem("campeonatos") || "[]");
var tabelaPartida = document.getElementById("tbPartidas") as HTMLElement;
var partidas = JSON.parse(localStorage.getItem("partidas") || "[]");

interface Campeonato {
  id: number;
  nome: string;
  categoria: string;
  tipo: string;
  dataInicio: string;
  dataFim: string;
}

interface Partida {
    id: number;
    mandante: string;
    visitante: string;
    campeonato: string;
    data: string;
  }

function atualizarCampeonatos() {
  opcoes.innerHTML = "";
  campeonatos.forEach((c : Campeonato)  =>{
    opcoes.innerHTML += `
    <option>${c.nome}</option>
  `;
  })
}

function atualizarPartidas() {
    tabelaPartida.innerHTML = "";
    partidas.forEach((p : Partida)  =>{
      tabelaPartida.innerHTML += `
      <tr>
           <td>${p.mandante}</td>
           <td>${p.visitante}</td>
           <td>${p.campeonato}</td>
           <td>${p.data}</td>
      </tr>
    `;
    })
  }

  function salvarPartidas() {
    let partidasSalvar = JSON.stringify(partidas);
    localStorage.setItem("partidas", partidasSalvar);
  }

  function salvarPartida(event:Event) {
    event?.preventDefault(); //cancelar o disparo do evento
    const novaPartida: Partida = {
      id: Date.now(),
      mandante: (document.getElementById("mandante") as HTMLInputElement).value,
      visitante: (document.getElementById("visitante") as HTMLInputElement).value,
      campeonato: (document.getElementById("opcoesCampeonatos") as HTMLInputElement).value,
      data: (document.getElementById("data") as HTMLInputElement).value
    };
    partidas.push(novaPartida)
    atualizarPartidas()
    salvarPartidas()
  }


document.addEventListener('DOMContentLoaded', () => {
  atualizarCampeonatos();
})
atualizarPartidas()
