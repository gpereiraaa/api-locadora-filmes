/*************************************************************************************************************************************************
 * Objetivo: Arquivo responsavel pelas requisições da API do projeto da locadora de filmes 
 * Data: 07/10/2025
 * Autor: Gustavo Pereira 
 * Versão: 1.0
 ************************************************************************************************************************************************/


// Import das dependencias 
const express = require('express')
const cors = require('cors')

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

// Import das Routers da API

// Import da router de filme
const routesFilme = require('./routes/filmeRoutes.js')

// Criando a rota padrão do CRUD de filmes, chmando o cors e chmando o arquivo de Routes
app.use('/v1/locadora/filme', cors(), routesFilme)

// Import da router de genero
const routesGenero = require('./routes/generoRoutes.js')

// Criando a rota padrão do CRUD de genero, chmando o cors e chmando o arquivo de Routes
app.use('/v1/locadora/genero', cors(), routesGenero)

// Import da router de ator
const routesAtor = require('./routes/atorRoutes.js')

// Criando a rota padrão do CRUD de ator, chmando o cors e chmando o arquivo de Routes
app.use('/v1/locadora/ator', cors(), routesAtor)

// Import da router de produtora
const routesProdutora = require('./routes/produtoraRoutes.js')

// Criando a rota padrão do CRUD de produtora, chmando o cors e chmando o arquivo de Routes
app.use('/v1/locadora/produtora', cors(), routesProdutora)

// Import da router de personagem
const routesPersonagem = require('./routes/personagemRoutes.js')

// Criando a rota padrão do CRUD de produtora, chmando o cors e chmando o arquivo de Routes
app.use('/v1/locadora/personagem', cors(), routesPersonagem)

// Import da router de diretor
const routesDiretor = require('./routes/diretorRoutes.js')

// Criando a rota padrão do CRUD de diretor, chmando o cors e chmando o arquivo de Routes
app.use('/v1/locadora/diretor', cors(), routesDiretor)


app.listen(PORT, function () {
    console.log('API aguardando requisições!!!')
})