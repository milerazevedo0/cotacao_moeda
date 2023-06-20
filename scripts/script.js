const currencyInput = document.getElementById('currency');
const cotacaoDolar = 4.78;
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
    valorConvertidoH2.innerText = valorConvertido.toFixed(2)

    if(currencyInput.value == ''){
        valorConvertidoH2.innerText = cotacaoDolar
    }

}

const moedaIfem = 'USD-BRL';


async function conectaAPI (moeda){
    const moedaSemIfem = moeda.replace('-', '');
    const conecta = await fetch(`https://economia.awesomeapi.com.br/last/${moeda}`); // Exemplo moeda = USD-BRL
    const conectaTraduzido = await conecta.json();
    postMessage(conectaTraduzido); // exemplo moeda = USDBRL sem ifem
    console.log(conectaTraduzido)
};

addEventListener("message", () =>{
    conectaAPI(moedaIfem);
    setInterval(()=> conectaAPI(moedaIfem), 5000);
});


let worker = new Worker('./scripts/workers/workerMoeda.js');
worker.postMessage('usd');
worker.addEventListener("message", event => {
//   let tempo = geraHorario();
  let valor = event.USDBRL.ask;
  console.log(valor)
//   selecionaCotacao("dolar", valor);
//   adicionarDados(graficoParaDolar, tempo, valor);
})