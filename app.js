/*************************************************************************************************************************************************
 * Objetivo: Arquivo responsavel pelas requisições da API do projeto da locadora de filmes 
 * Data: 07/10/2025
 * Autor: Gustavo Pereira 
 * Versão: 1.0
 ************************************************************************************************************************************************/


// Import das dependencias 
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

// Cria um objeto esoecialista no formato JSON para receber os dados do body (POST E PUT)
const bodyParserJSON = bodyParser.json()

// Instacia na classe do express
const app = express()

// Porta
const PORT = process.PORT || 8080

// Configurações do CORS
app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    app.use(cors())
    next()
})

// Import das controllers da API
const controllerFilme = require('./controller/filme/controller_filme.js')

// Endpoint para CRUD de filmes

// Retorna a lista de filmes
app.get('/v1/locadora/filme', cors(), async function(request, response) {

    // Chama a função da controller para retornar todos os filmes
    let filme = await controllerFilme.listarFilmes()

    response.status(filme.status_code)
    response.json(filme)      
})

// Retorna um filme filtrando pelo ID
app.get('/v1/locadora/filme/:id', cors(), async function(request, response) {

    // Recebe o ID enviado na requisição via parametro
    let idFilme = request.params.id

    // Chama a função da controller para retornar um filme pelo ID
    let filme = await controllerFilme.buscarFilmeId(idFilme)

    response.status(filme.status_code)
    response.json(filme)      
})

// Insere um novo filme no BD
app.post('/v1/locadora/filme', cors(), bodyParserJSON, async function(request, response) {
    // Recebe o objeto JSON pelo body da requisição
    let dadosBody = request.body

    // Recebe o content type da requisição
    let contentType = request.headers['content-type']

    // Chama a função da controller para inserir o filme, enviamos os dados do body e o content-type
    let filme = await controllerFilme.inserirFilme(dadosBody, contentType)

    response.status(filme.status_code)
    response.json(filme)
})


app.listen(PORT, function(){
    console.log('API aguardando requisições!!!')
})