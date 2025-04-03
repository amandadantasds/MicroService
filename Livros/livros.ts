var formLivros = document.getElementById(
    "formLivros"
  ) as HTMLFormElement;
  var tabelaLivros = document.getElementById("tbLivros") as HTMLElement;
  var tabelaLivrosAutor = document.getElementById("tbLivrosAutor") as HTMLElement;
  var livros = JSON.parse(localStorage.getItem("livros") || "[]");
  

interface Livro {
    id: number;
    titulo: string;
    autor: string;
    paginas: number;
    genero: string;
  }

  function salvarLocalStorage() {
    let livrosSalvar = JSON.stringify(livros);
    localStorage.setItem("livros", livrosSalvar);
  }

  function atualizarTabela() {
    tabelaLivros.innerHTML = "";
    livros.forEach((l : Livro) => {
        tabelaLivros.innerHTML += `
      <tr>
          <td>${l.titulo}</td>
          <td>${l.autor}</td>
          <td>${l.paginas}</td>
          <td>${l.genero}</td>
          <td>
            <button onclick = "editarLivros(${l.id})" > Editar </button>
          </td>
      </tr>
    `;
    })
  }

  function editarLivros(id: number) {
    // find busca um elemento no array
    const livro = livros.find((l : Livro) => l.id == id);
    if(!livro) 
      return;
      (document.getElementById("titulo") as HTMLInputElement).value = livro.titulo,
      (document.getElementById("autor") as HTMLInputElement).value = livro.autor,
      parseInt((document.getElementById("paginas") as HTMLInputElement).value = livro.paginas),
      (document.getElementById("genero") as HTMLInputElement).value = livro.genero
  
    const livroIndex = livros.findIndex((l : Livro) => l.id == id);
    if(livroIndex !== -1) {
      livros.splice(livroIndex, 1); 
    }
    salvarLocalStorage();
    atualizarTabela();
  }
  

  function salvar(event:Event) {
    event?.preventDefault(); //cancelar o disparo do evento
    const novoLivro: Livro = {
      id: Date.now(),
      titulo: (document.getElementById("titulo") as HTMLInputElement).value,
      autor: (document.getElementById("autor") as HTMLInputElement).value,
      paginas: parseInt((document.getElementById("paginas") as HTMLInputElement).value),
      genero: (document.getElementById("genero") as HTMLInputElement).value
    };
    livros.push(novoLivro)
    atualizarTabela()
    salvarLocalStorage()
  }

  function buscar(event: Event) {
    
    tabelaLivrosAutor.innerHTML = "";
    livros.forEach((l : Livro) => {
        if ((document.getElementById("autorbusca") as HTMLInputElement).value == l.autor){
        tabelaLivrosAutor.innerHTML += `
        <tr>
        <td>${l.titulo}</td>
        <td>${l.autor}</td>
        <td>${l.paginas}</td>
        <td>${l.genero}</td>
    </tr>
    `;
        }
    })
  }


formLivros.addEventListener("submit", salvar)
atualizarTabela()