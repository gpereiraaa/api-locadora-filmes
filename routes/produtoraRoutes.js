/*************************************************************************************************************
 * Objetivo: Arquivo responsavel pelas rotas do CRUD de produtoras
 * Data: 03/11/2025
 * Autor: Gustavo Pereira 
 * Versão: 1.0
 ********************************************************************************************************/

// Importando o express
const express = require('express')

// Criar um router
const router = express.Router()

// Importando o controller de produtora
const controllerProdutora = require('../controller/filme/produtora/controller_produtora.js')

// Importando o body-parser
const bodyParser = require('body-parser')

// Cria um objeto esoecialista no formato JSON para receber os dados do body (POST E PUT)
const bodyParserJSON = bodyParser.json()

// Criando as rotas dos produtoras

// Retorna todas as produtoras
router.get('/', async function (request, response) {

    // Chama a função da controller para retornar todas as produtoras
    let produtoras = await controllerProdutora.listarProdutoras()

    response.status(produtoras.status_code)
    response.json(produtoras)
})

// Retorna uma produtora pelo ID
router.get('/:id', async function (request, response) {
    // Pega o ID enviado via Params
    let idProdutora = request.params.id

    // Chama a função da controller para retorna o filme pelo ID
    let produtora = await controllerProdutora.buscarProdutoraId(idProdutora)

    response.status(produtora.status_code)
    response.json(produtora)
})

// Insere uma nova produtora no BD
router.post('/', bodyParserJSON, async function (request, response) {
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
router.put('/:id', bodyParserJSON, async function (request, response) {

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
router.delete('/:id', async function (request, response) {
    // Recebe o ID enviado via params
    let idProdutora = request.params.id

    // Chama a função da controller que deleta uma produtora
    let produtora = await controllerProdutora.deletarProdutora(idProdutora)

    response.status(produtora.status_code)
    response.json(produtora)
})

module.exports = router