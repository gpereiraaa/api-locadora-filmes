/******************************************************************************************************
 * Objetivo: Arquivo responsavel pela manipulação de dados entre o APP e a Model (Validações, tratamento de dados, tratamento de erros, etc)
 * Data: 29/10/2025
 * Autor: Gustavo Pereira
 * Versão: 1.0 
 ********************************************************************************************************/

// Import do arquivo do DAO para manipular o CRUD
const personagemDAO = require('../../../model/DAO/personagem.js')

// Import do arquivo padrão de mensagens
const MESSAGE_DEFAULT = require('../../modulo/config_messages.js')

// Retorna todos os personagens do BD
const listarPersonagens = async function () {
    // Realizando copia do objeto de mensagem padrão, permitindo que as alterações feitas nesta função não interfiram em outra função
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        // Chama a função do DAO que retorna a lista de personagens
        let result = await personagemDAO.getSelectAllCharacters()

        // Valida se a requisição foi verdadeira
        if (result) {
            // Valida se contém algo dentro do array
            if (result.length > 0) {
                MESSAGE.HEADER.status = MESSAGE.SUCCESS_REQUEST.status
                MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code
                MESSAGE.HEADER.response.personagens = result

                return MESSAGE.HEADER // 200
            } else
                return MESSAGE.ERROR_NOT_FOUND // 404
        } else
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL // 500        
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

// Retorna um personagem pelo ID
const buscarPersonagemId = async function (id) {
    // Realizando copia do objeto de mensagem padrão, permitindo que as alterações feitas nesta função não interfiram em outra função
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        // Validação de ID obrigatório e que seja um numero
        if (id != '' && id != null && id != undefined && !isNaN(id) && id > 0) {
            // Chamando função do DAO que retorna o personagem filtrando pelo ID
            let result = await personagemDAO.getSelectByIdCharacter(parseInt(id))

            // Valida se a requisição foi verdadeira
            if (result) {
                // Valida se o retorno do ARRAY tem algum conteudo
                if (result.length > 0) {
                    MESSAGE.HEADER.status = MESSAGE.SUCCESS_REQUEST.status
                    MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code
                    MESSAGE.HEADER.response.personagem = result

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

module.exports = {
    listarPersonagens,
    buscarPersonagemId
}