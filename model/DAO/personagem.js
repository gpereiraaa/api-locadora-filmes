/*******************************************************************************************************************************************
 * Objetivo: Arquivo responsavel pelo CRUD de personagens no banco de dados MYSQL
 * Data: 29/10/2025
 * Autor: Gustavo Pereira 
 * Versão: 1.0 
 ******************************************************************************************************************************************/

// Import da biblioteca do PrismaClient 
const { PrismaClient } = require('../../generated/prisma')

// Cria um objeto do prisma client para manipular os scripts SQL
const prisma = new PrismaClient()

// Retorna todos os personagens existentes
const getSelectAllCharacters = async function () {
    try {
        // Script SQL
        let sql = `SELECT * FROM tbl_personagem ORDER BY id_personagem DESC`

        // Executa o script no BD
        let result = await prisma.$queryRawUnsafe(sql)

        // Valida se o retorno do BD é um ARRAY
        if (Array.isArray(result))
            return result
        else
            return false
    } catch (error) {
        return false
    }

}

// Retorna um personagem pelo ID
const getSelectByIdCharacter = async function (id) {
    try {
        // Script SQL
        let sql = `SELECT * FROM tbl_personagem WHERE id_personagem = ${id}`

        // Executa o script 
        let result = await prisma.$queryRawUnsafe(sql)

        // Verifica se result é um ARRAY
        if (Array.isArray(result))
            return result
        else
            return false
    } catch (error) {
        return false
    }
}



module.exports = {
    getSelectAllCharacters,
    getSelectByIdCharacter
}