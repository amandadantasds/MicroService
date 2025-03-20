
var tabelaTimes = document.getElementById("tbTimes") as HTMLElement;
var times = JSON.parse(localStorage.getItem("times") || "[]");



interface Times {
    id: number;
    nomeCurto: string;
    nomeLongo: string;
  }



function atualizarTime() {
    tabelaTimes.innerHTML = "";
    times.forEach((t : Times)  =>{
      tabelaTimes.innerHTML += `
      <tr>
           <td>${t.nomeCurto}</td>
           <td>${t.nomeLongo}</td>
      </tr>
    `;
    })
  }

  function salvarTimes() {
    let timesSalvar = JSON.stringify(times);
    localStorage.setItem("times", timesSalvar);
  }

  function salvarTime(event:Event) {
    event?.preventDefault(); //cancelar o disparo do evento
    const novoTime: Times = {
      id: Date.now(),
      nomeCurto: (document.getElementById("nomeCurto") as HTMLInputElement).value,
      nomeLongo: (document.getElementById("nomeLongo") as HTMLInputElement).value,
    };
    times.push(novoTime)
    atualizarTime()
    salvarTimes()
  }
  atualizarTime()

