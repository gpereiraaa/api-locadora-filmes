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

// Retorna o ID do ultimo personagem inserido
const getSelectLastIdCharacter = async function () {
    try {
        // Script SQL
        let sql = `SELECT id_personagem FROM tbl_personagem ORDER BY id_personagem DESC LIMIT 1`

        // Executa o comando no Banco de Dados
        let result = await prisma.$queryRawUnsafe(sql)

        // Validação para identificar se o retorno do Banco é um ARRAY
        if (Array.isArray(result))
            // Transforma o retorno do BD em um Numero e retorna apenas o numero
            return Number(result[0].id_personagem)
        else
            return false
    } catch (error) {
        return false
    }
}


// Insere um personagem no BD
const setInsertCharacter = async function (personagem) {
    try {
        let sql = `INSERT INTO tbl_personagem (nome, nacionalidade, apelido, descricao, biografia, sexo, foto) VALUES ('${personagem.nome}', '${personagem.nacionalidade}', '${personagem.apelido}', '${personagem.descricao}', '${personagem.biografia}', '${personagem.sexo}', '${personagem.foto}')`
        
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

// Atualiza um personagem ja existente no Banco de dados
const setUpdateCharacter = async function (personagem) {
    try {
        let sql = `UPDATE tbl_personagem SET nome = '${personagem.nome}', nacionalidade = '${personagem.nacionalidade}', apelido = '${personagem.apelido}', descricao = '${personagem.descricao}', biografia = '${personagem.biografia}', sexo = '${personagem.sexo}', foto = '${personagem.foto}' WHERE id_personagem = ${personagem.id}`

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

// Apaga um personagem existente no BD
const setDeleteCharacter = async function (id) {
    try {

        // Script SQL para deletar no BD
        let sql = `DELETE FROM tbl_personagem WHERE id_personagem = ${id}`

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
    getSelectAllCharacters,
    getSelectByIdCharacter,
    getSelectLastIdCharacter,
    setInsertCharacter,
    setUpdateCharacter,
    setDeleteCharacter
}