import { pegarLista, renderizarLista, 
         adicionarEventListenerEmInputAdicionar, 
         mostrarInput,
         adicionarEventListenerEmLi, 
         tornarItensArrastaveis,
         permitirQueItensSejamSoltos,
    
} from './functions.js';

const paraFazerInput = document.getElementById("para-fazer-input");
const fazendoInput = document.getElementById("fazendo-input");
const feitoInput = document.getElementById("feito-input");

const paraFazerUl = document.getElementById("lista-para-fazer");
const fazendoUl = document.getElementById("lista-fazendo");
const feitoUl = document.getElementById("lista-feito");

const listaParaFazer = pegarLista("lista-para-fazer");
const listaFazendo = pegarLista("lista-fazendo");
const listaFeito = pegarLista("lista-feito");

renderizarLista(listaParaFazer, "lista-para-fazer");
renderizarLista(listaFazendo, "lista-fazendo");
renderizarLista(listaFeito, "lista-feito");

mostrarInput("para-fazer-btn", paraFazerInput);
mostrarInput("fazendo-btn", fazendoInput);
mostrarInput("feito-btn", feitoInput);

adicionarEventListenerEmInputAdicionar(paraFazerInput, listaParaFazer, "lista-para-fazer");
adicionarEventListenerEmInputAdicionar(fazendoInput, listaFazendo, "lista-fazendo");
adicionarEventListenerEmInputAdicionar(feitoInput, listaFeito, "lista-feito");

adicionarEventListenerEmLi("para-fazer-bg", listaParaFazer, "lista-para-fazer");
adicionarEventListenerEmLi("fazendo-bg", listaFazendo, "lista-fazendo");
adicionarEventListenerEmLi("feito-bg", listaFeito, "lista-feito");

tornarItensArrastaveis();
permitirQueItensSejamSoltos(listaParaFazer, "lista-para-fazer");
permitirQueItensSejamSoltos(listaFazendo, "lista-fazendo");
permitirQueItensSejamSoltos(listaFeito, "lista-feito");
