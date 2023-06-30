


export async function possiveisMoedas(){
    const conecta = await fetch('https://economia.awesomeapi.com.br/json/available/uniq');
    const conectaTraduzido = await conecta.json();
    console.log(conectaTraduzido)
}

possiveisMoedas()