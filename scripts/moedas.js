
const ulMoedaOrigem = document.getElementById('listaMoedaOrigem')
const ulMoedaDestino = document.getElementById('listaMoedaDestino')
const btnMoedasOrigem = document.getElementById('btnMoedasOrigem')
const btnMoedasDestino = document.getElementById('btnMoedasDestino')
const divListaMoedasOrigem = document.getElementById('divListaMoedasOrigem')
const divListaMoedasDestino = document.getElementById('divListaMoedasDestino')
const inputMoedaOrigem = document.getElementById('inputMoedaOrigem')
const inputMoedaDestino = document.getElementById('inputMoedaDestino')
const spanMoedaOrigem = document.getElementById('spanMoedaOrigem')
const spanMoedaDestino = document.getElementById('spanMoedaDestino')
let tiposDeMoedasCache = JSON.parse(localStorage.getItem('tiposDeMoedasCache'))

export async function possiveisMoedas(){
        const conecta = await fetch('https://economia.awesomeapi.com.br/json/available/uniq');
        const conectaTraduzido = await conecta.json();
        localStorage.setItem('tiposDeMoedasCache', JSON.stringify(conectaTraduzido));
        populaListaMoedas(conectaTraduzido, ulMoedaOrigem)
        populaListaMoedas(conectaTraduzido, ulMoedaDestino)
}

function populaListaMoedas(valores, ulmoeda){

    ulmoeda.innerHTML = ''
    Object.entries(valores).forEach(valor =>{
        let chave = valor[0];
        let value = valor[1];

        ulmoeda.innerHTML += `
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


export function listaMoedas(){
    btnMoedasOrigem.addEventListener('click', () =>{
        
        if(ulMoedaOrigem.children.length == 0){
            if(tiposDeMoedasCache){
                populaListaMoedas(tiposDeMoedasCache, ulMoedaOrigem)
            }else{
                possiveisMoedas()
            }
        }
        populaListaMoedas(tiposDeMoedasCache, ulMoedaOrigem)
        

        if(!divListaMoedasDestino.classList.contains('hidden')){
            
            divListaMoedasDestino.classList.toggle('hidden')
        }
        inputMoedaOrigem.value =''
        divListaMoedasOrigem.classList.toggle('hidden')
    })
    
    btnMoedasDestino.addEventListener('click', () =>{
        inputMoedaDestino.value = ''
        if(ulMoedaDestino.children.length == 0){
            if(tiposDeMoedasCache){
                populaListaMoedas(tiposDeMoedasCache, ulMoedaDestino)
            }else{
                possiveisMoedas()
            }
        }
        populaListaMoedas(tiposDeMoedasCache, ulMoedaDestino)
        divListaMoedasDestino.classList.toggle('hidden')

        if(!divListaMoedasOrigem.classList.contains('hidden')){
            
            divListaMoedasOrigem.classList.toggle('hidden')
        }
    })
}


inputMoedaOrigem.addEventListener('input', ()=>{
    const moedaPesquisaOrigem = inputMoedaOrigem.value.toLowerCase()
    sugereMoeda(tiposDeMoedasCache, ulMoedaOrigem, moedaPesquisaOrigem)
})

inputMoedaDestino.addEventListener('input', ()=>{
    const moedaPesquisaDestino = inputMoedaDestino.value.toLowerCase()
    sugereMoeda(tiposDeMoedasCache, ulMoedaDestino, moedaPesquisaDestino)
})


function sugereMoeda(valores, ulMoeda, inputMoeda){
    const arrayDeObjetos = Object.entries(valores).map(([id, descricao]) =>{
        return {id, descricao}
    })
    console.log(ulMoeda.id)

    const moedaFiltrada = arrayDeObjetos.filter(moeda => moeda.id.toLowerCase().includes(inputMoeda) || moeda.descricao.toLowerCase().includes(inputMoeda))

    ulMoeda.innerHTML = ''
    moedaFiltrada.forEach(moeda => {
        
        let liMoeda = 
        `
        <li class="flex items-center gap-1 cursor-pointer">
             <img
             class="rounded-full h-6 w-6"
             src="https://financeone.com.br/wp-content/plugins/fo-currency-converter/assets/images/flags/png/Estados Unidos.png?ver=2.0.51"
             alt=""
             />
             <span class="text-xs borderb-2 border-transparent hover:border-b-2 hover:border-verde-medio">(${moeda.id}) - ${moeda.descricao}</span>
         </li>
        `
        ulMoeda.innerHTML += liMoeda

        liMoeda.addEventListener('click', () => {
            console.log('clicou')
            if(ulMoeda.id == ulMoedaOrigem){
                spanMoedaOrigem.innerText = moeda.id.toUpperCase + ', ' + moeda.descricao.toUpperCase
            }
        })

    })
}

document.addEventListener('click', (event) =>{
    
    if(!btnMoedasOrigem.contains(event.target) && !divListaMoedasOrigem.contains(event.target)){
        divListaMoedasOrigem.classList.add('hidden')
    }

    if(!btnMoedasDestino.contains(event.target) && !divListaMoedasDestino.contains(event.target)){
        divListaMoedasDestino.classList.add('hidden')
    }
})