/*****************************************************************************************************************************************************
 * Objetivo: Arquivo responsavel pela manipulação de dados entre o APP e a Model para o CRUD de filme e genero
 * Data: 05/11/2025
 * Autor: Gustavo Pereira
 * Versão: 1.0
 ***************************************************************************************************************************************************/

// Import do arquivo DAO de Filme genero para manipular o CRUD no BD
const filmeGeneroDAO = require('../../model/DAO/filme_genero.js')

// Import do arquivo padrão das mensagens 
const MESSAGE_DEFAULT = require('../modulo/config_messages.js')

// Retorna todos os filmes e generos
const listarFilmesGeneros = async function () {

    // Realizando copia do objeto de mensagem padrão, permitindo que as alterações feitas nesta função não interfiram em outra função
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        // Chama a função do DAO que retorna a lista de filmes generos 
        let result = await filmeGeneroDAO.getSelectAllFilmsGenres()

        if (result) {
            if (result.length > 0) {
                MESSAGE.HEADER.status = MESSAGE.SUCCESS_REQUEST.status
                MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code
                MESSAGE.HEADER.response.filmes_generos = result

                return MESSAGE.HEADER // 200
            } else
                return MESSAGE.ERROR_NOT_FOUND // 404
        } else
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL // 500
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

// Retorna um filme e genero filtrando pelo ID
const buscarFilmeGeneroId = async function (id) {

    // Realizando copia do objeto de mensagem padrão, permitindo que as alterações feitas nesta função não interfiram em outra função
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        // Validação de ID obrigatório e que seja um numero
        if (id != '' && id != null && id != undefined && !isNaN(id) && id > 0) {
            // Chamando função do DAO que retorna o genero filtrando pelo ID
            let result = await filmeGeneroDAO.getSelectByIdFilmGenre(parseInt(id))

            // Valida se a requisição foi verdadeira
            if (result) {
                // Valida se o retorno do ARRAY tem algum conteudo
                if (result.length > 0) {
                    MESSAGE.HEADER.status = MESSAGE.SUCCESS_REQUEST.status
                    MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code
                    MESSAGE.HEADER.response.filme_genero = result

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

// Retorna os generos filtrando pelo ID do filme
const listarGenerosIdFilme = async function (idFilme) {

    // Realizando copia do objeto de mensagem padrão, permitindo que as alterações feitas nesta função não interfiram em outra função
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        // Validação de ID obrigatório e que seja um numero
        if (idFilme != '' && idFilme != null && idFilme != undefined && !isNaN(idFilme) && idFilme > 0) {
            // Chamando função do DAO que retorna o genero filtrando pelo ID
            let result = await filmeGeneroDAO.getSelectGenresByIdFilm(parseInt(idFilme))

            // Valida se a requisição foi verdadeira
            if (result) {
                // Valida se o retorno do ARRAY tem algum conteudo
                if (result.length > 0) {
                    MESSAGE.HEADER.status = MESSAGE.SUCCESS_REQUEST.status
                    MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code
                    MESSAGE.HEADER.response.filme_genero = result

                    return MESSAGE.HEADER // 200
                } else
                    return MESSAGE.ERROR_NOT_FOUND // 404
            } else
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL // 500
        } else {
            MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [ID_FILME] inválido!!!'
            return MESSAGE.ERROR_REQUIRED_FIELDS // 400
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

// Retorna os filmes filtrando pelo ID do genero
const listarFilmesIdGenero = async function (idGenero) {

    // Realizando copia do objeto de mensagem padrão, permitindo que as alterações feitas nesta função não interfiram em outra função
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        // Validação de ID obrigatório e que seja um numero
        if (idGenero != '' && idGenero != null && idGenero != undefined && !isNaN(idGenero) && idGenero > 0) {
            // Chamando função do DAO que retorna o genero filtrando pelo ID
            let result = await filmeGeneroDAO.getSelectFilmsByIdGenre(parseInt(idGenero))

            // Valida se a requisição foi verdadeira
            if (result) {
                // Valida se o retorno do ARRAY tem algum conteudo
                if (result.length > 0) {
                    MESSAGE.HEADER.status = MESSAGE.SUCCESS_REQUEST.status
                    MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code
                    MESSAGE.HEADER.response.filme_genero = result

                    return MESSAGE.HEADER // 200
                } else
                    return MESSAGE.ERROR_NOT_FOUND // 404
            } else
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL // 500
        } else {
            MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [ID_GENERO] inválido!!!'
            return MESSAGE.ERROR_REQUIRED_FIELDS // 400
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

// Insere um novo genero no BD
const inserirFilmeGenero = async function (filmeGenero, contentType) {

    // Realizando copia do objeto de mensagem padrão, permitindo que as alterações feitas nesta função não interfiram em outra função
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            // Chama a função de validação dos dados de cadastro
            let validarDados = await validarDadosFilmeGenero(filmeGenero)

            if (!validarDados) {

                // Chama a função do DAO para inserir um novo genero
                let result = await filmeGeneroDAO.setInsertFilmsGenres(filmeGenero)

                // Valida se result é verdadeiro
                if (result) {

                    // Chama a função para receber o ID gerado no BD
                    let lastIdFilmeGenero = await filmeGeneroDAO.getSelectLastIdFilmeGenre()

                    if (lastIdFilmeGenero) {
                        // Adiciona no JSON de genero o ID que foi gerado pelo BD 
                        filmeGenero.id = lastIdFilmeGenero

                        MESSAGE.HEADER.status = MESSAGE.SUCCESS_CREATED_ITEM.status
                        MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_CREATED_ITEM.status_code
                        MESSAGE.HEADER.message = MESSAGE.SUCCESS_CREATED_ITEM.message
                        MESSAGE.HEADER.response = filmeGenero

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

// Atualiza um filme genero pelo ID
const atualizarFilmeGenero = async function (filmeGenero, id, contentType) {

    // Realizando copia do objeto de mensagem padrão, permitindo que as alterações feitas nesta função não interfiram em outra função
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {

        // Validação do content-type
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            // Chama a função de validação dos dados de genero
            let validarDados = await validarDadosFilmeGenero(filmeGenero)

            if (!validarDados) {

                // Chama a função para validar se o ID existe no BD
                let validarID = await buscarFilmeGeneroId(id)

                // Verifica se o ID existe no BD, caso sim teremos o status 200
                if (validarID.status_code == 200) {

                    // Adicionando o ID no JSON de dados do genero
                    filmeGenero.id = parseInt(id)

                    // Chama a função do DAO que atualiza o genero
                    let result = await filmeGeneroDAO.setUpdateFilmsGenres(filmeGenero)

                    // Valida se o result foi verdadeiro e adiciona na mensagem
                    if (result) {
                        MESSAGE.HEADER.status = MESSAGE.SUCCESS_UPDATE_ITEM.status
                        MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_UPDATE_ITEM.status_code
                        MESSAGE.HEADER.message = MESSAGE.SUCCESS_UPDATE_ITEM.message
                        MESSAGE.HEADER.response = filmeGenero

                        return MESSAGE.HEADER // 200
                    } else
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL // 500
                } else
                    return validarID // Retorno da função de buscarFilmeID (400 ou 404 ou 500)
            } else
                return validarDados // Retorno da função de validar dados do genero (400)
        } else
            return MESSAGE.ERROR_CONTENT_TYPE // 415
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

// Validação dos dados de cadastro ou atualização do genero
const validarDadosFilmeGenero = async function (filmeGenero) {

    // Realizando copia do objeto de mensagem padrão, permitindo que as alterações feitas nesta função não interfiram em outra função
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    if (filmeGenero.id_filme == '' || filmeGenero.id_filme == null || filmeGenero.id_filme == undefined || isNaN(filmeGenero.id_filme) || filmeGenero.id_filme <= 0) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [ID_FILME] inválido!!!'
        return MESSAGE.ERROR_REQUIRED_FIELDS // 400
    } else if (filmeGenero.id_genero == '' || filmeGenero.id_genero == null || filmeGenero.id_genero == undefined || isNaN(filmeGenero.id_genero) || filmeGenero.id_genero <= 0) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [ID_GENERO] inválido!!!'
        return MESSAGE.ERROR_REQUIRED_FIELDS // 400 
    } else
        return false
}

// Deleta um filme genero do BD
const excluirFilmeGenero = async function (id) {

    // Realizando copia do objeto de mensagem padrão, permitindo que as alterações feitas nesta função não interfiram em outra função
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {

        // Chama a função para validar se o id existe no BD
        let validarID = await buscarFilmeGeneroId(parseInt(id))

        // Caso o ID seja verdadeiro, teremos o status 200 e assim seguiremos
        if (validarID.status_code == 200) {
            // Chama a função do DAO que deleta o genero
            let result = await filmeGeneroDAO.setDeleteFilmsGenres(parseInt(id))

            // Caso seja verdadeira ele cria a mensagem
            if (result) {
                MESSAGE.HEADER.status = MESSAGE.SUCCESS_DELETE_ITEM.status
                MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_DELETE_ITEM.status_code
                MESSAGE.HEADER.message = MESSAGE.SUCCESS_DELETE_ITEM.message

                delete MESSAGE.HEADER.response

                return MESSAGE.HEADER // 200
            } else
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL // 500
        } else
            return validarID // Retorno da função de buscarFilmeGeneroId (400 ou 404 ou 500)
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }

}


module.exports = {
    listarFilmesGeneros,
    buscarFilmeGeneroId,
    listarGenerosIdFilme,
    listarFilmesIdGenero,
    inserirFilmeGenero,
    atualizarFilmeGenero,
    excluirFilmeGenero
}