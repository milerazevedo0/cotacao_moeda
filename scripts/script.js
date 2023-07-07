import { populaTabela } from "./tabelaProgressao.js";
import { graficoDias } from "./grafico.js";
import {listaMoedas} from './moedas.js'
// import { atualizaIdMoedaWorker } from './workerMoeda.js'
const currencyInput = document.getElementById('currency');
const valorConvertidoH2 = document.getElementById('valorConvertido')
const spanMoedaOrigem = document.getElementById('spanMoedaOrigem')
const spanMoedaDestino = document.getElementById('spanMoedaDestino')
let idMoedaOrigem = 'EUR'
let idMoedaDestino = 'BRL'
let idConversao = idMoedaOrigem + idMoedaDestino
const diasGrafico = 7
let cotacaoMoeda = 0;
let moeda = ' ' + idMoedaDestino;



currencyInput.addEventListener('input', formataMoeda);
function formataMoeda(){
    const valor = parseFloat(currencyInput.value);
    // const valorFormatado = valor.toLocaleString('en-US', {
    //     style:'currency',
    //     currency: 'USD',
    // });

    // currencyInput.value = valorFormatado

    converteValor(valor)
}

function converteValor(valor){
    const valorConvertido = parseFloat(valor) * parseFloat(cotacaoMoeda)

    valorConvertidoH2.innerHTML = ''
    valorConvertidoH2.innerHTML = valorConvertido.toFixed(2) + moeda

    if(currencyInput.value == ''){
        valorConvertidoH2.innerHTML = parseFloat(cotacaoMoeda).toFixed(2) + moeda
    }

}

let worker = new Worker('./scripts/workers/workerMoeda.js');
worker.postMessage('usd');
setInterval(()=>worker.postMessage('usd'), 30000 )
worker.addEventListener("message", event => {
  console.log(idConversao)
  let valor = event.data[idConversao].ask;
  console.log(valor)
  cotacaoMoeda = valor

  valorConvertidoH2.innerHTML = ''
  if(currencyInput.value == ''){
    valorConvertidoH2.innerHTML = parseFloat(valor).toFixed(2) + moeda
  }else{
    const cotacaoMultiplicada = valor * currencyInput.value
    valorConvertidoH2.innerHTML = parseFloat(cotacaoMultiplicada).toFixed(2) + moeda
  }

  populaTabela(cotacaoMoeda);
  
  
})

graficoDias(diasGrafico, idMoedaOrigem, idMoedaDestino);

// window.addEventListener('load', possiveisMoedas());

listaMoedas();

export function recebeSelecaoDeMoedaOrigem(moedaOrigem){
  idMoedaOrigem = moedaOrigem
  graficoDias(diasGrafico, idMoedaOrigem, idMoedaDestino);
  // atualizaIdMoedaWorker(idMoedaOrigem, idMoedaDestino)

}

export function recebeSelecaoDeMoedaDestino(moedaDestino){
  // console.log(moedaDestino)
  // graficoDias(diasGrafico, idMoedaOrigem, idMoedaDestino);

}

