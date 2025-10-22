/**********************************************************************************************
 * Objetivo: Arquivo responsável pela realização do CRUD de genero no Banco de dados MYSQL
 * Data: 21/10/2025
 * Autor: Gustavo Pereira
 * Versão: 1.0
 */


// Import da biblioteca do PrismaClient 
const { PrismaClient } = require('../../generated/prisma')

// Cria um objeto do prisma client para manipular os scripts SQL
const prisma = new PrismaClient()

// Retorna todos os generos de filme existentes no banco de dados
const getSelectAllGenres = async function () {
    try {
        // Script SQL
        let sql = `select * from tbl_genero order by id desc`

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

// Retorna um genero de filme filtrando pelo ID no BD
const getSelectByIdGenre = async function (id) {
    try {
        // Script SQL
        let sql = `select * from tbl_genero where id = ${id}`

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

// Retorna o ID do ultimo genero
const getSelectLastIdGenre = async function () {
    try {
        // Script SQL
        let sql = `select id from tbl_genero order by id desc limit 1`

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

// Insere um genero no Banco de dados
const setInsertGenre = async function (genero) {
    try {
        let sql = `INSERT INTO tbl_genero (nome, descricao) VALUES ('${genero.nome}', '${genero.descricao}')`

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

// Atualiza um genero ja existente no Banco de dados
const setUpdateGenre = async function (genero) {
    try {
        let sql = `UPDATE tbl_genero SET nome = '${genero.nome}', descricao = '${genero.descricao}' WHERE id = ${genero.id}`

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

// Apaga um genero existente no BD
const setDeleteGenre = async function (id) {
    try {

        // Script SQL para deletar no BD
        let sql = `DELETE FROM tbl_genero WHERE id = ${id}`

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
    getSelectAllGenres,
    getSelectByIdGenre,
    getSelectLastIdGenre,
    setInsertGenre,
    setUpdateGenre,
    setDeleteGenre
}