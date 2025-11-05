/**********************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados no MYSQL referente ao relacionamento entre filme e genero
 * Data: 05/11/2025
 * Autor: Gustavo Pereira
 * Versão: 1.0
 */


// Import da biblioteca do PrismaClient 
const { PrismaClient } = require('../../generated/prisma')

// Cria um objeto do prisma client para manipular os scripts SQL
const prisma = new PrismaClient()

// Retorna todos os generos de filmes e generos do banco de dados
const getSelectAllFilmsGenres = async function () {
    try {
        // Script SQL
        let sql = `select * from tbl_filme_genero order by id desc`

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

// Retorna um filmeGenero filtrando pelo ID no BD
const getSelectByIdFilmGenre = async function (id) {
    try {
        // Script SQL
        let sql = `select * from tbl_filme_genero where id = ${id}`

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

// Retorna os generos filtrando pelo ID do filme do BD
const getSelectGenresByIdFilm = async function (idFilme) {
    try {
        // Script SQL
        let sql = `select tbl_genero.id, tbl_genero.nome
        from tbl_filme inner join tbl_filme_genero 
            on tbl_filme.id = tbl_filme_genero.id_filme
        inner join tbl_genero
            on tbl_genero.id = tbl_filme_genero.id_genero 
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

// Retorna os filmes filtrando pelo ID do genero do BD
const getSelectFilmsByIdGenre = async function (idGenero) {
    try {
        // Script SQL
        let sql = `select tbl_filme.id, tbl_filme.nome
        from tbl_filme inner join tbl_filme_genero 
            on tbl_filme.id = tbl_filme_genero.id_filme
        inner join tbl_genero
            on tbl_genero.id = tbl_filme_genero.id_genero 
        where tbl_genero.id = ${idGenero}`

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

// Retorna o ID do ultimo Filmegenero
const getSelectLastIdFilmeGenre = async function () {
    try {
        // Script SQL
        let sql = `select id from tbl_filme_genero order by id desc limit 1`

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

// Insere um Filmegenero no Banco de dados
const setInsertFilmsGenres = async function (filmeGenero) {
    try {
        let sql = `INSERT INTO tbl_filme_genero (id_filme, id_genero) VALUES (${filmeGenero.id_filme}, ${filmeGenero.id_genero})`

        // Executa o script SQL que cria um genero
        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }

}

// Atualiza um filmeGenero ja existente no Banco de dados
const setUpdateFilmsGenres = async function (filmeGenero) {
    try {
        let sql = `UPDATE tbl_filme_genero SET id_filme = ${filmeGenero.id_filme}, id_genero = ${filmeGenero.id_genero} WHERE id = ${filmeGenero.id}`

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

// Apaga um Filmegenero existente no BD
const setDeleteFilmsGenres = async function (id) {
    try {

        // Script SQL para deletar no BD
        let sql = `DELETE FROM tbl_filme_genero WHERE id = ${id}`

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
    getSelectAllFilmsGenres,
    getSelectByIdFilmGenre,
    getSelectLastIdFilmeGenre,
    getSelectFilmsByIdGenre,
    getSelectGenresByIdFilm,
    setInsertFilmsGenres,
    setUpdateFilmsGenres,
    setDeleteFilmsGenres
}