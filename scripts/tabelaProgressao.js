const valoresDeConversao = [1, 10, 50, 100, 500, 1000]
const tableConversion = document.getElementById('tabelaValorConvertido');

export function populaTabela(cotacaoMoeda){

        tableConversion.innerHTML = ''
        for(let index = 0; index < valoresDeConversao.length; index ++){
            let valorMultiplicado = cotacaoMoeda * valoresDeConversao[index]
            
            tableConversion.innerHTML +=
            `
            <tr>
                <td>${valoresDeConversao[index]}</td>
                <td>${parseFloat(valorMultiplicado).toFixed(2)}</td>
            </tr>
            `
        }
   };



 

