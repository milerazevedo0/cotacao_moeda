const elementoGrafico = document.getElementById('graficoMoeda');

async function graficoDias(){
    const conecta = await fetch('https://economia.awesomeapi.com.br/json/daily/USDT-BRL/30')
    const conectaTraduzido = await conecta.json();
    trataValoresParaGrafico(conectaTraduzido)

}

const grafico =  new Chart(elementoGrafico, {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: 'Moeda',
        data: [],
        borderWidth: 1
      }]
    },
  });

  function trataValoresParaGrafico(dados){
    
    dados.forEach(cotacao => {
        let data = converteData(cotacao.timestamp)
        let valor = cotacao.ask;
        let titulo = cotacao.name;

        adicionarDados(grafico, data, valor, titulo )
    })

  }

function converteData(timestamp){
    const data = new Date(timestamp);
    const dia = data.getDay();
    const mes = data.getMonth() +1 ;
    const ano = data.getFullYear();

    return dataBrasileira = `${dia < 10 ? '0' : ''}${dia}/${mes < 10 ? '0' : ''}${mes}/${ano}`
}

  export function adicionarDados(grafico, legenda, dados, titulo){
    grafico.data.labels.push(legenda);
    grafico.data.datasets.forEach((dataset) => {
        dataset.data.push(dados);
        dataset.label.push(titulo)
    });
    grafico.update();
  }

  