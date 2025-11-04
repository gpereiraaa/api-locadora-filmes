/*************************************************************************************************************
 * Objetivo: Arquivo responsavel pelas rotas do CRUD de genero
 * Data: 03/11/2025
 * Autor: Gustavo Pereira 
 * Versão: 1.0
 ********************************************************************************************************/

// Importando o express
const express = require('express')

// Criar um router
const router = express.Router()

// Importando o controller de genero
const controllerGenero = require('../controller/filme/controller_genero.js')

// Importando o body-parser
const bodyParser = require('body-parser')

// Cria um objeto esoecialista no formato JSON para receber os dados do body (POST E PUT)
const bodyParserJSON = bodyParser.json()

// Criando as rotas dos generos

// Retorna todos os generos
router.get('/', async function (request, response) {

    // Chama a função da controller para retornar todos os generos
    let generos = await controllerGenero.listarGeneros()

    response.status(generos.status_code)
    response.json(generos)
})

// Retorna um genero de filme filtrando pelo ID
router.get('/:id', async function (request, response) {

    // Recebe o ID enviado na requisição via parametro
    let idGenero = request.params.id

    // Chama a função da controller para retornar um genero pelo ID
    let genero = await controllerGenero.buscarGeneroId(idGenero)

    response.status(genero.status_code)
    response.json(genero)
})

// Insere um novo genero no BD
router.post('/', bodyParserJSON, async function (request, response) {
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
router.put('/:id', bodyParserJSON, async function (request, response) {

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
router.delete('/:id', async function (request, response) {
    // Recebe o ID via params
    let idGenero = request.params.id

    // Chama a função deletar da controller
    let genero = await controllerGenero.excluirGenero(idGenero)

    response.status(genero.status_code)
    response.json(genero)
})

module.exports = router