/**********************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados no MYSQL referente ao relacionamento entre filme ator personagem
 * Data: 12/11/2025
 * Autor: Gustavo Pereira
 * Versão: 1.0
 */


// Import da biblioteca do PrismaClient 
const { PrismaClient } = require('../../generated/prisma')

// Cria um objeto do prisma client para manipular os scripts SQL
const prisma = new PrismaClient()

// Retorna todos os filmes e atores e personagens do banco de dados
const getSelectAllFilmsActorsCharacters = async function () {
    try {
        // Script SQL
        let sql = `select * from tbl_filme_ator_personagem order by id desc`

        // Executa o script SQL no Banco de dados
        let result = await prisma.$queryRawUnsafe(sql)

        // Validação para identificar se o retorno do Banco de dados é um ARRAY
        if (Array.isArray(result))
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

// Retorna um filmeAtorPersonagem filtrando pelo ID no BD
const getSelectByIdFilmActorCharacter = async function (id) {
    try {
        // Script SQL
        let sql = `select * from tbl_filme_ator_personagem where id = ${id}`

        // Executa o script SQL no banco de dados
        let result = await prisma.$queryRawUnsafe(sql)

        // Validação para identificar se o retorno do BD é um ARRAY
        if (Array.isArray(result))
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

// Retorna os filmes atores filtrando pelo ID de filme
const getSelectByIdFilmFilmActorCharacter = async function (idFilme) {
    try {
        // Script SQL
        let sql = `SELECT * FROM tbl_filme_ator_personagem WHERE id_filme = ${idFilme}`

        // Executa o script SQL no BD
        let result = await prisma.$queryRawUnsafe(sql)

        // Validação para identificar se o retorno do BD é um ARRAY
        if (Array.isArray(result))
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

// Retorna os atores filtrando pelo ID do filme do BD
const getSelectActorsByIdFilm = async function (idFilme) {
    try {
        // Script SQL
        let sql = `select tbl_ator.id_ator, tbl_ator.nome
        from tbl_filme inner join tbl_filme_ator_personagem
            on tbl_filme.id = tbl_filme_ator_personagem.id_filme
        inner join tbl_ator
            on tbl_ator.id_ator = tbl_filme_ator_personagem.id_ator
        where tbl_filme.id = ${idFilme}`

        // Executa o script SQL no banco de dados
        let result = await prisma.$queryRawUnsafe(sql)

        // Validação para identificar se o retorno do BD é um ARRAY
        if (Array.isArray(result))
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

// Retorna os filmes filtrando pelo ID do ator do BD
const getSelectFilmsByIdActor = async function (idAtor) {
    try {
        // Script SQL
        let sql = `select tbl_filme.id, tbl_filme.nome
        from tbl_filme inner join tbl_filme_ator_personagem
            on tbl_filme.id = tbl_filme_ator_personagem.id_filme
        inner join tbl_ator
            on tbl_ator.id_ator = tbl_filme_ator_personagem.id_ator
        where tbl_ator.id_ator = ${idAtor}`

        // Executa o script SQL no banco de dados
        let result = await prisma.$queryRawUnsafe(sql)

        // Validação para identificar se o retorno do BD é um ARRAY
        if (Array.isArray(result))
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

// Retorna o ID do ultimo FilmeAtor
const getSelectLastIdFilmeActorCharacter = async function () {
    try {
        // Script SQL
        let sql = `select id from tbl_filme_ator_personagem order by id desc limit 1`

        // Executa no banco de dados o script SQL
        let result = await prisma.$queryRawUnsafe(sql)

        // Validação para identificar se o retorno do BD é um ARRAY (vazio ou com dados)
        if (Array.isArray(result))
            return Number(result[0].id)
        else
            return false

    } catch (error) {
        return false
    }
}

// Insere um FilmeAtorPersonagem no Banco de dados
const setInsertFilmsActorsCharacters = async function (filmeAtorPersonagem) {
    try {
        let sql = `INSERT INTO tbl_filme_ator_personagem (id_filme, id_ator, id_personagem) VALUES (${filmeAtorPersonagem.id_filme}, ${filmeAtorPersonagem.id_ator}, ${filmeAtorPersonagem.id_personagem})`

        // Executa o script SQL que cria um FilmeAtor
        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }

}

// Atualiza um filmeAtorPersonagem ja existente no Banco de dados
const setUpdateFilmsActorsCharacters = async function (filmeAtorPersonagem) {
    try {
        let sql = `UPDATE tbl_filme_ator_personagem SET id_filme = ${filmeAtorPersonagem.id_filme}, id_ator = ${filmeAtorPersonagem.id_ator}, id_personagem = ${filmeAtorPersonagem.id_personagem} WHERE id = ${filmeAtorPersonagem.id}`

        // Executa o comando no banco de dados
        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

// Apaga um FilmeAtorPersonagem existente no BD
const setDeleteFilmsActorsCharacters = async function (id) {
    try {

        // Script SQL para deletar no BD
        let sql = `DELETE FROM tbl_filme_ator_personagem WHERE id = ${id}`

        // Executa o script SQL no BD
        let result = await prisma.$executeRawUnsafe(sql)

        // Valida se a requisição foi verdadeira
        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

// Apaga um filmeAtorPersonagem existente no BD pelo id de filme
const setDeleteFilmsActorsCharactersByIdFilm = async function (idFilme) {
    try {

        // Script SQL para deletar no BD
        let sql = `DELETE FROM tbl_filme_ator_personagem WHERE id_filme = ${idFilme}`

        // Executa o script SQL no BD
        let result = await prisma.$executeRawUnsafe(sql)

        // Valida se a requisição foi verdadeira
        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

module.exports = {
    getSelectAllFilmsActorsCharacters,
    getSelectByIdFilmActorCharacter,
    getSelectLastIdFilmeActorCharacter,
    getSelectFilmsByIdActor,
    getSelectActorsByIdFilm,
    setInsertFilmsActorsCharacters,
    setUpdateFilmsActorsCharacters,
    setDeleteFilmsActorsCharacters,
    setDeleteFilmsActorsCharactersByIdFilm,
    getSelectByIdFilmFilmActorCharacter
}