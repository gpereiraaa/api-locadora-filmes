/*************************************************************************************************************
 * Objetivo: Arquivo responsavel pelas rotas do CRUD de Personagens
 * Data: 03/11/2025
 * Autor: Gustavo Pereira 
 * Versão: 1.0
 ********************************************************************************************************/

// Importando o express
const express = require('express')

// Criar um router
const router = express.Router()

// Importando o controller de personagem
const controllerPersonagem = require('../controller/filme/personagem/controller_personagem.js')

// Importando o body-parser
const bodyParser = require('body-parser')

// Cria um objeto esoecialista no formato JSON para receber os dados do body (POST E PUT)
const bodyParserJSON = bodyParser.json()

// Criando as rotas de personagem

// Retorna todos os personagens
router.get('/', async function (request, response) {

    // Chama a função da controller que retorna todos os personagens
    let personagem = await controllerPersonagem.listarPersonagens()

    response.status(personagem.status_code)
    response.json(personagem)
})

// Retorna um personagem pelo ID
router.get('/:id', async function (request, response) {
    // Pega o id enviado via params
    let idPersonagem = request.params.id

    // Chama a função da controller que retorna o personagem pelo id
    let personagem = await controllerPersonagem.buscarPersonagemId(idPersonagem)

    response.status(personagem.status_code)
    response.json(personagem)
})

// Insere um personagem
router.post('/', bodyParserJSON, async function (request, response) {
    // Recebe o objeto JSON pelo body da requisição
    let dadosBody = request.body

    // Recebe o content type da requisição
    let contentType = request.headers['content-type']

    // Chama a função da controller para inserir um personagem, enviando os dados do body e o content-type
    let personagem = await controllerPersonagem.inserirPersonagem(dadosBody, contentType)

    response.status(personagem.status_code)
    response.json(personagem)
})

// Atualiza um personagem
router.put('/:id', bodyParserJSON, async function (request, response) {
    // Recebe o objeto JSON pelo body da requisição
    let dadosBody = request.body

    // Recebe o ID do personagem encaminhado via params
    let idPersonagem = request.params.id

    // Recebe o content type da requisição
    let contentType = request.headers['content-type']

    // Chama a função da controller para atualizar um personagem, enviando os dados do body, o content-type e o ID
    let personagem = await controllerPersonagem.atualizarPersonagem(dadosBody, idPersonagem, contentType)

    response.status(personagem.status_code)
    response.json(personagem)
})

// Deleta um personagem
router.delete('/:id', async function (request, response) {
    // Recebe o ID via params
    let idPersonagem = request.params.id

    // Chama a função deletar da controller
    let personagem = await controllerPersonagem.deletarPersonagem(idPersonagem)

    response.status(personagem.status_code)
    response.json(personagem)
})

module.exports = router