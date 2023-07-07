const elementoGrafico = document.getElementById('graficoMoeda');
const tituloMoeda = []
let idMoedaOrigem = 'EUR'
let idMoedaDestino = 'BRL'
const btnDias = document.querySelectorAll('.btn-dias')
let diasGrafico = 7

export async function graficoDias(dias, moedaOrigem, moedaDestino){
    idMoedaOrigem = moedaOrigem
    idMoedaDestino = moedaDestino
    const conecta = await fetch(`https://economia.awesomeapi.com.br/json/daily/${moedaOrigem}-${moedaDestino}/${dias}`)
    const conectaTraduzido = await conecta.json();
    tituloMoeda.splice(0, tituloMoeda.length);
    // console.log(conectaTraduzido)

    if(conectaTraduzido[0].name == undefined){
      for(let i = 0; i < conectaTraduzido.length; i++){
        if(!conectaTraduzido[i].name == undefined){
          tituloMoeda.push(conectaTraduzido[i].name)
        }
      }
    } tituloMoeda.push(conectaTraduzido[0].name)

    // tituloMoeda.push(conectaTraduzido[0].name)
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
    options: {
      responsive: true,
      maintainAspectRatio: false,
    }
  });
  

  function trataValoresParaGrafico(dados){
    removeDadosDoGrafico();
    const dadosOrdenados = dados.sort((a, b) => a.timestamp - b.timestamp)
    dadosOrdenados.forEach(cotacao => {
        let data = converteData(cotacao.timestamp)
        let valor = parseFloat(cotacao.ask).toFixed(2);
        
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

  function removeDadosDoGrafico(){
    grafico.data.labels.splice(0, grafico.data.labels.length);
    grafico.data.datasets.forEach((dataset) =>{
      dataset.data.splice(0, dataset.data.length);
    });
    grafico.update();
  };

  btnDias.forEach((btn) =>{
    btn.addEventListener('click', (e) => {
      for(let i = 0; i < btnDias.length ; i++){
          btnDias[i].classList.remove('bg-verde-claro')
      }
      const dias = e.target.attributes[1].value
      diasGrafico = parseInt(dias)
      graficoDias(diasGrafico, idMoedaOrigem, idMoedaDestino)
      btn.classList.add('bg-verde-claro')
    })
  })
  