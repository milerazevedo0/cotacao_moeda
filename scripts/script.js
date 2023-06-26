import { populaTabela } from "./tabelaProgressao.js";
import { graficoDias } from "./grafico.js";
const currencyInput = document.getElementById('currency');
let cotacaoDolar = 0;
let moeda = ' BRL';
const valorConvertidoH2 = document.getElementById('valorConvertido')

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
    const valorConvertido = parseFloat(valor) * parseFloat(cotacaoDolar)

    valorConvertidoH2.innerHTML = ''
    valorConvertidoH2.innerHTML = valorConvertido.toFixed(2) + moeda

    if(currencyInput.value == ''){
        valorConvertidoH2.innerHTML = parseFloat(cotacaoDolar).toFixed(2) + moeda
    }

}

let worker = new Worker('./scripts/workers/workerMoeda.js');
worker.postMessage('usd');
setInterval(()=>worker.postMessage('usd'), 30000 )
worker.addEventListener("message", event => {
  let valor = event.data.USDBRL.ask;
  cotacaoDolar = valor

  valorConvertidoH2.innerHTML = ''
  if(currencyInput.value == ''){
    valorConvertidoH2.innerHTML = parseFloat(valor).toFixed(2) + moeda
  }else{
    const cotacaoMultiplicada = valor * currencyInput.value
    valorConvertidoH2.innerHTML = parseFloat(cotacaoMultiplicada).toFixed(2) + moeda
  }

  populaTabela(cotacaoDolar);
  
})

graficoDias();



