"use strict";
var formLivros = document.getElementById("formLivros");
var tabelaLivros = document.getElementById("tbLivros");
var tabelaLivrosAutor = document.getElementById("tbLivrosAutor");
var livros = JSON.parse(localStorage.getItem("livros") || "[]");
function salvarLocalStorage() {
    let livrosSalvar = JSON.stringify(livros);
    localStorage.setItem("livros", livrosSalvar);
}
function atualizarTabela() {
    tabelaLivros.innerHTML = "";
    livros.forEach((l) => {
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
    });
}
function editarLivros(id) {
    // find busca um elemento no array
    const livro = livros.find((l) => l.id == id);
    if (!livro)
        return;
    document.getElementById("titulo").value = livro.titulo,
        document.getElementById("autor").value = livro.autor,
        parseInt(document.getElementById("paginas").value = livro.paginas),
        document.getElementById("genero").value = livro.genero;
    const livroIndex = livros.findIndex((l) => l.id == id);
    if (livroIndex !== -1) {
        livros.splice(livroIndex, 1);
    }
    salvarLocalStorage();
    atualizarTabela();
}
function salvar(event) {
    event === null || event === void 0 ? void 0 : event.preventDefault(); //cancelar o disparo do evento
    const novoLivro = {
        id: Date.now(),
        titulo: document.getElementById("titulo").value,
        autor: document.getElementById("autor").value,
        paginas: parseInt(document.getElementById("paginas").value),
        genero: document.getElementById("genero").value
    };
    livros.push(novoLivro);
    atualizarTabela();
    salvarLocalStorage();
}
function buscar(event) {
    tabelaLivrosAutor.innerHTML = "";
    livros.forEach((l) => {
        if (document.getElementById("autorbusca").value == l.autor) {
            tabelaLivrosAutor.innerHTML += `
        <tr>
        <td>${l.titulo}</td>
        <td>${l.autor}</td>
        <td>${l.paginas}</td>
        <td>${l.genero}</td>
    </tr>
    `;
        }
    });
}
formLivros.addEventListener("submit", salvar);
atualizarTabela();
