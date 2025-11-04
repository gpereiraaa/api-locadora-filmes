/*************************************************************************************************************
 * Objetivo: Arquivo responsavel pelas rotas do CRUD de filmes
 * Data: 03/11/2025
 * Autor: Gustavo Pereira 
 * Versão: 1.0
 ********************************************************************************************************/


// Importando o express
const express = require('express')

// Criar um router
const router = express.Router()

// Importando o controller de filme
const controllerFilme = require('../controller/filme/controller_filme.js')

// Importando o body-parser
const bodyParser = require('body-parser')

// Cria um objeto esoecialista no formato JSON para receber os dados do body (POST E PUT)
const bodyParserJSON = bodyParser.json()


// Criando as rotas dos filmes

// Retorna a lista de filmes
router.get('/', async function (request, response) {

    // Chama a função da controller para retornar todos os filmes
    let filme = await controllerFilme.listarFilmes()

    response.status(filme.status_code)
    response.json(filme)
})

// Retorna um filme filtrando pelo ID
router.get('/:id', async function (request, response) {

    // Recebe o ID enviado na requisição via parametro
    let idFilme = request.params.id

    // Chama a função da controller para retornar um filme pelo ID
    let filme = await controllerFilme.buscarFilmeId(idFilme)

    response.status(filme.status_code)
    response.json(filme)
})

// Insere um novo filme no BD
router.post('/', bodyParserJSON, async function (request, response) {
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
router.put('/:id', bodyParserJSON, async function (request, response) {
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

router.delete('/:id', async function (request, response) {
    // Recebe o ID 
    let idFilme = request.params.id

    // chama a função deletar 
    let filme = await controllerFilme.excluirFilme(idFilme)

    response.status(filme.status_code)
    response.json(filme)
})

module.exports = router