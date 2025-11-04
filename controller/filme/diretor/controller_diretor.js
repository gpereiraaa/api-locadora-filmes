/******************************************************************************************************
 * Objetivo: Arquivo responsavel pela manipulação de dados entre o APP e a Model (Validações, tratamento de dados, tratamento de erros, etc)
 * Data: 04/11/2025
 * Autor: Gustavo Pereira
 * Versão: 1.0 
 ********************************************************************************************************/

// Import do arquivo do DAO para manipular o CRUD
const diretorDAO = require('../../../model/DAO/diretor.js')

// Import do arquivo padrão de mensagens
const MESSAGE_DEFAULT = require('../../modulo/config_messages.js')

// Retorna todos os diretores do BD
const listarDiretores = async function () {

    // Realizando copia do objeto de mensagem padrão, permitindo que as alterações feitas nesta função não interfiram em outra função
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        // Chama a função do DAO que retorna a lista de diretores
        let result = await diretorDAO.getSelectAllDirectors()

        // Valida se foi verdadeiro a requisição
        if (result) {
            // Valida se contém algo dentro do array
            if (result.length > 0) {
                MESSAGE.HEADER.status = MESSAGE.SUCCESS_REQUEST.status
                MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code
                MESSAGE.HEADER.response.diretores = result

                return MESSAGE.HEADER // 200
            } else
                return MESSAGE.ERROR_NOT_FOUND // 404
        } else
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL // 500
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

// Retorna um diretor filtrando pelo ID
const buscarDiretorId = async function (id) {

    // Realizando copia do objeto de mensagem padrão, permitindo que as alterações feitas nesta função não interfiram em outra função
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        // Validação de ID obrigatório e que seja um numero
        if (id != '' && id != null && id != undefined && !isNaN(id) && id > 0) {
            // Chamando função do DAO que retorna o diretor filtrando pelo ID
            let result = await diretorDAO.getSelectByIdDirector(parseInt(id))

            // Valida se a requisição foi verdadeira
            if (result) {
                // Valida se o retorno do ARRAY tem algum conteudo
                if (result.length > 0) {
                    MESSAGE.HEADER.status = MESSAGE.SUCCESS_REQUEST.status
                    MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code
                    MESSAGE.HEADER.response.diretor = result

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

// Insere um novo diretor no Banco de dados
const inserirDiretor = async function (diretor, contentType) {

    // Realizando copia do objeto de mensagem padrão, permitindo que as alterações feitas nesta função não interfiram em outra função
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            // Chama a função para a validação dos dados de cadastro
            let validarDados = await validarDadosDiretor(diretor)

            // Verifica se retornou false, se sim continua
            if (!validarDados) {

                // Chama a função do DAO para inserir um novo diretor
                let result = await diretorDAO.setInsertDirector(diretor)

                // Valida se result é verdadeiro
                if (result == true) {
                    // Chama a função para receber o ID gerado no BD
                    let lastId = await diretorDAO.getSelectLastIdDirector()

                    // Verifica se é verdadeiro
                    if (lastId) {
                        // Adiciona no JSON o id
                        diretor.id = lastId

                        MESSAGE.HEADER.status = MESSAGE.SUCCESS_CREATED_ITEM.status
                        MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_CREATED_ITEM.status_code
                        MESSAGE.HEADER.message = MESSAGE.SUCCESS_CREATED_ITEM.message
                        MESSAGE.HEADER.response = diretor

                        return MESSAGE.HEADER // 201
                    } else
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL // 500
                } else if (result != true && result != false) {
                    return result
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

// Atualiza um diretor já existente
const atualizarDiretor = async function (diretor, id, contentType) {

    // Realizando copia do objeto de mensagem padrão, permitindo que as alterações feitas nesta função não interfiram em outra função
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        // Validação do content-type
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            // Chama a função de validação dos dados de diretor
            let validarDados = await validarDadosDiretor(diretor)

            if (!validarDados) {

                // Chama a função que valida se o ID existe no BD
                let validarID = await buscarDiretorId(id)

                // Verifica se o ID existe, caso sim teremos o status 200
                if (validarID.status_code == 200) {

                    // Adicionando o ID no JSON de dados do diretor
                    diretor.id = parseInt(id)

                    // Chama a função do DAO que atualiza o diretor
                    let result = await diretorDAO.setUpdateDirector(diretor)

                    // Valida se result foi verdadeiro e cria a mensagem
                    if (result == true) {
                        MESSAGE.HEADER.status = MESSAGE.SUCCESS_UPDATE_ITEM.status
                        MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_UPDATE_ITEM.status_code
                        MESSAGE.HEADER.message = MESSAGE.SUCCESS_UPDATE_ITEM.message
                        MESSAGE.HEADER.response = diretor

                        return MESSAGE.HEADER // 200
                    } else if (result != true && result != false) {
                        return result
                    } else
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL // 500
                } else
                    return validarID  // Retorno da função de validarID (400 ou 404 ou 500)
            } else
                return validarDados // Retorno da função de validar dados do diretor (400)
        } else
            return MESSAGE.ERROR_CONTENT_TYPE // 415
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

// Validação dos dados de cadastro ou atualização de diretor
const validarDadosDiretor = async function (diretor) {

    // Realizando copia do objeto de mensagem padrão, permitindo que as alterações feitas nesta função não interfiram em outra função
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    // Validação de todos os campos
    if (diretor.nome == '' || diretor.nome == null || diretor.nome == undefined || diretor.nome.length > 200) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [NOME] inválido!!!'
        return MESSAGE.ERROR_REQUIRED_FIELDS // 400
    } else if (diretor.nacionalidade == '' || diretor.nacionalidade == null || diretor.nacionalidade == undefined || diretor.nacionalidade.length > 100) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [NACIONALIDADE] inválido!!!'
        return MESSAGE.ERROR_REQUIRED_FIELDS // 400
    } else if (diretor.sexo == '' || diretor.sexo == null || diretor.sexo == undefined || diretor.sexo.length > 30) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [SEXO] inválido!!!'
        return MESSAGE.ERROR_REQUIRED_FIELDS // 400
    } else if (diretor.foto == undefined || diretor.foto.length > 200) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [FOTO] inválido!!!'
        return MESSAGE.ERROR_REQUIRED_FIELDS // 400
    } else if (diretor.biografia == undefined) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [BIOGRAFIA] inválido!!!'
        return MESSAGE.ERROR_REQUIRED_FIELDS // 400
    } else if (diretor.altura == undefined || diretor.altura.length > 5 || typeof (diretor.altura) != 'number') {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [ALTURA] inválido!!!'
        return MESSAGE.ERROR_REQUIRED_FIELDS // 400 
    } else
        return false
}

// Deleta um diretor existente no BD
const deletarDiretor = async function (id) {

    // Realizando copia do objeto de mensagem padrão, permitindo que as alterações feitas nesta função não interfiram em outra função
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        // Chama a função para validar se o id existe no BD
        let validarID = await buscarDiretorId(parseInt(id))

        // Caso o ID seja verdadeiro, teremos o status 200 e assim seguiremos
        if (validarID.status_code == 200) {
            // Chama a função do DAO que deleta o diretor
            let result = await diretorDAO.setDeleteDirector(parseInt(id))

            // Caso seja verdadeira ele cria a mensagem
            if (result) {
                MESSAGE.HEADER.status = MESSAGE.SUCCESS_DELETE_ITEM.status
                MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_DELETE_ITEM.status_code
                MESSAGE.HEADER.message = MESSAGE.SUCCESS_DELETE_ITEM.message

                return MESSAGE.HEADER // 200
            } else
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL // 500
        } else
            return validarID // Retorno da função de buscarDiretorId (400 ou 404 ou 500)
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }

}

module.exports = {
    listarDiretores,
    buscarDiretorId,
    inserirDiretor,
    atualizarDiretor,
    deletarDiretor
}