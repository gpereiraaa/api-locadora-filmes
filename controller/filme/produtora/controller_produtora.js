/*******************************************************************
 * Objetivo: Arquivo responsavel pela manipulação de dados entre o APP e a Model (Validações, tratamento de dados, tratamento de erros, etc)
 * Data: 22/10/2025
 * Autor: Gustavo Pereira
 * Versão: 1.0
 */

// Import do arquivo DAO para manipular o CRUD
const produtoraDAO = require('../../../model/DAO/produtora.js')

// Import do arquivo padrão das mensagens 
const MESSAGE_DEFAULT = require('../../modulo/config_messages.js')

// Retorna todas as produtoras
const listarProdutoras = async function () {

    // Realizando copia do objeto de mensagem padrão, permitindo que as alterações feitas nesta função não interfiram em outra função
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        // Chama a função do DAO que retorna a lista de produtoras 
        let result = await produtoraDAO.getSelectAllProducers()

        if (result) {
            if (result.length > 0) {
                MESSAGE.HEADER.status = MESSAGE.SUCCESS_REQUEST.status
                MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code
                MESSAGE.HEADER.response.produtoras = result

                return MESSAGE.HEADER // 200
            } else
                return MESSAGE.ERROR_NOT_FOUND // 404
        } else
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL // 500
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

// Retorna uma produtora pelo ID
const buscarProdutoraId = async function (id) {

    // Realizando copia do objeto de mensagem padrão, permitindo que as alterações feitas nesta função não interfiram em outra função
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        // Validação de ID obrigatório e que seja um numero
        if (id != '' && id != null && id != undefined && !isNaN(id) && id > 0) {
            // Chama a função do DAO que retorna a produtora pelo ID
            let result = await produtoraDAO.getSelectByIdProducer(id)

            if (result) {
                if (result.length > 0) {
                    MESSAGE.HEADER.status = MESSAGE.SUCCESS_REQUEST.status
                    MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code
                    MESSAGE.HEADER.response.produtora = result

                    return MESSAGE.HEADER // 200
                } else
                    return MESSAGE.ERROR_NOT_FOUND // 404
            } else
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL // 500
        } else {
            MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [ID] inválido!!!'
            return MESSAGE.ERROR_REQUIRED_FIELDS // 400
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

// Insere uma nova produtora
const inserirProdutora = async function (produtora, contentType) {

    // Realizando copia do objeto de mensagem padrão, permitindo que as alterações feitas nesta função não interfiram em outra função
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            // Chama a função de validação de dados
            let validarDados = validarDadosProdutora(produtora)

            // Verifica se retornou false, se sim continua
            if (!validarDados) {

                // Chama a função do DAO para inserir a nova produtora
                let result = await produtoraDAO.setInsertProducer(produtora)

                // Valida se result é verdadeiro
                if (result) {
                    // Chama a função que retorna o ID gerado no BD
                    let lastIdProducer = await produtoraDAO.getSelectLastIdProducer()

                    // Verifica se é verdadeiro
                    if (lastIdProducer) {
                        // Adiciona no JSON o ID
                        produtora.id = lastIdProducer

                        MESSAGE.HEADER.status = MESSAGE.SUCCESS_CREATED_ITEM.status
                        MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_CREATED_ITEM.status_code
                        MESSAGE.HEADER.message = MESSAGE.SUCCESS_CREATED_ITEM.message
                        MESSAGE.HEADER.response = produtora

                        return MESSAGE.HEADER // 201
                    } else
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL // 500
                } else
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL // 500
            } else
                return validarDados // 400
        } else
            return MESSAGE.ERROR_CONTENT_TYPE // 415
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

// Atualiza uma produtora já existente
const atualizarProdutora = async function (produtora, id, contentType) {

    // Realizando copia do objeto de mensagem padrão, permitindo que as alterações feitas nesta função não interfiram em outra função
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            // Chama a função de validação de dados
            let validarDados = validarDadosProdutora(produtora)

            // Verifica se retornou false, se sim continua
            if (!validarDados) {

                // Chama a função para validar se o ID existe
                let validarID = await buscarProdutoraId(id)

                // Verifica se o ID existe, caso sim ele retorna 200
                if (validarID.status_code == 200) {

                    // Adicionando o ID no JSON de produtora
                    produtora.id = id

                    // Chama a função do DAO para atualizar a produtora
                    let result = await produtoraDAO.setUpdateProducer(produtora)

                    // Valida se result é verdadeiro e cria a mensagem
                    if (result) {
                        MESSAGE.HEADER.status = MESSAGE.SUCCESS_UPDATE_ITEM.status
                        MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_UPDATE_ITEM.status_code
                        MESSAGE.HEADER.message = MESSAGE.SUCCESS_UPDATE_ITEM.message
                        MESSAGE.HEADER.response = produtora

                        return MESSAGE.HEADER // 201
                    } else
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL // 500
                } else
                    return validarID // Retorno da função de validarID (400 ou 404 ou 500)
            } else
                return validarDados // 400
        } else
            return MESSAGE.ERROR_CONTENT_TYPE // 415
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

// Validação dos dados de cadastro ou atualização de uma produtora
const validarDadosProdutora = function (produtora) {

    // Realizando copia do objeto de mensagem padrão, permitindo que as alterações feitas nesta função não interfiram em outra função
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    // Validação de todos os campos
    if (produtora.nome == '' || produtora.nome == null || produtora.nome == undefined || produtora.nome.length > 200) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [NOME] inválido!!!'
        return MESSAGE.ERROR_REQUIRED_FIELDS // 400
    } else if (produtora.pais == undefined || produtora.pais.length > 200) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [PAÍS] inválido!!!'
        return MESSAGE.ERROR_REQUIRED_FIELDS // 400
    } else if (produtora.data_fundacao == undefined || produtora.data_fundacao.length != 10) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [DATA_FUNDACAO] inválido!!!'
        return MESSAGE.ERROR_REQUIRED_FIELDS // 400
    } else if (produtora.descricao == undefined) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [DESCRICAO] inválido!!!'
        return MESSAGE.ERROR_REQUIRED_FIELDS // 400
    } else if (produtora.site == undefined || produtora.site.length > 200) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [SITE] inválido!!!'
        return MESSAGE.ERROR_REQUIRED_FIELDS // 400
    } else
        return false
}

// Deleta uma produtora existente pelo ID
const deletarProdutora = async function (id) {

    // Realizando copia do objeto de mensagem padrão, permitindo que as alterações feitas nesta função não interfiram em outra função
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        // Chama a função para validar se o ID existe no BD
        let validarID = await buscarProdutoraId(parseInt(id))

        // Caso o ID seja verdadeiro, teremos o status 200 e assim seguiremos
        if (validarID.status_code == 200) {
            // Chama a função do DAO que deleta a produtora
            let result = await produtoraDAO.setDeleteProducer(parseInt(id))

            // Caso seja verdadeira ele cria a mensagem
            if (result) {
                MESSAGE.HEADER.status = MESSAGE.SUCCESS_DELETE_ITEM.status
                MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_DELETE_ITEM.status_code
                MESSAGE.HEADER.message = MESSAGE.SUCCESS_DELETE_ITEM.message

                return MESSAGE.HEADER // 200
            } else
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL // 500
        } else
            return validarID // Retorno da função de validarID (400 ou 404 ou 500)
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

module.exports = {
    listarProdutoras,
    buscarProdutoraId,
    inserirProdutora,
    atualizarProdutora,
    deletarProdutora
}