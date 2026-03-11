function tarefaEstaVazia(tarefa) {
    return !tarefa || tarefa.trim().length === 0;
}

function tarefaNaoFoiEditada(tarefaEditada, tarefaAntiga) {
    return tarefaEditada == tarefaAntiga;
}

function criarElementoInput(classe, valor) {
    const input = document.createElement('input');
    input.classList.add("nova-tarefa", classe);
    input.type = 'text';
    input.value = valor;
    input.id = "editar-tarefa";

    return input;
}

function confimarAcaoInput(input, callback) {
    input.addEventListener("blur", () => {
        callback();
    })
    input.addEventListener("keydown", (evento) => {
        if(evento.key == "Enter"){
            callback();
        }
    })
}

function inicializarLista(identificador) {
    const lista = [];
    localStorage.setItem(identificador, JSON.stringify(lista));
    return lista;
}

export function pegarLista(identificador) {
    if (localStorage.getItem(identificador) !== null) {
        return JSON.parse(localStorage.getItem(identificador));
    } 
    return inicializarLista(identificador);
}

export function mostrarLista(lista, ul) {
    if(lista.length != 0) 
        ul.innerHTML = lista.map((tarefa, indice) => `<li id="${indice}">${tarefa}</li>`).join("");
}

export function mostrarInput(identificadorBotao, input){
    document.getElementById(identificadorBotao).addEventListener("click", () => {
        input.classList.remove('esconder');
    });
}

function adicionarTarefa(tarefa, lista, identificadorDaLista) {
    if(tarefaEstaVazia(tarefa)) return;
    lista.push(tarefa);
    localStorage.setItem(identificadorDaLista, JSON.stringify(lista));
    location.reload();
}

export function adicionarEventListenerEmInputAdicionar(input, lista, identificador){
    confimarAcaoInput(input, () => {
        adicionarTarefa(input.value, lista, identificador);
    });
}

function editarTarefa(tarefaEditada, lista, indice, identificadorDaLista) {
    if(tarefaEstaVazia(tarefaEditada) || tarefaNaoFoiEditada(tarefaEditada, lista[indice])) return;
    lista[indice] = tarefaEditada;
    localStorage.setItem(identificadorDaLista, JSON.stringify(lista));
    location.reload();
}

function adicionarEventListenerEmInputEditar(input, li, valorAtual, lista, identificador, ){
    confimarAcaoInput(input, () => {
        editarTarefa(input.value, lista, li.id, identificador);
        removerInputDeLi(li, valorAtual);    
    });
}

function adicionarInputEmLi(input, li) {
    li.innerText = '';
    li.appendChild(input);
    li.style.display = "contents";
    input.focus();
}

function removerInputDeLi(li, valor) {
    li.innerText = valor;
    li.style.display = "";
}

export function adicionarEventListenerEmLi(idUl, classeInput, lista, identificador) {
    document.querySelectorAll(idUl).forEach((li) => {
        li.addEventListener("dblclick", () => {
            if (li.querySelector('input')) return;
            const valorAtual = li.innerText;
            const input = criarElementoInput(classeInput, li.innerText);
            adicionarInputEmLi(input, li);
            adicionarEventListenerEmInputEditar(input, li, valorAtual, lista, identificador);
        });
    });
}
