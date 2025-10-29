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
// Import da controller de filme
const controllerFilme = require('./controller/filme/controller_filme.js')

// Import da controller de genero
const controllerGenero = require('./controller/filme/controller_genero.js')

// Import da controller de ator
const controllerAtor = require('./controller/filme/controller_ator.js')

// Import da controller de produtora
const controllerProdutora = require('./controller/filme/produtora/controller_produtora.js')

// Import da controller de personagens
const controllerPersonagem = require('./controller/filme/personagem/controller_personagem.js')

// Endpoint para CRUD de filmes

// Retorna a lista de filmes
app.get('/v1/locadora/filme', cors(), async function (request, response) {

    // Chama a função da controller para retornar todos os filmes
    let filme = await controllerFilme.listarFilmes()

    response.status(filme.status_code)
    response.json(filme)
})

// Retorna um filme filtrando pelo ID
app.get('/v1/locadora/filme/:id', cors(), async function (request, response) {

    // Recebe o ID enviado na requisição via parametro
    let idFilme = request.params.id

    // Chama a função da controller para retornar um filme pelo ID
    let filme = await controllerFilme.buscarFilmeId(idFilme)

    response.status(filme.status_code)
    response.json(filme)
})

// Insere um novo filme no BD
app.post('/v1/locadora/filme', cors(), bodyParserJSON, async function (request, response) {
    // Recebe o objeto JSON pelo body da requisição
    let dadosBody = request.body

    // Recebe o content type da requisição
    let contentType = request.headers['content-type']

    // Chama a função da controller para inserir o filme, enviamos os dados do body e o content-type
    let filme = await controllerFilme.inserirFilme(dadosBody, contentType)

    response.status(filme.status_code)
    response.json(filme)
})

//
app.put('/v1/locadora/filme/:id', cors(), bodyParserJSON, async function (request, response) {
    // Recebe os dados do body
    let dadosBody = request.body

    // Recebe o id do filme encaminhado pela URL
    let idFilme = request.params.id

    // Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    // Chama a função para atualizar o filme
    let filme = await controllerFilme.atualizarFilme(dadosBody, idFilme, contentType)

    response.status(filme.status_code)
    response.json(filme)

})

app.delete('/v1/locadora/filme/:id', cors(), async function (request, response) {
    // Recebe o ID 
    let idFilme = request.params.id

    // chama a função deletar 
    let filme = await controllerFilme.excluirFilme(idFilme)

    response.status(filme.status_code)
    response.json(filme)
})

// EndPoint para CRUD de generos

// Retorna todos os generos
app.get('/v1/locadora/generos', cors(), async function (request, response) {

    // Chama a função da controller para retornar todos os generos
    let generos = await controllerGenero.listarGeneros()

    response.status(generos.status_code)
    response.json(generos)
})

// Retorna um genero de filme filtrando pelo ID
app.get('/v1/locadora/genero/:id', cors(), async function (request, response) {

    // Recebe o ID enviado na requisição via parametro
    let idGenero = request.params.id

    // Chama a função da controller para retornar um genero pelo ID
    let genero = await controllerGenero.buscarGeneroId(idGenero)

    response.status(genero.status_code)
    response.json(genero)
})

// Insere um novo genero no BD
app.post('/v1/locadora/genero', cors(), bodyParserJSON, async function (request, response) {
    // Recebe o objeto JSON pelo body da requisição
    let dadosBody = request.body

    // Recebe o content type da requisição
    let contentType = request.headers['content-type']

    // Chama a função da controller para inserir o genero, enviamos os dados do body e o content-type
    let genero = await controllerGenero.inserirGenero(dadosBody, contentType)

    response.status(genero.status_code)
    response.json(genero)
})

// Atualiza um genero existente no BD
app.put('/v1/locadora/genero/:id', cors(), bodyParserJSON, async function (request, response) {

    // Recebe os dados enviados no body
    let dadosBody = request.body

    // Recebe o ID do genero encaminhado pela URL
    let idGenero = request.params.id

    // Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    // Chama a função da controller que atualiza o genero
    let genero = await controllerGenero.atualizarGenero(dadosBody, idGenero, contentType)

    response.status(genero.status_code)
    response.json(genero)
})

// Deleta um genero existente no BD
app.delete('/v1/locadora/genero/:id', cors(), async function (request, response) {
    // Recebe o ID via params
    let idGenero = request.params.id

    // Chama a função deletar da controller
    let genero = await controllerGenero.excluirGenero(idGenero)

    response.status(genero.status_code)
    response.json(genero)
})


// EndPoints para CRUD de atores

// Retorna todos os atores
app.get('/v1/locadora/atores', cors(), async function (request, response) {
    // Chama a função da controller para listar todos os atores
    let result = await controllerAtor.listarAtores()

    response.status(result.status_code)
    response.json(result)
})

// Retorna um ator pelo ID
app.get('/v1/locadora/ator/:id', cors(), async function (request, response) {
    // Pega o ID enviado na requisição
    let idAtor = request.params.id

    // Chama a função da controller para retornar um ator
    let ator = await controllerAtor.buscarAtorId(idAtor)

    response.status(ator.status_code)
    response.json(ator)
})

// Insere um novo ator no BD
app.post('/v1/locadora/ator', cors(), bodyParserJSON, async function (request, response) {
    // Recebe o objeto JSON pelo body da requisição
    let dadosBody = request.body

    // Recebe o content type da requisição
    let contentType = request.headers['content-type']

    // Chama a função da controller para inserir o genero, enviamos os dados do body e o content-type
    let ator = await controllerAtor.inserirAtor(dadosBody, contentType)

    response.status(ator.status_code)
    response.json(ator)
})

// Atualiza um ator existente no BD
app.put('/v1/locadora/ator/:id', cors(), bodyParserJSON, async function (request, response) {

    // Recebe os dados enviados no body
    let dadosBody = request.body

    // Recebe o ID do genero encaminhado pela URL
    let idAtor = request.params.id

    // Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    // Chama a função da controller que atualiza o ator
    let ator = await controllerAtor.atualizarAtor(dadosBody, idAtor, contentType)

    response.status(ator.status_code)
    response.json(ator)
})

// Deleta um ator existente no BD
app.delete('/v1/locadora/ator/:id', cors(), async function (request, response) {
    // Recebe o ID via params
    let idAtor = request.params.id

    // Chama a função deletar da controller
    let ator = await controllerAtor.deletarAtor(idAtor)

    response.status(ator.status_code)
    response.json(ator)
})

// EndPoints para CRUD de produtoras

// Retorna todos os generos
app.get('/v1/locadora/produtoras', cors(), async function (request, response) {

    // Chama a função da controller para retornar todas as produtoras
    let produtoras = await controllerProdutora.listarProdutoras()

    response.status(produtoras.status_code)
    response.json(produtoras)
})

// Retorna uma produtora pelo ID
app.get('/v1/locadora/produtora/:id', cors(), async function (request, response) {
    // Pega o ID enviado via Params
    let idProdutora = request.params.id

    // Chama a função da controller para retorna o filme pelo ID
    let produtora = await controllerProdutora.buscarProdutoraId(idProdutora)

    response.status(produtora.status_code)
    response.json(produtora)
})

// Insere uma nova produtora no BD
app.post('/v1/locadora/produtora', cors(), bodyParserJSON, async function (request, response) {
    // Recebe o objeto JSON pelo body da requisição
    let dadosBody = request.body

    // Recebe o content type da requisição
    let contentType = request.headers['content-type']

    // Chama a função da controller para inserir a nova produtora
    let produtora = await controllerProdutora.inserirProdutora(dadosBody, contentType)

    response.status(produtora.status_code)
    response.json(produtora)
})

// Atualiza uma produtora existente
app.put('/v1/locadora/produtora/:id', cors(), bodyParserJSON, async function (request, response) {

    // Recebe os dados enviados no Body
    let dadosBody = request.body

    // Recebe o ID da produtora encaminhado pela URL
    let idProdutora = request.params.id

    // Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    // Chama a função da controller que atualiza a produtora
    let produtora = await controllerProdutora.atualizarProdutora(dadosBody, idProdutora, contentType)

    response.status(produtora.status_code)
    response.json(produtora)
})

// Deleta uma produtora existente
app.delete('/v1/locadora/produtora/:id', cors(), async function (request, response) {
    // Recebe o ID enviado via params
    let idProdutora = request.params.id

    // Chama a função da controller que deleta uma produtora
    let produtora = await controllerProdutora.deletarProdutora(idProdutora)

    response.status(produtora.status_code)
    response.json(produtora)
})


// EndPoints para CRUD de personagens

// Retorna todos os personagens
app.get('/v1/locadora/personagens', cors(), async function (request, response) {

    // Chama a função da controller que retorna todos os personagens
    let personagem = await controllerPersonagem.listarPersonagens()

    response.status(personagem.status_code)
    response.json(personagem)    
})

// Retorna um personagem pelo ID
app.get('/v1/locadora/personagem/:id', cors(), async function (request, response) {
    // Pega o id enviado via params
    let idPersonagem = request.params.id

    // Chama a função da controller que retorna o personagem pelo id
    let personagem = await controllerPersonagem.buscarPersonagemId(idPersonagem)

    response.status(personagem.status_code)
    response.json(personagem)
})

app.listen(PORT, function () {
    console.log('API aguardando requisições!!!')
})