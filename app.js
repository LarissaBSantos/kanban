import { pegarLista, mostrarLista, adicionarEventListenerEmInput, mostrarInput } from './functions.js';

const paraFazerInput = document.getElementById("para-fazer-input");
const fazendoInput = document.getElementById("fazendo-input");
const feitoInput = document.getElementById("feito-input");

const paraFazerUl = document.getElementById("lista-para-fazer");
const fazendoUl = document.getElementById("lista-fazendo");
const feitoUl = document.getElementById("lista-feito");

const listaParaFazer = pegarLista("listaParaFazer");
const listaFazendo = pegarLista("listaFazendo");
const listaFeito = pegarLista("listaFeito");

mostrarLista(listaParaFazer, paraFazerUl);
mostrarLista(listaFazendo, fazendoUl);
mostrarLista(listaFeito, feitoUl);

mostrarInput("para-fazer-btn", paraFazerInput);
mostrarInput("fazendo-btn", fazendoInput);
mostrarInput("feito-btn", feitoInput);

adicionarEventListenerEmInput(paraFazerInput, listaParaFazer, "listaParaFazer");
adicionarEventListenerEmInput(fazendoInput, listaFazendo, "listaFazendo");
adicionarEventListenerEmInput(feitoInput, listaFeito, "listaFeito");
