import { populaTabela } from "./tabelaProgressao.js";
import { graficoDias } from "./grafico.js";
import {listaMoedas} from './moedas.js'
const currencyInput = document.getElementById('currency');
const valorConvertidoH2 = document.getElementById('valorConvertido')
let idMoedaOrigem = 'USD'
let idMoedaDestino = 'BRL'
let moedas = [idMoedaOrigem, idMoedaDestino]
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
worker.postMessage(moedas);
setInterval(()=>worker.postMessage(moedas), 30000 )
worker.addEventListener("message", event => {
  
  console.log(event)
  console.log('Script idConversao: ' + idConversao)

  try {
    let valor = event.data[idConversao].ask;
    cotacaoMoeda = valor
  } catch (error) {
    if(event.data.status == 404){
      alert('Combinação indisponível no momento. Selecione outra combinação.')
    }
    if(error instanceof TypeError){
      alert('Infelizmente a combinação não foi localizada nesse momento. Por favor, selecione outra combinação.')
    }else{
      alert("Infelizmente um erro ocorreu, contate o adm!")
      console.log(error.message)
    }
  }

  let valor = event.data[idConversao].ask;
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
  moedas = [idMoedaOrigem, idMoedaDestino]
  idConversao = idMoedaOrigem + idMoedaDestino
  graficoDias(diasGrafico, idMoedaOrigem, idMoedaDestino);
  worker.postMessage(moedas);

}

export function recebeSelecaoDeMoedaDestino(moedaDestino){
  idMoedaDestino = moedaDestino
  moedas = [idMoedaOrigem, idMoedaDestino]
  idConversao = idMoedaOrigem + idMoedaDestino
  graficoDias(diasGrafico, idMoedaOrigem, idMoedaDestino);
  moeda = ' ' + idMoedaDestino;
  worker.postMessage(moedas);

}

