
const ulMoedaOrigem = document.getElementById('listaMoedaOrigem')
const ulMoedaDestino = document.getElementById('listaMoedaDestino')
const btnMoedasOrigem = document.getElementById('btnMoedasOrigem')
const btnMoedasDestino = document.getElementById('btnMoedasDestino')
const divListaMoedasOrigem = document.getElementById('divListaMoedasOrigem')
const divListaMoedasDestino = document.getElementById('divListaMoedasDestino')
const inputMoedaOrigem = document.getElementById('inputMoedaOrigem')
const inputMoedaDestino = document.getElementById('inputMoedaDestino')
let tiposDeMoedasCache = JSON.parse(localStorage.getItem('tiposDeMoedasCache'))

export async function possiveisMoedas(){

    // if(tiposDeMoedasCache){
    //     populaLista(tiposDeMoedasCache)
    // }
    // else{
        const conecta = await fetch('https://economia.awesomeapi.com.br/json/available/uniq');
        const conectaTraduzido = await conecta.json();
        localStorage.setItem('tiposDeMoedasCache', JSON.stringify(conectaTraduzido));
        populaListaMoedasOrigem(conectaTraduzido)
        populaListaMoedasDestino(conectaTraduzido)
    // }

}

function populaListaMoedasOrigem (valores){

    ulMoedaOrigem.innerHTML = ''
    ulMoedaDestino.innerHTML = ''
    Object.entries(valores).forEach(valor =>{
        let chave = valor[0];
        let value = valor[1];

        ulMoedaOrigem.innerHTML += `
        <li class="flex items-center gap-1 cursor-pointer">
            <img
            class="rounded-full h-6 w-6"
            src="https://financeone.com.br/wp-content/plugins/fo-currency-converter/assets/images/flags/png/Estados Unidos.png?ver=2.0.51"
            alt=""
            />
            <span class="text-xs borderb-2 border-transparent hover:border-b-2 hover:border-verde-medio transition duration-500">(${chave}) - ${value}</span>
        </li>
        `

    })

}

function populaListaMoedasDestino (valores){

    ulMoedaOrigem.innerHTML = ''
    ulMoedaDestino.innerHTML = ''
    Object.entries(valores).forEach(valor =>{
        let chave = valor[0];
        let value = valor[1];

        ulMoedaDestino.innerHTML += `
        <li class="flex items-center gap-1 cursor-pointer">
            <img
            class="rounded-full h-6 w-6"
            src="https://financeone.com.br/wp-content/plugins/fo-currency-converter/assets/images/flags/png/Estados Unidos.png?ver=2.0.51"
            alt=""
            />
            <span class="text-xs borderb-2 border-transparent hover:border-b-2 hover:border-verde-medio">(${chave}) - ${value}</span>
        </li>
        `
    })

}


export function listaMoedas(){
    btnMoedasOrigem.addEventListener('click', () =>{
        if(ulMoedaOrigem.children.length == 0){
            if(tiposDeMoedasCache){
                populaListaMoedasOrigem(tiposDeMoedasCache)
            }else{
                possiveisMoedas()
            }
        }
        divListaMoedasOrigem.classList.toggle('hidden')

        if(!divListaMoedasDestino.classList.contains('hidden')){
            
            divListaMoedasDestino.classList.toggle('hidden')
        }
    })
    
    btnMoedasDestino.addEventListener('click', () =>{
        if(ulMoedaDestino.children.length == 0){
            if(tiposDeMoedasCache){
                populaListaMoedasDestino(tiposDeMoedasCache)
            }else{
                possiveisMoedas()
            }
        }
        divListaMoedasDestino.classList.toggle('hidden')

        if(!divListaMoedasOrigem.classList.contains('hidden')){
            
            divListaMoedasOrigem.classList.toggle('hidden')
        }
    })
}


inputMoedaOrigem.addEventListener('input', ()=>{
    sugereMoeda(tiposDeMoedasCache)
})

function sugereMoeda(valores){
    const moedaPesquisaOrigem = inputMoedaOrigem.value.toLowerCase()

    const valoresEmObjetos = []
    for (let chave in valores){
        const novoObjeto = {};
        novoObjeto[chave] = valores[chave]
        valoresEmObjetos.push(novoObjeto)
    }

    // console.log(valoresEmObjetos)



    const moedaFiltrada = valoresEmObjetos.filter(moeda => moeda.toLowerCase().includes(moedaPesquisaOrigem))
    console.log(moedaFiltrada)











    Object.entries(valores).forEach(valor =>{
        let chave = valor[0];
        let value = valor[1];
        let valoresTratadosParaObjeto = valor.reduce((acc, item, index) => {
            if (index % 2 === 0) {
              acc[item] = valor[index + 1];
            }
            return acc;
          }, {});

        //   console.log(valoresTratadosParaObjeto)

        
        // moeda.toLowerCase().includes(moedaPesquisaOrigem)
        //  console.log(moedaFiltrada)

        ulMoedaOrigem.innerHTML = ''
        moedaFiltrada.forEach(moeda => {
            // console.log(moeda)

            ulMoedaOrigem.innerHTML +=
            `
            <li class="flex items-center gap-1 cursor-pointer">
            <img
            class="rounded-full h-6 w-6"
            src="https://financeone.com.br/wp-content/plugins/fo-currency-converter/assets/images/flags/png/Estados Unidos.png?ver=2.0.51"
            alt=""
            />
            <span class="text-xs borderb-2 border-transparent hover:border-b-2 hover:border-verde-medio">(${moeda[0]}) - ${moeda[1]}</span>
        </li>
            `
        })

    })


    
    // console.log(tiposDeMoedasCache)
    // const abc = [{'a': 'a'}, {'b': 'b'}, {'c': 'c'}]
    // const moedaFiltrada = abc.filter(moeda => moeda.toLowerCase.includes(moedaPesquisaOrigem))

    // ulMoedaOrigem.innerHTML = ''
    // moedaFiltrada.forEach(moeda => {
    //     const moedaLi = document.createElement('li')
    //     moedaLi.textContent = moeda
    //     ulMoedaOrigem.appendChild(moedaLi)
    // })
}