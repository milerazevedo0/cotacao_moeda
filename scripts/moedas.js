
import{recebeSelecaoDeMoedaOrigem, recebeSelecaoDeMoedaDestino} from './script.js'

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
        const moedaPesquisaOrigem = inputMoedaOrigem.value.toLowerCase()
        
        if(ulMoedaOrigem.children.length == 0){
            if(tiposDeMoedasCache){
                populaListaMoedas(tiposDeMoedasCache, ulMoedaOrigem)
            }else{
                possiveisMoedas()
            }
        }
        
        if(!divListaMoedasDestino.classList.contains('hidden')){
            
            divListaMoedasDestino.classList.toggle('hidden')
        }
        populaListaMoedas(tiposDeMoedasCache, ulMoedaOrigem)
        inputMoedaOrigem.value =''
        divListaMoedasOrigem.classList.toggle('hidden')
        sugereMoeda(tiposDeMoedasCache, ulMoedaOrigem,moedaPesquisaOrigem)
        
        
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

        if(!divListaMoedasOrigem.classList.contains('hidden')){
            
            divListaMoedasOrigem.classList.toggle('hidden')
        }
        populaListaMoedas(tiposDeMoedasCache, ulMoedaDestino)
        divListaMoedasDestino.classList.toggle('hidden')
        const moedaPesquisaDestino = inputMoedaDestino.value.toLowerCase()
        sugereMoeda(tiposDeMoedasCache, ulMoedaDestino, moedaPesquisaDestino)
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

    const moedaFiltrada = arrayDeObjetos.filter(moeda => moeda.id.toLowerCase().includes(inputMoeda) || moeda.descricao.toLowerCase().includes(inputMoeda))

    ulMoeda.innerHTML = ''
    moedaFiltrada.forEach(moeda => {
        
        let liMoeda = document.createElement('li')
        liMoeda.classList.add('flex')
        liMoeda.classList.add('items-center')
        liMoeda.classList.add('gap-1')
        liMoeda.classList.add('cursor-pointer')
        let imgMoeda = document.createElement('img')
        imgMoeda.setAttribute('src', 'https://financeone.com.br/wp-content/plugins/fo-currency-converter/assets/images/flags/png/Estados Unidos.png?ver=2.0.51')
        imgMoeda.classList.add('rounded-full')
        imgMoeda.classList.add('h-6')
        imgMoeda.classList.add('w-6')
        let spanMoeda = document.createElement('span')
        spanMoeda.classList.add('text-xs')
        spanMoeda.classList.add('border-b-2')
        spanMoeda.classList.add('border-transparent')
        spanMoeda.classList.add('hover:border-b-2')
        spanMoeda.classList.add('hover:border-verde-medio')
        spanMoeda.innerText = moeda.id + ' - ' + moeda.descricao

        liMoeda.appendChild(imgMoeda)
        liMoeda.appendChild(spanMoeda)

        ulMoeda.appendChild(liMoeda)
        
        liMoeda.addEventListener('click', () => {
            if(ulMoeda.id == ulMoedaOrigem.id){
                spanMoedaOrigem.innerText = moeda.id.toUpperCase() + ', ' + moeda.descricao.toUpperCase()
                divListaMoedasOrigem.classList.toggle('hidden')
                recebeSelecaoDeMoedaOrigem(moeda.id.toUpperCase())
            }

            if(ulMoeda.id == ulMoedaDestino.id){
                spanMoedaDestino.innerText = moeda.id.toUpperCase() + ', ' + moeda.descricao.toUpperCase()
                divListaMoedasDestino.classList.toggle('hidden')
                recebeSelecaoDeMoedas(moeda.id.toUpperCase() )
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