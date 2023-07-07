const idMoedaOrigem = 'EUR'
const idMoedaDestino = 'BRL'
const moedaIfem = idMoedaOrigem + '-' + idMoedaDestino;



async function conectaAPI (moeda){
    // const moedaSemIfem = moeda.replace('-', '');
    const conecta = await fetch(`https://economia.awesomeapi.com.br/last/${moeda}`); // Exemplo moeda = USD-BRL
    const conectaTraduzido = await conecta.json();
    postMessage(conectaTraduzido); // exemplo moeda = USDBRL sem ifem
    // console.log(conectaTraduzido)
};


addEventListener("message", event =>{
    conectaAPI(moedaIfem);
    // setInterval(()=> conectaAPI(moedaIfem), 5000);
});


 function atualizaIdMoedaWorker(moedaOrigem, moedaDestino){
    idMoedaOrigem = moedaOrigem
    idMoedaDestino = moedaDestino
}

