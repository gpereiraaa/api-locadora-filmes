/*****************************************************************************************************************************************************
 * Objetivo: Arquivo responsavel pela manipulação de dados entre o APP e a Model para o CRUD de filme e ator e personagem
 * Data: 12/11/2025
 * Autor: Gustavo Pereira
 * Versão: 1.0
 ***************************************************************************************************************************************************/

// Import do arquivo DAO de Filme ator para manipular o CRUD no BD
const filmeAtorPersonagemDAO = require('../../model/DAO/filme_ator_personagem.js')

// Import do arquivo padrão das mensagens 
const MESSAGE_DEFAULT = require('../modulo/config_messages.js')

// Retorna todos os filmes e ator personagens
const listarFilmesAtorPersonagem = async function () {

    // Realizando copia do objeto de mensagem padrão, permitindo que as alterações feitas nesta função não interfiram em outra função
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        // Chama a função do DAO que retorna a lista de filmes atores personagens 
        let result = await filmeAtorPersonagemDAO.getSelectAllFilmsActorsCharacters()

        if (result) {
            if (result.length > 0) {
                MESSAGE.HEADER.status = MESSAGE.SUCCESS_REQUEST.status
                MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code
                MESSAGE.HEADER.response.filmes_ator_personagem = result

                return MESSAGE.HEADER // 200
            } else
                return MESSAGE.ERROR_NOT_FOUND // 404
        } else
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL // 500
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

// Retorna um filme e ator e personagem filtrando pelo ID
const buscarFilmeAtorPersonagemId = async function (id) {

    // Realizando copia do objeto de mensagem padrão, permitindo que as alterações feitas nesta função não interfiram em outra função
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        // Validação de ID obrigatório e que seja um numero
        if (id != '' && id != null && id != undefined && !isNaN(id) && id > 0) {
            // Chamando função do DAO que retorna o genero filtrando pelo ID
            let result = await filmeAtorPersonagemDAO.getSelectByIdFilmActorCharacter(parseInt(id))

            // Valida se a requisição foi verdadeira
            if (result) {
                // Valida se o retorno do ARRAY tem algum conteudo
                if (result.length > 0) {
                    MESSAGE.HEADER.status = MESSAGE.SUCCESS_REQUEST.status
                    MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code
                    MESSAGE.HEADER.response.filme_ator_personagem = result

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

// Retorna um filme e ator e personagem filtrando pelo ID de filme
const buscarFilmeAtorPersonagemIdFilme = async function (idFilme) {

    // Realizando copia do objeto de mensagem padrão, permitindo que as alterações feitas nesta função não interfiram em outra função
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        // Validação de ID obrigatório e que seja um numero
        if (idFilme != '' && idFilme != null && idFilme != undefined && !isNaN(idFilme) && idFilme > 0) {
            // Chamando função do DAO que retorna o filme ator filtrando pelo IDfilme
            let result = await filmeAtorPersonagemDAO.getSelectByIdFilmFilmActorCharacter(parseInt(idFilme))

            // Valida se a requisição foi verdadeira
            if (result) {
                // Valida se o retorno do ARRAY tem algum conteudo
                if (result.length > 0) {
                    MESSAGE.HEADER.status = MESSAGE.SUCCESS_REQUEST.status
                    MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code
                    MESSAGE.HEADER.response.filme_ator_personagem = result

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

// Retorna os atores filtrando pelo ID do filme
const listarAtoresIdFilme = async function (idFilme) {

    // Realizando copia do objeto de mensagem padrão, permitindo que as alterações feitas nesta função não interfiram em outra função
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        // Validação de ID obrigatório e que seja um numero
        if (idFilme != '' && idFilme != null && idFilme != undefined && !isNaN(idFilme) && idFilme > 0) {
            // Chamando função do DAO que retorna o genero filtrando pelo ID
            let result = await filmeAtorPersonagemDAO.getSelectActorsByIdFilm(parseInt(idFilme))

            // Valida se a requisição foi verdadeira
            if (result) {
                // Valida se o retorno do ARRAY tem algum conteudo
                if (result.length > 0) {
                    MESSAGE.HEADER.status = MESSAGE.SUCCESS_REQUEST.status
                    MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code
                    MESSAGE.HEADER.response.filme_ator = result

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

// Retorna os filmes filtrando pelo ID do ator
const listarFilmesIdAtor = async function (idAtor) {

    // Realizando copia do objeto de mensagem padrão, permitindo que as alterações feitas nesta função não interfiram em outra função
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        // Validação de ID obrigatório e que seja um numero
        if (idAtor != '' && idAtor != null && idAtor != undefined && !isNaN(idAtor) && idAtor > 0) {
            // Chamando função do DAO que retorna o genero filtrando pelo ID
            let result = await filmeAtorPersonagemDAO.getSelectFilmsByIdActor(parseInt(idAtor))

            // Valida se a requisição foi verdadeira
            if (result) {
                // Valida se o retorno do ARRAY tem algum conteudo
                if (result.length > 0) {
                    MESSAGE.HEADER.status = MESSAGE.SUCCESS_REQUEST.status
                    MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code
                    MESSAGE.HEADER.response.filme_ator = result

                    return MESSAGE.HEADER // 200
                } else
                    return MESSAGE.ERROR_NOT_FOUND // 404
            } else
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL // 500
        } else {
            MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [ID_ATOR] inválido!!!'
            return MESSAGE.ERROR_REQUIRED_FIELDS // 400
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

// Insere um novo filme ator no BD
const inserirFilmeAtorPersonagem = async function (filmeAtorPersonagem, contentType) {

    // Realizando copia do objeto de mensagem padrão, permitindo que as alterações feitas nesta função não interfiram em outra função
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            // Chama a função de validação dos dados de cadastro
            let validarDados = await validarDadosFilmeAtorPersonagem(filmeAtorPersonagem)

            if (!validarDados) {

                // Chama a função do DAO para inserir um novo FilmeAtor
                let result = await filmeAtorPersonagemDAO.setInsertFilmsActorsCharacters(filmeAtorPersonagem)

                // Valida se result é verdadeiro
                if (result) {

                    // Chama a função para receber o ID gerado no BD
                    let lastIdFilmeAtorPersonagem = await filmeAtorPersonagemDAO.getSelectLastIdFilmeActorCharacter()

                    if (lastIdFilmeAtorPersonagem) {
                        // Adiciona no JSON de FilmeAtorPersonagem o ID que foi gerado pelo BD 
                        filmeAtor.id = lastIdFilmeAtorPersonagem

                        MESSAGE.HEADER.status = MESSAGE.SUCCESS_CREATED_ITEM.status
                        MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_CREATED_ITEM.status_code
                        MESSAGE.HEADER.message = MESSAGE.SUCCESS_CREATED_ITEM.message
                        MESSAGE.HEADER.response = filmeAtorPersonagem

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

// Atualiza um FilmeAtor pelo ID
const atualizarFilmeAtor = async function (filmeAtor, id, contentType) {

    // Realizando copia do objeto de mensagem padrão, permitindo que as alterações feitas nesta função não interfiram em outra função
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {

        // Validação do content-type
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            // Chama a função de validação dos dados de filmeAtor
            let validarDados = await validarDadosFilmeAtor(filmeAtor)

            if (!validarDados) {

                // Chama a função para validar se o ID existe no BD
                let validarID = await buscarFilmeAtorId(id)

                // Verifica se o ID existe no BD, caso sim teremos o status 200
                if (validarID.status_code == 200) {

                    // Adicionando o ID no JSON de dados do filmeAtor
                    filmeAtor.id = parseInt(id)

                    // Chama a função do DAO que atualiza o filmeAtor
                    let result = await filmeAtorDAO.setUpdateFilmsActors(filmeAtor)

                    // Valida se o result foi verdadeiro e adiciona na mensagem
                    if (result) {
                        MESSAGE.HEADER.status = MESSAGE.SUCCESS_UPDATE_ITEM.status
                        MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_UPDATE_ITEM.status_code
                        MESSAGE.HEADER.message = MESSAGE.SUCCESS_UPDATE_ITEM.message
                        MESSAGE.HEADER.response = filmeAtor

                        return MESSAGE.HEADER // 200
                    } else
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL // 500
                } else
                    return validarID // Retorno da função de buscarFilmeID (400 ou 404 ou 500)
            } else
                return validarDados // Retorno da função de validar dados do filmeAtor (400)
        } else
            return MESSAGE.ERROR_CONTENT_TYPE // 415
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

// Validação dos dados de cadastro ou atualização do filmeAtorPersonagem
const validarDadosFilmeAtorPersonagem = async function (filmeAtorPersonagem) {

    // Realizando copia do objeto de mensagem padrão, permitindo que as alterações feitas nesta função não interfiram em outra função
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    if (filmeAtorPersonagem.id_filme == '' || filmeAtorPersonagem.id_filme == null || filmeAtorPersonagem.id_filme == undefined || isNaN(filmeAtorPersonagem.id_filme) || filmeAtorPersonagem.id_filme <= 0) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [ID_FILME] inválido!!!'
        return MESSAGE.ERROR_REQUIRED_FIELDS // 400
    } else if (filmeAtorPersonagem.id_ator == '' || filmeAtorPersonagem.id_ator == null || filmeAtorPersonagem.id_ator == undefined || isNaN(filmeAtorPersonagem.id_ator) || filmeAtorPersonagem.id_ator <= 0) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [ID_ATOR] inválido!!!'
        return MESSAGE.ERROR_REQUIRED_FIELDS // 400 
    } else if (filmeAtorPersonagem.id_personagem == '' || filmeAtorPersonagem.id_personagem == null || filmeAtorPersonagem.id_personagem == undefined || isNaN(filmeAtorPersonagem.id_personagem) || filmeAtorPersonagem.id_personagem <= 0) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [ID_ATOR_PERSONAGEM] inválido!!!'
        return MESSAGE.ERROR_REQUIRED_FIELDS // 400 
    } else
        return false
}

// Deleta um filmeAtor do BD
const excluirFilmeAtor = async function (id) {

    // Realizando copia do objeto de mensagem padrão, permitindo que as alterações feitas nesta função não interfiram em outra função
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {

        // Chama a função para validar se o id existe no BD
        let validarID = await buscarFilmeAtorId(parseInt(id))

        // Caso o ID seja verdadeiro, teremos o status 200 e assim seguiremos
        if (validarID.status_code == 200) {
            // Chama a função do DAO que deleta o filmeAtor
            let result = await filmeAtorDAO.setDeleteFilmsActors(parseInt(id))

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
            return validarID // Retorno da função de buscarFilmeAtorId (400 ou 404 ou 500)
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }

}

// Deleta um filmeGenero no BD pelo id do filme
const excluirFilmeAtorIdFilme = async function (idFilme) {

    // Realizando copia do objeto de mensagem padrão, permitindo que as alterações feitas nesta função não interfiram em outra função
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {

        // Chama função para validar se o id de filme existe no BD
        let validarIDFilme = await buscarFilmeAtorIdFilme(parseInt(idFilme))

        // Caso o ID seja verdadeiro, teremos status 200 e assim seguiremos
        if (validarIDFilme.status_code == 200) {
            // Chama a função do DAO que exclui um filme pelo ID de filme
            let result = await filmeAtorDAO.setDeleteFilmsActorsByIdFilm(parseInt(idFilme))

            // Caso seja verdadeiro ele cria a mensagem
            if (result) {
                MESSAGE.HEADER.status = MESSAGE.SUCCESS_DELETE_ITEM.status
                MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_DELETE_ITEM.status_code
                MESSAGE.HEADER.message = MESSAGE.SUCCESS_DELETE_ITEM.message

                delete MESSAGE.HEADER.response

                return MESSAGE.HEADER // 200
            } else
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL // 500
        } else
            return validarIDFilme // Retorno da função de buscarFilmeAtorIdFilme (400 ou 404 ou 500)
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

module.exports = {
    listarFilmesAtorPersonagem,
    buscarFilmeAtorPersonagemId,
    listarAtoresIdFilme,
    listarFilmesIdAtor,
    inserirFilmeAtorPersonagem,
    atualizarFilmeAtor,
    excluirFilmeAtor,
    buscarFilmeAtorPersonagemIdFilme,
    excluirFilmeAtorIdFilme
}