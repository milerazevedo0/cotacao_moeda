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

    valorConvertidoH2.innerText = ''
    valorConvertidoH2.innerText = valorConvertido.toFixed(2) + moeda

    if(currencyInput.value == ''){
        valorConvertidoH2.innerText = parseFloat(cotacaoDolar).toFixed(2) + moeda
    }

}

let worker = new Worker('./scripts/workers/workerMoeda.js');
worker.postMessage('usd');
worker.addEventListener("message", event => {
  let valor = event.data.USDBRL.ask;
  cotacaoDolar = valor
  console.log(cotacaoDolar)
  valorConvertidoH2.innerText = parseFloat(cotacaoDolar).toFixed(2) + moeda

})