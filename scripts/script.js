const currencyInput = document.getElementById('currency');
const cotacaoDolar = 4.78;
const valorConvertidoH2 = document.getElementById('valorConvertido')

currencyInput.addEventListener('input', formataMoeda);
function formataMoeda(){
    const valor = parseFloat(currencyInput.value);
    const valorFormatado = valor.toLocaleString('en-US', {
        style:'currency',
        currency: 'USD',
    });

    currencyInput.value = valorFormatado

    converteValor(valorFormatado)
}

function converteValor(valor){
    const valorConvertido = toString(valor) * toString(cotacaoDolar)
    console.log(valorConvertido)

    valorConvertidoH2.innerText = ''
    valorConvertidoH2.innerText = valorConvertido

}