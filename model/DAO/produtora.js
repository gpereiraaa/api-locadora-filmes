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

// Retorna uma produtora filtrando pelo ID
const getSelectByIdProducer = async function (id) {
    try {
        // Script SQL
        let sql = `SELECT * FROM tbl_produtora WHERE id_produtora = ${id}`

        // Executa o comando no Banco de dados
        let result = await prisma.$queryRawUnsafe(sql)

        // Validação para identificar se o retorno do Banco é um ARRAY
        if (Array.isArray(result))
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

// Retorna o ID da ultima produtora inserida
const getSelectLastIdProducer = async function () {
    try {
        // Script SQL
        let sql = `SELECT id_produtora FROM tbl_produtora ORDER BY id_produtora DESC LIMIT 1`

        // Executa o comando no Banco de Dados
        let result = await prisma.$queryRawUnsafe(sql)

        // Validação para identificar se o retorno do Banco é um ARRAY
        if (Array.isArray(result))
            // Transforma o retorno do BD em um Numero e retorna apenas o numero
            return Number(result[0].id_produtora)
        else
            return false
    } catch (error) {
        return false
    }
}

// Insere uma nova produtora no Banco de dados
const setInsertProducer = async function (produtora) {
    try {
        // Script SQL 
        let sql = `INSERT INTO tbl_produtora (nome, pais, data_fundacao, descricao, site) VALUES ('${produtora.nome}', '${produtora.pais}', '${produtora.data_fundacao}', '${produtora.descricao}', '${produtora.site}')`

        // Executa o comando no BD
        let result = await prisma.$executeRawUnsafe(sql)

        // Valida se a requisição é verdadeira
        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

// Atualiza uma produtora já existente no BD
const setUpdateProducer = async function (produtora) {
    try {
        // Script SQL
        let sql = `UPDATE tbl_produtora SET nome = '${produtora.nome}', pais = '${produtora.pais}', data_fundacao = '${produtora.data_fundacao}', descricao = '${produtora.descricao}', site = '${produtora.site}' WHERE id_produtora = ${produtora.id}`

        // Executa o comando no BD
        let result = await prisma.$executeRawUnsafe(sql)

        // Valida se foi verdadeira
        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

// Deleta uma produtora existente no Banco de dados
const setDeleteProducer = async function (id) {
    try {
        // Script SQL
        let sql = `DELETE FROM tbl_produtora WHERE id_produtora = ${id}`

        // Executa o comando no banco de dados
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
    getSelectAllProducers,
    getSelectByIdProducer,
    getSelectLastIdProducer,
    setInsertProducer,
    setUpdateProducer,
    setDeleteProducer
}