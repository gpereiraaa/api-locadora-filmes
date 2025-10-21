/*****************************************************************************************************************************************************
 * Objetivo: Arquivo responsavel pela manipulação de dados entre o APP e a Model (Validações, tratamento de dados, tratamento de erros, etc)
 * Data: 21/10/2025
 * Autor: Gustavo Pereira
 * Versão: 1.0
 ***************************************************************************************************************************************************/

// Import do arquivo DAO de genero para manipular o CRUD no BD
const generoDAO = require('../../model/DAO/genero.js')

// Import do arquivo padrão das mensagens 
const MESSAGE_DEFAULT = require('../modulo/config_messages.js')

// Retorna todos os generos
const listarGeneros = async function () {

    // Realizando copia do objeto de mensagem padrão, permitindo que as alterações feitas nesta função não interfiram em outra função
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        // Chama a função do DAO que retorna a lista de generos 
        let result = await generoDAO.getSelectAllGenres()

        if (result) {
            if (result.length > 0) {
                MESSAGE.HEADER.status = MESSAGE.SUCCESS_REQUEST.status
                MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code
                MESSAGE.HEADER.response.generos = result

                return MESSAGE.HEADER // 200
            } else
                return MESSAGE.ERROR_NOT_FOUND // 404
        } else
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL // 500
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

// Retorna um genero filtrando pelo ID
const buscarGeneroId = async function (id) {

    // Realizando copia do objeto de mensagem padrão, permitindo que as alterações feitas nesta função não interfiram em outra função
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        // Validação de ID obrigatório e que seja um numero
        if (id != '' && id != null && id != undefined && !isNaN(id) && id > 0) {
            // Chamando função do DAO que retorna o genero filtrando pelo ID
            let result = await generoDAO.getSelectByIdGenre(parseInt(id))

            // Valida se a requisição foi verdadeira
            if (result) {
                // Valida se o retorno do ARRAY tem algum conteudo
                if (result.length > 0) {
                    MESSAGE.HEADER.status = MESSAGE.SUCCESS_REQUEST.status
                    MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code
                    MESSAGE.HEADER.response.genero = result

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

// Insere um novo genero no BD
const inserirGenero = async function (genero, contentType) {

    // Realizando copia do objeto de mensagem padrão, permitindo que as alterações feitas nesta função não interfiram em outra função
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            // Chama a função de validação dos dados de cadastro
            let validarDados = await validarDadosGenero(genero)

            if (!validarDados) {

                // Chama a função do DAO para inserir um novo genero
                let result = await generoDAO.setInsertGenre(genero)

                // Valida se result é verdadeiro
                if (result) {

                    // Chama a função para receber o ID gerado no BD
                    let lastIdGenero = await generoDAO.getSelectLastIdGenre()

                    if (lastIdGenero) {
                        // Adiciona no JSON de genero o ID que foi gerado pelo BD 
                        genero.id = lastIdGenero

                        MESSAGE.HEADER.status = MESSAGE.SUCCESS_CREATED_ITEM.status
                        MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_CREATED_ITEM.status_code
                        MESSAGE.HEADER.message = MESSAGE.SUCCESS_CREATED_ITEM.message
                        MESSAGE.HEADER.response = genero

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

// Atualiza um genero pelo ID
const atualizarGenero = async function (genero, id, contentType) {

    // Realizando copia do objeto de mensagem padrão, permitindo que as alterações feitas nesta função não interfiram em outra função
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        
        // Validação do content-type
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            // Chama a função de validação dos dados de genero
            let validarDados = await validarDadosGenero(genero)

            if (!validarDados) {

                // Chama a função para validar se o ID existe no BD
                let validarID = await buscarGeneroId(id)

                // Verifica se o ID existe no BD, caso sim teremos o status 200
                if (validarID.status_code == 200) {
                    
                }
            }
        } else
            return MESSAGE.ERROR_CONTENT_TYPE // 415
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

// Validação dos dados de cadastro ou atualização do genero
const validarDadosGenero = async function (genero) {

    // Realizando copia do objeto de mensagem padrão, permitindo que as alterações feitas nesta função não interfiram em outra função
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    if (genero.nome == '' || genero.nome == null || genero.nome == undefined || genero.nome.length > 200) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [NOME] inválido!!!'
        return MESSAGE.ERROR_REQUIRED_FIELDS // 400
    } else if (genero.descricao == undefined) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [DESCRIÇÃO] inválido!!!'
        return MESSAGE.ERROR_REQUIRED_FIELDS // 400
    } else
        return false
}



module.exports = {
    listarGeneros,
    buscarGeneroId,
    inserirGenero
}