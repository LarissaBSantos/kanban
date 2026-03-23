import { pegarLista, 
         adicionarEventListenerEmInputAdicionar, 
         mostrarInput,
         permitirQueItensSejamSoltos,
         renderizarListaEAdicionarEventListener
} from './functions.js';

const paraFazerInput = document.getElementById("para-fazer-input");
const fazendoInput = document.getElementById("fazendo-input");
const feitoInput = document.getElementById("feito-input");

const listaParaFazer = pegarLista("lista-para-fazer");
const listaFazendo = pegarLista("lista-fazendo");
const listaFeito = pegarLista("lista-feito");

mostrarInput("para-fazer-btn", paraFazerInput);
mostrarInput("fazendo-btn", fazendoInput);
mostrarInput("feito-btn", feitoInput);

adicionarEventListenerEmInputAdicionar(paraFazerInput, listaParaFazer, "lista-para-fazer");
adicionarEventListenerEmInputAdicionar(fazendoInput, listaFazendo, "lista-fazendo");
adicionarEventListenerEmInputAdicionar(feitoInput, listaFeito, "lista-feito");

renderizarListaEAdicionarEventListener(listaParaFazer, "lista-para-fazer", "para-fazer-bg");
renderizarListaEAdicionarEventListener(listaFazendo, "lista-fazendo", "fazendo-bg");
renderizarListaEAdicionarEventListener(listaFeito, "lista-feito", "feito-bg");

permitirQueItensSejamSoltos("lista-para-fazer");
permitirQueItensSejamSoltos("lista-fazendo");
permitirQueItensSejamSoltos("lista-feito");
