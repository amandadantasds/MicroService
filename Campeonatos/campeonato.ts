//Variáveis globais
var formCampeonato = document.getElementById(
  "formCampeonato"
) as HTMLFormElement;
var tabelaCampeonato = document.getElementById("tbCampeonatos") as HTMLElement;
var campeonatos = JSON.parse(localStorage.getItem("campeonatos") || "[]");

interface Campeonato {
  id: number;
  nome: string;
  categoria: string;
  tipo: string;
  dataInicio: string;
  dataFim: string;
}

function atualizarTabela() {
  tabelaCampeonato.innerHTML = "";
  campeonatos.forEach((c : Campeonato)  =>{
    tabelaCampeonato.innerHTML += `
    <tr>
         <td>${c.nome}</td>
         <td>${c.categoria}</td>
         <td>${c.tipo}</td>
         <td>${c.dataInicio}</td>
         <td>${c.dataFim}</td>
         <td> 
         <button onclick="editarCampeonato(${c.id})">Editar</button> 
         <button onclick="removerCampeonato(${c.id})">Remover</button>
         </td>
    </tr>
  `;
  })
}

function editarCampeonato(id:number){
  //find busca um elemento no array
  const campeonato = campeonatos.find((c : Campeonato) => c.id == id);
  if(!campeonato) return;
  (document.getElementById("nome") as HTMLInputElement).value = campeonato.nome;
  (document.getElementById("categoria") as HTMLInputElement).value = campeonato.categoria;
  (document.getElementById("tipo") as HTMLInputElement).value = campeonato.tipo;
  (document.getElementById("dataFim") as HTMLInputElement).value = campeonato.dataFim;
  (document.getElementById("dataInicio") as HTMLInputElement).value = campeonato.dataInicio;

  const campIndex = campeonatos.findIndex((c : Campeonato) => c.id == id);
  if (campIndex !== -1){
    campeonatos.splice(campIndex, 1);

  }
  salvarLocalStorage();
  atualizarTabela();
}

function removerCampeonato(id:number){
  //find busca um elemento no array
 
  const campIndex = campeonatos.findIndex((c : Campeonato) => c.id == id);
  if (campIndex !== -1){
    campeonatos.splice(campIndex, 1);

  }
  salvarLocalStorage();
  atualizarTabela();
}

function salvarLocalStorage() {
  let campeonatosSalvar = JSON.stringify(campeonatos);
  localStorage.setItem("campeonatos", campeonatosSalvar);
}

function salvar(event:Event) {
  event?.preventDefault(); //cancelar o disparo do evento
  const novoCampeonato: Campeonato = {
    id: Date.now(),
    categoria: (document.getElementById("categoria") as HTMLInputElement).value,
    dataFim: (document.getElementById("dataFim") as HTMLInputElement).value,
    dataInicio: (document.getElementById("dataInicio") as HTMLInputElement).value,
    nome: (document.getElementById("nome") as HTMLInputElement).value,
    tipo: (document.getElementById("tipo") as HTMLInputElement).value,
  };
  campeonatos.push(novoCampeonato)
  atualizarTabela()
  salvarLocalStorage()
}

atualizarTabela()