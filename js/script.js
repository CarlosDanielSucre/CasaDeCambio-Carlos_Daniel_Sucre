
//CRIAR A LISTA DE OPTIONS PARA O USUARIO SELECCIONAR O TIPO DE MOEDA

fetch("https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/Moedas?$top=100&$format=json&$select=simbolo,nomeFormatado,tipoMoeda")
.then(respuestaApi=>respuestaApi.json())
.then(dadosJson =>{
    for (const i in dadosJson.value) {
        let nomeMoeda = dadosJson.value[i].nomeFormatado
        let simboloMoeda = dadosJson.value[i].simbolo

        listarMoedasOrigem(nomeMoeda,simboloMoeda)
        listarMoedasDestino(nomeMoeda,simboloMoeda)
    }
    
})

function listarMoedasOrigem(nome, simbolo){
    let mensagem = `${nome} (${simbolo}) `
    let listaOrigem = document.getElementById("listaOrigem")
    let novaOption = document.createElement('option')
    novaOption.value = simbolo
    novaOption.innerHTML = mensagem
    listaOrigem.appendChild(novaOption)

}

function listarMoedasDestino(nome, simbolo){
    let mensagem = `${nome} (${simbolo}) `
    let listaDestino = document.getElementById("listaDestino")
    let novaOption = document.createElement('option')
    novaOption.value = simbolo
    novaOption.innerHTML = mensagem
    listaDestino.appendChild(novaOption)

}

// FAZER A CONVERSÃO DE MOEDAS

async function converter(){
    let selectorOrigem = document.getElementById('listaOrigem')
    let selectorDestino = document.getElementById("listaDestino")
    let valorMoedaOrigem = await valorMoeda(selectorOrigem.value)
    valorMoedaOrigem = valorMoedaOrigem.cotacaoCompra
    let valorMoedaDestino = await valorMoeda(selectorDestino.value)
    valorMoedaDestino = valorMoedaDestino.cotacaoVenda
    
    mostrarResultado(valorMoedaOrigem, valorMoedaDestino)
}

async function valorMoeda(simboloDaMoeda){

    let solic = await fetch(`https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaDia(moeda=@moeda,dataCotacao=@dataCotacao)?@moeda='${simboloDaMoeda}'&@dataCotacao='${'11-09-2023'}'&$top=100&$format=json&$select=cotacaoCompra,cotacaoVenda`)
    solic = await solic.json()
    solic = await solic.value
    solic = await solic[solic.length-1]
    
    return solic
}

function dataHoje(){
    let data = new Date
    let ano = data.getFullYear()
    let mes = data.getMonth()+1
    let diaS = data.getDate()

    if(diaS < 10){
        var dia = `0${diaS}`
    }else{
        dia = diaS
    }
    return `${mes}-${dia}-${ano}`
      
}
