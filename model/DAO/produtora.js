/*************************************************************************************************************
 * Objetivo: Arquivo responsável por realizar o CRUD da produtora no Banco de dados MYSQL
 * Data: 22/10/2025
 * Autor: Gustavo Pereira
 * Versão: 1.0
 ************************************************************************************************************/

// Import da biblioteca do PrismaClient 
const { PrismaClient } = require('../../generated/prisma')

// Cria um objeto do prisma client para manipular os scripts SQL
const prisma = new PrismaClient()

// Retorna todas as produtoras cadastradas no BD
const getSelectAllProducers = async function () {
    try {
        // Script SQL
        let sql = `SELECT * FROM tbl_produtora ORDER BY id_produtora DESC`

        // Executa o comando no Banco de dados
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





module.exports = {
    getSelectAllProducers
}