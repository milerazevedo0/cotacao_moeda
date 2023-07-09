let idMoedaOrigem = 'EUR'
let idMoedaDestino = 'BRL'
let moedaIfem = idMoedaOrigem + '-' + idMoedaDestino;

async function conectaAPI (moeda){
    // const moedaSemIfem = moeda.replace('-', '');
    const conecta = await fetch(`https://economia.awesomeapi.com.br/last/${moeda}`); // Exemplo moeda = USD-BRL
    const conectaTraduzido = await conecta.json();
    postMessage(conectaTraduzido); // exemplo moeda = USDBRL sem ifem
    // console.log(conectaTraduzido)
};

addEventListener("message", event =>{

    idMoedaOrigem = event.data[0]
    idMoedaDestino = event.data[1]
    moedaIfem = idMoedaOrigem + '-' + idMoedaDestino
    conectaAPI(moedaIfem);
    // setInterval(()=> conectaAPI(moedaIfem), 5000);
});

