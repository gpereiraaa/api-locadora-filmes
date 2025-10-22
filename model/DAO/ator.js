/*******************************************************************************************************************************************
 * Objetivo: Arquivo responsavel pelo CRUD de ator no banco de dados MYSQL
 * Data: 22/10/2025
 * Autor: Gustavo Pereira 
 * Versão: 1.0 
 ******************************************************************************************************************************************/

// Import da biblioteca do PrismaClient 
const { PrismaClient } = require('../../generated/prisma')

// Cria um objeto do prisma client para manipular os scripts SQL
const prisma = new PrismaClient()


// Retorna todos os atores cadastrados no BD
const getSelectAllActors = async function () {
    try {
        // Cria o script SQL que retorna todos os atores
        let sql = `SELECT * FROM tbl_ator ORDER BY id_ator DESC`

        // Executa o script no BD
        let result = await prisma.$queryRawUnsafe(sql)

        // Valida se é um array que retorna do BD
        if (Array.isArray(result))
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

// Retorna um ator filtrando pelo ID
const getSelectByIdActor = async function (id) {

    try {
        // Script SQL
        let sql = `SELECT * FROM tbl_ator WHERE id_ator = ${id}`

        // Executa o script no BD
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

// Retorna o ID do ultimo ator
const getSelectLastIdActor = async function () {
    try {
        // Script SQL
        let sql = `select id_ator from tbl_ator order by id_ator desc limit 1`

        // Executa no banco de dados o script SQL
        let result = await prisma.$queryRawUnsafe(sql)

        // Validação para identificar se o retorno do BD é um ARRAY (vazio ou com dados)
        if (Array.isArray(result))
            return Number(result[0].id_ator)
        else
            return false

    } catch (error) {
        return false
    }
}

// Insere um novo ator no Banco de dados
const setInsertActor = async function (ator) {
    try {
        // Script SLQ para inserir no banco
        let sql = `INSERT INTO tbl_ator (nome, nacionalidade, sexo, data_nascimento, foto, altura, biografia) VALUES ('${ator.nome}', '${ator.nacionalidade}', '${ator.sexo}', '${ator.data_nascimento}', '${ator.foto}', '${ator.altura}', '${ator.biografia}')`

        // Executa o script SQL que cria um ator no Banco de Dados
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

// Edita um ator já existente no BD
const setUpdateActor = async function (ator) {
    try {
        // Script SQL que atualiza o ATOR existente
        let sql = `UPDATE tbl_ator SET nome = '${ator.nome}', nacionalidade = '${ator.nacionalidade}', sexo = '${ator.sexo}', data_nascimento = '${ator.data_nascimento}', foto = '${ator.foto}', altura = '${ator.altura}', biografia = '${ator.biografia}' WHERE id_ator = ${ator.id}`

        // Executa o comando no BD
        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

// Deleta um ator já existente
const setDeleteActor = async function (id) {
    try {
        // Script sql que deleta um Ator no BD
        let sql = `DELETE FROM tbl_ator WHERE id_ator = ${id}`

        // Executa o script no BD
        let result = await prisma.$executeRawUnsafe(sql)

        // Valida se foi verdadeiro
        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }


}


module.exports = {
    getSelectAllActors,
    getSelectByIdActor,
    getSelectLastIdActor,
    setInsertActor,
    setUpdateActor,
    setDeleteActor
}