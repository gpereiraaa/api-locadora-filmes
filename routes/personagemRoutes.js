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

module.exports = router