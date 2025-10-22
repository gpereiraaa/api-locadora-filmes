/*******************************************************************
 * Objetivo: Arquivo responsavel pela manipulação de dados entre o APP e a Model (Validações, tratamento de dados, tratamento de erros, etc)
 * Data: 22/10/2025
 * Autor: Gustavo Pereira
 * Versão: 1.0
 */

// Import do arquivo DAO para manipular o CRUD
const produtoraDAO = require('../../model/DAO/produtora.js')

// Import do arquivo padrão das mensagens 
const MESSAGE_DEFAULT = require('../modulo/config_messages.js')

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




module.exports = {
    listarProdutoras
}