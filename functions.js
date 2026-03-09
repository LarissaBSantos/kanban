function inicializarLista(identificador) {
    const lista = [];
    localStorage.setItem(identificador, JSON.stringify(lista));
    return lista;
}

function tarefaEstaVazia(tarefa) {
    return !tarefa || tarefa.trim().length === 0;
}

export function pegarLista(identificador) {
    if (localStorage.getItem(identificador) !== null) {
        return JSON.parse(localStorage.getItem(identificador));
    } 
    return inicializarLista(identificador);
}

export function mostrarLista(lista, ul) {
    if(lista.length != 0) 
        ul.innerHTML = lista.map((tarefa) => `<li>${tarefa}</li>`).join("");
}

export function adicionarTarefa(tarefa, lista, identificadorDaLista) {
    if(tarefaEstaVazia(tarefa)) return;
    lista.push(tarefa);
    localStorage.setItem(identificadorDaLista, JSON.stringify(lista));
    location.reload();
}

export function adicionarEventListenerEmInput(input, lista, identificador){
    input.addEventListener("blur", () => {
        adicionarTarefa(input.value, lista, identificador);
    });
    input.addEventListener("keydown", (evento) => {
        if (evento.key == "Enter") {
            adicionarTarefa(input.value, lista, identificador);
        }
    });
}

export function mostrarInput(identificadorBotao, input){
    document.getElementById(identificadorBotao).addEventListener("click", () => {
        input.classList.remove('esconder');
    });
}