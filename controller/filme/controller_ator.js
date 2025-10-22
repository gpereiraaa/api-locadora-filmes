/******************************************************************************************************
 * Objetivo: Arquivo responsavel pela manipulação de dados entre o APP e a Model (Validações, tratamento de dados, tratamento de erros, etc)
 * Data: 22/10/2025
 * Autor: Gustavo Pereira
 * Versão: 1.0 
 ********************************************************************************************************/

// Import do arquivo do DAO para manipular o CRUD
const atorDAO = require('../../model/DAO/ator.js')

// Import do arquivo padrão de mensagens
const MESSAGE_DEFAULT = require('../modulo/config_messages.js')

// Retorna todos os atores do BD
const listarAtores = async function () {

    // Realizando copia do objeto de mensagem padrão, permitindo que as alterações feitas nesta função não interfiram em outra função
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        // Chama a função do DAO que retorna a lista de atores
        let result = await atorDAO.getSelectAllActors()

        // Valida se foi verdadeiro a requisição
        if (result) {
            // Valida se contém algo dentro do array
            if (result.length > 0) {
                MESSAGE.HEADER.status = MESSAGE.SUCCESS_REQUEST.status
                MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code
                MESSAGE.HEADER.response.atores = result

                return MESSAGE.HEADER // 200
            } else
                return MESSAGE.ERROR_NOT_FOUND // 404
        } else
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL // 500
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

// Retorna um ator filtrando pelo ID
const buscarAtorId = async function (id) {

    // Realizando copia do objeto de mensagem padrão, permitindo que as alterações feitas nesta função não interfiram em outra função
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        // Validação de ID obrigatório e que seja um numero
        if (id != '' && id != null && id != undefined && !isNaN(id) && id > 0) {
            // Chamando função do DAO que retorna o ator filtrando pelo ID
            let result = await atorDAO.getSelectByIdActor(parseInt(id))

            // Valida se a requisição foi verdadeira
            if (result) {
                // Valida se o retorno do ARRAY tem algum conteudo
                if (result.length > 0) {
                    MESSAGE.HEADER.status = MESSAGE.SUCCESS_REQUEST.status
                    MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code
                    MESSAGE.HEADER.response.ator = result

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

// Insere um novo ator no Banco de dados
const inserirAtor = async function (ator, contentType) {

    // Realizando copia do objeto de mensagem padrão, permitindo que as alterações feitas nesta função não interfiram em outra função
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            // Chama a função para a validação dos dados de cadastro
            let validarDados = await validarDadosAtor(ator)

            // Verifica se retornou false, se sim continua
            if (!validarDados) {

                // Chama a função do DAO para inserir um novo ator
                let result = await atorDAO.setInsertActor(ator)

                // Valida se result é verdadeiro
                if (result) {
                    // Chama a função para receber o ID gerado no BD
                    let lastIdAtor = await atorDAO.getSelectLastIdActor()

                    // Verifica se é verdadeiro
                    if (lastIdAtor) {
                        // Adiciona no JSON o id
                        ator.id = lastIdAtor

                        MESSAGE.HEADER.status = MESSAGE.SUCCESS_CREATED_ITEM.status
                        MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_CREATED_ITEM.status_code
                        MESSAGE.HEADER.message = MESSAGE.SUCCESS_CREATED_ITEM.message
                        MESSAGE.HEADER.response = ator

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

// Atualiza um ator já existente
const atualizarAtor = async function (ator, id, contentType) {

    // Realizando copia do objeto de mensagem padrão, permitindo que as alterações feitas nesta função não interfiram em outra função
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        // Validação do content-type
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            // Chama a função de validação dos dados de genero
            let validarDados = await validarDadosAtor(ator)

            if (!validarDados) {

                // Chama a função que valida se o ID existe no BD
                let validarID = await buscarAtorId(id)

                // Verifica se o ID existe, caso sim teremos o status 200
                if (validarID.status_code == 200) {

                    // Adicionando o ID no JSON de dados do ator
                    ator.id = parseInt(id)

                    // Chama a função do DAO que atualiza o ator
                    let result = await atorDAO.setUpdateActor(ator)

                    // Valida se result foi verdadeiro e cria a mensagem
                    if (result) {
                        MESSAGE.HEADER.status = MESSAGE.SUCCESS_UPDATE_ITEM.status
                        MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_UPDATE_ITEM.status_code
                        MESSAGE.HEADER.message = MESSAGE.SUCCESS_UPDATE_ITEM.message
                        MESSAGE.HEADER.response = ator

                        return MESSAGE.HEADER // 200
                    } else
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL // 500
                } else
                    return validarID  // Retorno da função de validar dados do genero (400)
            } else
                return validarDados // Retorno da função de validar dados do genero (400)
        } else
            return MESSAGE.ERROR_CONTENT_TYPE // 415
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

// Validação dos dados de cadastro ou atualização de ator
const validarDadosAtor = async function (ator) {

    // Realizando copia do objeto de mensagem padrão, permitindo que as alterações feitas nesta função não interfiram em outra função
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    // Validação de todos os campos
    if (ator.nome == '' || ator.nome == null || ator.nome == undefined || ator.nome.length > 200) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [NOME] inválido!!!'
        return MESSAGE.ERROR_REQUIRED_FIELDS // 400
    } else if (ator.nacionalidade == '' || ator.nacionalidade == null || ator.nacionalidade == undefined || ator.nacionalidade.length > 100) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [NACIONALIDADE] inválido!!!'
        return MESSAGE.ERROR_REQUIRED_FIELDS // 400
    } else if (ator.sexo == '' || ator.sexo == null || ator.sexo == undefined || ator.sexo.length > 30) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [SEXO] inválido!!!'
        return MESSAGE.ERROR_REQUIRED_FIELDS // 400
    } else if (ator.foto == undefined || ator.foto.length > 200) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [FOTO] inválido!!!'
        return MESSAGE.ERROR_REQUIRED_FIELDS // 400
    } else if (ator.biografia == undefined) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [BIOGRAFIA] inválido!!!'
        return MESSAGE.ERROR_REQUIRED_FIELDS // 400
    } else if (ator.altura == undefined || ator.altura.length > 5 || typeof (ator.altura) != 'number') {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [ALTURA] inválido!!!'
        return MESSAGE.ERROR_REQUIRED_FIELDS // 400 
    } else if (ator.data_nascimento == undefined || ator.data_nascimento.length != 10) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [DATA_NASCIMENTO] inválido!!!'
        return MESSAGE.ERROR_REQUIRED_FIELDS // 400
    } else
        return false
}

// Deleta um ator existente no BD
const deletarAtor = async function (id) {

    // Realizando copia do objeto de mensagem padrão, permitindo que as alterações feitas nesta função não interfiram em outra função
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        // Chama a função para validar se o id existe no BD
        let validarID = await buscarAtorId(parseInt(id))

        // Caso o ID seja verdadeiro, teremos o status 200 e assim seguiremos
        if (validarID.status_code == 200) {
            // Chama a função do DAO que deleta o ator
            let result = await atorDAO.setDeleteActor(parseInt(id))

            // Caso seja verdadeira ele cria a mensagem
            if (result) {
                MESSAGE.HEADER.status = MESSAGE.SUCCESS_DELETE_ITEM.status
                MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_DELETE_ITEM.status_code
                MESSAGE.HEADER.message = MESSAGE.SUCCESS_DELETE_ITEM.message

                return MESSAGE.HEADER // 200
            } else
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL // 500
        } else
            return validarID // Retorno da função de buscarGeneroId (400 ou 404 ou 500)
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }

}

module.exports = {
    listarAtores,
    buscarAtorId,
    inserirAtor,
    atualizarAtor,
    deletarAtor
}