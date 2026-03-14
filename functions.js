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

export function renderizarLista(ul, lista, identificadorDaLista) {
    if(lista.length != 0) 
        ul.innerHTML = lista.map((tarefa, indice) => `<li id="${indice}" draggable="true">${tarefa}<img class="lixeira" src="img/trash.png" alt="Icone de lixeira"></li>`).join("");

    adicionarEventListenerEmLixeira(ul, lista, identificadorDaLista);
}

export function mostrarInput(identificadorBotao, input){
    document.getElementById(identificadorBotao).addEventListener("click", () => {
        input.classList.remove('esconder');
        input.focus();
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
    li.innerHTML = `${valor}<img lass="lixeira" src="img/trash.png" alt="Icone de lixeira"></img>`;
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

function excluirTarefa(ul, lista, indice, identificadorDaLista) {
    lista.splice(indice, 1);
    localStorage.setItem(identificadorDaLista, JSON.stringify(lista));
    renderizarLista(ul, lista, identificadorDaLista);
}

function adicionarEventListenerEmLixeira(ul, lista, identificadorDaLista) {
    ul.querySelectorAll('.lixeira').forEach(lixeira => {
        lixeira.addEventListener("click", () => {
            const li = lixeira.parentElement;
            excluirTarefa(ul, lista, li.id, identificadorDaLista);
        });
    });
}

export function tornarItensArrastaveis() {
    document.querySelectorAll("li").forEach(li => {
        li.addEventListener("dragstart", () => {
            li.classList.add('dragging');
        });
        li.addEventListener("dragend", () => {
            li.classList.remove('dragging');
        });
    });
}

export function permitirQueItensSejamSoltos(idUl, lista, identificadorDaLista) {
    const ul = document.querySelector(`#${idUl}`);

    ul.addEventListener('dragover', (evento) => {
        evento.preventDefault();
    });
    ul.addEventListener('drop', (evento) => {
        evento.preventDefault();
        const itemArrastando = document.querySelector('.dragging');
        ul.appendChild(itemArrastando);
        adicionarTarefa(itemArrastando.innerText, lista, identificadorDaLista); 
    });
}