function tarefaEstaVazia(tarefa) {
    return !tarefa || tarefa.trim().length === 0;
}

function tarefaNaoFoiEditada(tarefaEditada, tarefaAntiga) {
    return tarefaEditada == tarefaAntiga;
}

function retornarNomeDaClasseDeInput(identificadorDaLista) {
    return identificadorDaLista.replace("lista-", "") + "-bg";
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

function esconderInput(input){
    input.value = '';
    input.classList.add('esconder');
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

function adicionarEventListenerEmInputEditar(input, li, valorAtual, lista, identificador, ){
    confimarAcaoInput(input, () => {
        editarTarefa(input.value, lista, li.id, identificador);
        removerInputDeLi(li, valorAtual);    
    });
}

function inicializarLista(identificador) {
    const lista = [];
    localStorage.setItem(identificador, JSON.stringify(lista));
    return lista;
}

function adicionarTarefa(tarefa, lista, identificadorDaLista) {
    if(tarefaEstaVazia(tarefa)) return;
    lista.push(tarefa);
    localStorage.setItem(identificadorDaLista, JSON.stringify(lista));
}

function editarTarefa(tarefaEditada, lista, indice, identificadorDaLista) {
    if(tarefaEstaVazia(tarefaEditada) || tarefaNaoFoiEditada(tarefaEditada, lista[indice])) return;
    lista[indice] = tarefaEditada;
    localStorage.setItem(identificadorDaLista, JSON.stringify(lista));
    renderizarListaEAdicionarEventListener(lista, identificadorDaLista, retornarNomeDaClasseDeInput(identificadorDaLista));
}

function excluirTarefa(lista, indice, identificadorDaLista) {
    lista.splice(indice, 1);
    localStorage.setItem(identificadorDaLista, JSON.stringify(lista));
}

function renderizarLista(lista, identificadorDaLista) {
    const ul = document.getElementById(identificadorDaLista);
    ul.innerHTML = lista.map((tarefa, indice) => `<li id="${indice}" draggable="true">${tarefa}<img class="lixeira" src="img/trash.png" alt="Icone de lixeira"></li>`).join("");
}

function adicionarEventListenerEmLi(classeInput, lista, identificadorDaLista) {
    document.querySelectorAll(`#${identificadorDaLista} li`).forEach((li) => {
        li.addEventListener("dblclick", () => {
            if (li.querySelector('input')) return;
            const valorAtual = li.innerText;
            const input = criarElementoInput(classeInput, li.innerText);
            adicionarInputEmLi(input, li);
            adicionarEventListenerEmInputEditar(input, li, valorAtual, lista, identificadorDaLista);
        });
    });
}

function adicionarEventListenerEmLixeira(lista, identificadorDaLista) {
    const ul = document.getElementById(identificadorDaLista);
    ul.querySelectorAll('.lixeira').forEach(lixeira => {
        lixeira.addEventListener("click", () => {
            const li = lixeira.parentElement;
            excluirTarefa(lista, li.id, identificadorDaLista);
            renderizarListaEAdicionarEventListener(lista, identificadorDaLista, retornarNomeDaClasseDeInput(identificadorDaLista));
        });
    });
}

export function mostrarInput(identificadorBotao, input){
    document.getElementById(identificadorBotao).addEventListener("click", () => {
        input.classList.remove('esconder');
        input.focus();
    });
}

export function adicionarEventListenerEmInputAdicionar(input, lista, identificadorDaLista){
    confimarAcaoInput(input, () => {
        adicionarTarefa(input.value, lista, identificadorDaLista);
        esconderInput(input);
        renderizarListaEAdicionarEventListener(lista, identificadorDaLista, retornarNomeDaClasseDeInput(identificadorDaLista));
    });
}

function tornarItensArrastaveis(identificadorDaLista) {
    const ul = document.getElementById(identificadorDaLista);
    ul.querySelectorAll("li").forEach(li => {
        li.addEventListener("dragstart", () => {
            li.classList.add('dragging');
        });
        li.addEventListener("dragend", () => {
            li.classList.remove('dragging');
        });
    });
}

export function permitirQueItensSejamSoltos(identificadorDaLista) {
    const ul = document.getElementById(identificadorDaLista);

    ul.addEventListener('dragover', (evento) => {
        evento.preventDefault();
    });
    ul.addEventListener('drop', (evento) => {
        evento.preventDefault();
        const itemArrastando = document.querySelector('.dragging');
        if (!itemArrastando) return;
        const quadroOrigem = itemArrastando.parentElement;
        const listaOrigem = pegarLista(quadroOrigem.id);
        const lista = pegarLista(identificadorDaLista);
        if(quadroOrigem.id == identificadorDaLista) return;
        excluirTarefa(listaOrigem, itemArrastando.id, quadroOrigem.id);
        adicionarTarefa(itemArrastando.innerText, lista, identificadorDaLista); 
        renderizarListaEAdicionarEventListener(listaOrigem, quadroOrigem.id, retornarNomeDaClasseDeInput(quadroOrigem.id));
        renderizarListaEAdicionarEventListener(lista, identificadorDaLista, retornarNomeDaClasseDeInput(identificadorDaLista));
    });
}

export function pegarLista(identificador) {
    if (localStorage.getItem(identificador) !== null) {
        return JSON.parse(localStorage.getItem(identificador));
    } 
    return inicializarLista(identificador);
}

export function renderizarListaEAdicionarEventListener(lista, identificadorDaLista, classInput) {
    renderizarLista(lista, identificadorDaLista);
    adicionarEventListenerEmLi(classInput, lista, identificadorDaLista);
    adicionarEventListenerEmLixeira(lista, identificadorDaLista);
    tornarItensArrastaveis(identificadorDaLista);
}
