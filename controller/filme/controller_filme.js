/*************************************************************************************************************************************************
 * Objetivo: Arquivo responsavel pela manipulação de dados entre o APP e a Model (Validações, tratamento de dados, tratamento de erros, etc)
 * Data: 07/10/2025
 * Autor: Gustavo Pereira 
 * Versão: 1.0
 ************************************************************************************************************************************************/

// Import do arquivo DAO para manipular o CRUD no BD
const filmeDAO = require('../../model/DAO/filme.js')

// Import da controller filmeGenero (tabela de relação)
const controllerFilmeGenero = require('./controller_filme_genero.js')

// Import da controller filmeAtor (tabela de relação)
const controllerFilmeAtor = require('./controller_filme_ator.js')

// Import do arquivo que padroniza todas as mensagens
const MESSAGE_DEFAULT = require('../modulo/config_messages.js')

// Retorna uma lista de filmes
const listarFilmes = async function () {

    // Realizando uma copia do objeto MESSAGE_DEFAULT, permitindo que as alterações desta função não interfiram em outras funções 
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        // Chama a função do DAO para retornar a lista de filmes
        let result = await filmeDAO.getSelectAllFilms()

        if (result) {
            if (result.length > 0) {

                // Processamento para adicionar os generos e atores em cada filme

                for (filme of result) {

                    let resultGenerosFilme = await controllerFilmeGenero.listarGenerosIdFilme(filme.id)
                    let resultAtoresFilme = await controllerFilmeAtor.listarAtoresIdFilme(filme.id)

                    if (resultGenerosFilme.status_code == 200)
                        filme.genero = resultGenerosFilme.response.filme_genero
                    else
                        filme.genero = []

                    if (resultAtoresFilme.status_code == 200)
                        filme.ator = resultAtoresFilme.response.filme_ator
                    else
                        filme.ator = []
                }

                MESSAGE.HEADER.status = MESSAGE.SUCCESS_REQUEST.status
                MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code
                MESSAGE.HEADER.response.films = result

                return MESSAGE.HEADER //200
            } else
                return MESSAGE.ERROR_NOT_FOUND // 404
        } else
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL // 500
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

// Retorna um filme filtrando pelo ID
const buscarFilmeId = async function (id) {

    // Realizando uma copia do objeto MESSAGE_DEFAULT, permitindo que as alterações desta função não interfiram em outras funções 
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        // Validação de campo obrigatório
        if (id != '' && id != null && id != undefined && !isNaN(id) && id > 0) {
            // Chama a função para filtrar pelo ID
            let result = await filmeDAO.getSelectByIdFilms(parseInt(id))

            if (result) {
                if (result.length > 0) {
                    // Processamento para adicionar os generos e atores no filme
                    for (filme of result) {

                        let resultGenerosFilme = await controllerFilmeGenero.listarGenerosIdFilme(id)
                        let resultAtoresFilme = await controllerFilmeAtor.listarAtoresIdFilme(id)
                        if (resultGenerosFilme.status_code == 200)
                            filme.genero = resultGenerosFilme.response.filme_genero
                        else
                            filme.genero = []

                        if (resultAtoresFilme.status_code == 200)
                            filme.ator = resultAtoresFilme.response.filme_ator
                        else
                            filme.ator = []
                    }

                    MESSAGE.HEADER.status = MESSAGE.SUCCESS_REQUEST.status
                    MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code
                    MESSAGE.HEADER.response.film = result

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

// Insere um novo filme
const inserirFilme = async function (filme, contentType) {

    // Realizando uma copia do objeto MESSAGE_DEFAULT, permitindo que as alterações desta função não interfiram em outras funções 
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            // Chama a função de validação dos dados de cadastro
            let validarDados = await validarDadosFilme(filme)

            if (!validarDados) {

                // Chama a função do DAO para inserir um novo filme
                let result = await filmeDAO.setInsertFilms(filme)

                if (result) {

                    // Chama a função para receber o ID gerado no BD
                    let lastIdFilme = await filmeDAO.getSelectLastIdFilm()

                    if (lastIdFilme) {

                        // Processamento para inserir dados na tabela de relação entre filme e genero

                        // Repetição para pegar cada genero e enviar para o DAO do filmeGenero 
                        // filme.genero.forEach(async function (genero) {
                        for (genero of filme.genero) {
                            let filmeGenero = {
                                id_filme: lastIdFilme,
                                id_genero: genero.id
                            }

                            let resultFilmeGenero = await controllerFilmeGenero.inserirFilmeGenero(filmeGenero, contentType)

                            if (resultFilmeGenero.status_code != 201)
                                return MESSAGE.ERROR_RELATION_TABLE // 200, porém com problemas na tabela de relação
                        }
                        for (ator of filme.ator) {
                            let filmeAtor = {
                                id_filme: lastIdFilme,
                                id_ator: ator.id
                            }

                            let resultFilmeAtor = await controllerFilmeAtor.inserirFilmeAtor(filmeAtor, contentType)

                            if (resultFilmeAtor.status_code != 201)
                                return MESSAGE.ERROR_RELATION_TABLE // 200, porém com problemas na tabela de relação
                        }

                        // Adiciona no JSON de filme o ID que foi gerado pelo BD
                        filme.id = lastIdFilme

                        MESSAGE.HEADER.status = MESSAGE.SUCCESS_CREATED_ITEM.status
                        MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_CREATED_ITEM.status_code
                        MESSAGE.HEADER.message = MESSAGE.SUCCESS_CREATED_ITEM.message

                        // Processamento para trazer dados dos generos cadastrados na tabela de relação

                        // Apaga o atributo genero que chegou no POST apenas com IDs
                        delete filme.genero

                        //Pesquisa no BD quais os generos e os seus dados que foram inseridos na tabela de relação
                        let resultGenerosFilme = await controllerFilmeGenero.listarGenerosIdFilme(lastIdFilme)

                        // Adiciona novamente o atributo genero com todas as informações do genero (ID, nome)
                        filme.genero = resultGenerosFilme.response.filme_genero

                        // Processamento para trazer dados dos atores cadastrados na tabela de relação

                        // Apaga o atributo ator que chegou no POST apenas com IDs
                        delete filme.ator

                        //Pesquisa no BD quais os generos e os seus dados que foram inseridos na tabela de relação
                        let resultAtorFilme = await controllerFilmeAtor.listarAtoresIdFilme(lastIdFilme)

                        // Adiciona novamente o atributo ator com as informações do ator (ID, nome)
                        filme.ator = resultAtorFilme.response.filme_ator

                        MESSAGE.HEADER.response = filme

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

// Atualiza um filme filtrando pelo ID
const atualizarFilme = async function (filme, id, contentType) {

    // Realizando uma copia do objeto MESSAGE_DEFAULT, permitindo que as alterações desta função não interfiram em outras funções 
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {

        // Validação do content-type
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            // Chama a função de validação dos dados de cadastro
            let validarDados = await validarDadosFilme(filme)

            if (!validarDados) {

                // Chama a função para validar a consistencia do ID e verificar se existe no BD
                let validarID = await buscarFilmeId(id)

                // Verifica se o ID existe no BD, caso exista teremos o status 200
                if (validarID.status_code == 200) {

                    // Adicionando o ID no JSON com os dados do filme
                    filme.id = parseInt(id)

                    // Chama a função do DAO para atualizar um filme
                    let result = await filmeDAO.setUpdateFilms(filme)

                    if (result) {

                        // Chama função para excluir os generos ja existentes
                        let resultDeleteFilmesGeneros = await controllerFilmeGenero.excluirFilmeGeneroIdFilme(id)
                        if (resultDeleteFilmesGeneros.status_code == 200 || resultDeleteFilmesGeneros.status_code == 404) {

                            // Processamento para inseir dados na tabela de relação
                            // Repetição para pegar cada genero e envia para o DAO filmeGenero
                            for (genero of filme.genero) {
                                let filmeGenero = {
                                    id_filme: id,
                                    id_genero: genero.id
                                }

                                let resultFilmeGenero = await controllerFilmeGenero.inserirFilmeGenero(filmeGenero, contentType)

                                if (resultFilmeGenero.status_code != 201)
                                    return MESSAGE.ERROR_RELATION_TABLE // 200, porém com problemas na tabela de relação    
                            }

                            MESSAGE.HEADER.status = MESSAGE.SUCCESS_UPDATE_ITEM.status
                            MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_UPDATE_ITEM.status_code
                            MESSAGE.HEADER.message = MESSAGE.SUCCESS_UPDATE_ITEM.message

                            // Processamento para trazer os dados cadastrados na tabela de relação

                            // Apaga o atributo genero que chegou via PUT apenas com os IDs
                            delete filme.genero

                            // Pesquisa no BD quais os generos foram cadastrados para o filme
                            let resultGenerosFilme = await controllerFilmeGenero.listarGenerosIdFilme(id)

                            // Adiciona novamente o atributo de genero com as informações necessarias
                            filme.genero = resultGenerosFilme.response.filme_genero

                            // Chama a função para excluir os atores existentes
                            let resultDeleteFilmesAtores = await controllerFilmeAtor.excluirFilmeAtorIdFilme(id)
                            if (resultDeleteFilmesAtores.status_code == 200 || resultDeleteFilmesAtores.status_code == 404) {

                                // Processamento para inseir dados na tabela de relação
                                // Repetição para pegar cada ator e envia para o DAO filmeAtor
                                for (ator of filme.ator) {
                                    let filmeAtor = {
                                        id_filme: id,
                                        id_ator: ator.id
                                    }

                                    let resultFilmeAtor = await controllerFilmeAtor.inserirFilmeAtor(filmeAtor, contentType)

                                    if (resultFilmeAtor.status_code != 201)
                                        return MESSAGE.ERROR_RELATION_TABLE // 200, porém com problemas na tabela de relação    
                                }

                                // Processamento para trazer os dados cadastrados na tabela de relação

                                // Apaga o atributo ator que chegou via PUT apenas com os IDs
                                delete filme.ator

                                // Pesquisa no BD quais os atores foram cadastrados para o filme
                                let resultAtoresFilme = await controllerFilmeAtor.listarAtoresIdFilme(id)

                                // Adiciona novamente o atributo de ator com as informações necessarias
                                filme.ator = resultAtoresFilme.response.filme_ator

                                MESSAGE.HEADER.response = filme

                                return MESSAGE.HEADER // 200
                            } else
                                return resultDeleteFilmesAtores // 400, 500
                        } else
                            return resultDeleteFilmesGeneros // 400, 500
                    } else
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL // 500
                } else
                    return validarID // Retorno da função de buscarFilmeID (400 ou 404 ou 500)

            } else
                return validarDados // Retorno da função de validar dados do filme (400)

        } else
            return MESSAGE.ERROR_CONTENT_TYPE // 415

    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

// Apaga um filme filtrando pelo ID
const excluirFilme = async function (id) {

    // Realizando uma copia do objeto MESSAGE_DEFAULT, permitindo que as alterações desta função não interfiram em outras funções 
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        // Converte o ID para um numero inteiro
        let idFilme = parseInt(id)

        // Chama a função para validar a consistencia do ID e verificar se existe no BD
        let validarID = await buscarFilmeId(idFilme)

        // Verifica se o ID existe no BD, caso exista teremos o status 200
        if (validarID.status_code == 200) {

            // Chama a função que deleta na tabela de filmeGenero pelo ID de filme
            let resultDeleteFilmesGeneros = await controllerFilmeGenero.excluirFilmeGeneroIdFilme(idFilme)
            if (resultDeleteFilmesGeneros.status_code == 200 || resultDeleteFilmesGeneros.status_code == 404) {
                let resultDeleteFilmeAtor = await controllerFilmeAtor.excluirFilmeAtorIdFilme(idFilme)
                if (resultDeleteFilmeAtor.status_code == 200 || resultDeleteFilmeAtor.status_code == 404) {
                    // Chama a função do DAO para deletar um filme
                    let result = await filmeDAO.setDeleteFilms(idFilme)

                    if (result) {
                        MESSAGE.HEADER.status = MESSAGE.SUCCESS_DELETE_ITEM.status
                        MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_DELETE_ITEM.status_code
                        MESSAGE.HEADER.message = MESSAGE.SUCCESS_DELETE_ITEM.message

                        return MESSAGE.HEADER // 200 
                    } else
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL // 500
                } else
                    return resultDeleteFilmeAtor // 500, 400
            } else
                return resultDeleteFilmesGeneros // 500, 400
        } else
            return validarID // Retorno da função de buscarFilmeID (400 ou 404 ou 500)
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

// Validação dos dados de cadastro do filme
const validarDadosFilme = async function (filme) {

    // Realizando uma copia do objeto MESSAGE_DEFAULT, permitindo que as alterações desta função não interfiram em outras funções 
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    if (filme.nome == '' || filme.nome == null || filme.nome == undefined || filme.nome.length > 100) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [NOME] inválido!!!'
        return MESSAGE.ERROR_REQUIRED_FIELDS // 400
    } else if (filme.sinopse == undefined) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [SINOPSE] inválido!!!'
        return MESSAGE.ERROR_REQUIRED_FIELDS // 400
    } else if (filme.data_lancamento == undefined || filme.data_lancamento.length != 10) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [DATA DE LANÇAMENTO] inválido!!!'
        return MESSAGE.ERROR_REQUIRED_FIELDS // 400
    } else if (filme.duracao == '' || filme.duracao == null || filme.duracao == undefined || filme.duracao.length > 8) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [DURAÇÃO] inválido!!!'
        return MESSAGE.ERROR_REQUIRED_FIELDS // 400
    } else if (filme.orcamento == '' || filme.orcamento == null || filme.orcamento == undefined || filme.orcamento.length > 12 || typeof (filme.orcamento) != 'number') {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [ORÇAMENTO] inválido!!!'
        return MESSAGE.ERROR_REQUIRED_FIELDS // 400
    } else if (filme.trailer == undefined || filme.trailer.length > 200) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [TRAILER] inválido!!!'
        return MESSAGE.ERROR_REQUIRED_FIELDS // 400
    } else if (filme.capa == '' || filme.capa == null || filme.capa == undefined || filme.capa.length > 200) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [CAPA] inválido!!!'
        return MESSAGE.ERROR_REQUIRED_FIELDS // 400
    } else
        return false

}


module.exports = {
    listarFilmes,
    buscarFilmeId,
    inserirFilme,
    atualizarFilme,
    excluirFilme
}