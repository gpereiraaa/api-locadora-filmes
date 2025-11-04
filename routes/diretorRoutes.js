/*************************************************************************************************************
 * Objetivo: Arquivo responsavel pelas rotas do CRUD de Diretores
 * Data: 03/11/2025
 * Autor: Gustavo Pereira 
 * Versão: 1.0
 ********************************************************************************************************/

// Importando o express
const express = require('express')

// Criar um router
const router = express.Router()

// Importando o controller de diretor
const controllerDiretor = require('../controller/filme/diretor/controller_diretor.js')

// Importando o body-parser
const bodyParser = require('body-parser')

// Cria um objeto esoecialista no formato JSON para receber os dados do body (POST E PUT)
const bodyParserJSON = bodyParser.json()

// Criando as rotas dos diretores

// Retorna todos os diretores
router.get('/', async function (request, response) {
    // Chama a função da controller para listar todos os diretores
    let result = await controllerDiretor.listarDiretores()

    response.status(result.status_code)
    response.json(result)
})

// Retorna um diretor pelo ID
router.get('/:id', async function (request, response) {
    // Pega o ID enviado na requisição
    let idDiretor = request.params.id

    // Chama a função da controller para retornar um diretor
    let diretor = await controllerDiretor.buscarDiretorId(idDiretor)

    response.status(diretor.status_code)
    response.json(diretor)
})

// Insere um novo diretor no BD
router.post('/', bodyParserJSON, async function (request, response) {
    // Recebe o objeto JSON pelo body da requisição
    let dadosBody = request.body

    // Recebe o content type da requisição
    let contentType = request.headers['content-type']

    // Chama a função da controller para inserir o diretor, enviamos os dados do body e o content-type
    let diretor = await controllerDiretor.inserirDiretor(dadosBody, contentType)

    response.status(diretor.status_code)
    response.json(diretor)
})

// Atualiza um diretor existente no BD
router.put('/:id', bodyParserJSON, async function (request, response) {

    // Recebe os dados enviados no body
    let dadosBody = request.body

    // Recebe o ID do diretor encaminhado pela URL
    let idDiretor = request.params.id

    // Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    // Chama a função da controller que atualiza o diretor
    let diretor = await controllerDiretor.atualizarDiretor(dadosBody, idDiretor, contentType)

    response.status(diretor.status_code)
    response.json(diretor)
})

// Deleta um diretor existente no BD
router.delete('/:id', async function (request, response) {
    // Recebe o ID via params
    let idDiretor = request.params.id

    // Chama a função deletar da controller
    let diretor = await controllerDiretor.deletarDiretor(idDiretor)

    response.status(diretor.status_code)
    response.json(diretor)
})

module.exports = router