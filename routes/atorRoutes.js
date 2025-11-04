/*************************************************************************************************************
 * Objetivo: Arquivo responsavel pelas rotas do CRUD de atores
 * Data: 03/11/2025
 * Autor: Gustavo Pereira 
 * Versão: 1.0
 ********************************************************************************************************/

// Importando o express
const express = require('express')

// Criar um router
const router = express.Router()

// Importando o controller de filme
const controllerAtor = require('../controller/filme/controller_ator.js')

// Importando o body-parser
const bodyParser = require('body-parser')

// Cria um objeto esoecialista no formato JSON para receber os dados do body (POST E PUT)
const bodyParserJSON = bodyParser.json()

// Criando as rotas dos filmes

// Retorna todos os atores
router.get('/', async function (request, response) {
    // Chama a função da controller para listar todos os atores
    let result = await controllerAtor.listarAtores()

    response.status(result.status_code)
    response.json(result)
})

// Retorna um ator pelo ID
router.get('/:id', async function (request, response) {
    // Pega o ID enviado na requisição
    let idAtor = request.params.id

    // Chama a função da controller para retornar um ator
    let ator = await controllerAtor.buscarAtorId(idAtor)

    response.status(ator.status_code)
    response.json(ator)
})

// Insere um novo ator no BD
router.post('/', bodyParserJSON, async function (request, response) {
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
router.put('/:id', bodyParserJSON, async function (request, response) {

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
router.delete('/:id', async function (request, response) {
    // Recebe o ID via params
    let idAtor = request.params.id

    // Chama a função deletar da controller
    let ator = await controllerAtor.deletarAtor(idAtor)

    response.status(ator.status_code)
    response.json(ator)
})

module.exports = router