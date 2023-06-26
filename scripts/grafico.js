const elementoGrafico = document.getElementById('graficoMoeda');
const tituloMoeda = []


export async function graficoDias(){
    const conecta = await fetch('https://economia.awesomeapi.com.br/json/daily/USDT-BRL/10')
    const conectaTraduzido = await conecta.json();
    tituloMoeda.push(conectaTraduzido[0].name)
    // const conectaOrdenado = conectaTraduzido.sort((a, b) => a.timestamp - b.timestamp)
    trataValoresParaGrafico(conectaTraduzido)

}

const grafico =  new Chart(elementoGrafico, {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: tituloMoeda,
        data: [],
        borderWidth: 1
      }]
    },
  });
  

  function trataValoresParaGrafico(dados){
    const dadosOrdenados = dados.sort((a, b) => a.timestamp - b.timestamp)
    dadosOrdenados.forEach(cotacao => {
        let data = converteData(cotacao.timestamp)
        let valor = cotacao.ask;
        adicionarDados(grafico, data, valor )
    })
  }

function converteData(timestamp){
    const timestampMiliSegundos = timestamp * 1000
    const data = new Date(timestampMiliSegundos);
    const dia = data.getDate();
    const mes = data.getMonth() + 1;
    const ano = data.getFullYear();
    let dataBrasileira = `${dia < 10 ? '0' : ''}${dia}/${mes < 10 ? '0' : ''}${mes}/${ano}`

    return dataBrasileira
}

  function adicionarDados(grafico, legenda, dados){
    
    grafico.data.labels.push(legenda);
    grafico.data.datasets.forEach((dataset) => {
        dataset.data.push(dados);  
    });
    grafico.update();
  }

  