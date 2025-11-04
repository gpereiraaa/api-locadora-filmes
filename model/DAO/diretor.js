/*******************************************************************************************************************************************
 * Objetivo: Arquivo responsavel pelo CRUD de diretor no banco de dados MYSQL
 * Data: 04/11/2025
 * Autor: Gustavo Pereira 
 * Versão: 1.0 
 ******************************************************************************************************************************************/

// Import da biblioteca do PrismaClient 
const { PrismaClient } = require('../../generated/prisma')

// Cria um objeto do prisma client para manipular os scripts SQL
const prisma = new PrismaClient()

// Import do arquivo padrão de mensagens
const MESSAGE_DEFAULT = require('../../controller/modulo/config_messages.js')

// Retorna todos os diretores cadastrados no BD
const getSelectAllDirectors = async function () {
    try {
        // Cria o script SQL que retorna todos os diretores
        let sql = `SELECT * FROM tbl_diretor ORDER BY id_diretor DESC`

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

// Retorna um diretor filtrando pelo ID
const getSelectByIdDirector = async function (id) {

    try {
        // Script SQL
        let sql = `SELECT * FROM tbl_diretor WHERE id_diretor = ${id}`

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

// Retorna o ID do ultimo diretor
const getSelectLastIdDirector = async function () {
    try {
        // Script SQL
        let sql = `select id_diretor from tbl_diretor order by id_diretor desc limit 1`

        // Executa no banco de dados o script SQL
        let result = await prisma.$queryRawUnsafe(sql)

        // Validação para identificar se o retorno do BD é um ARRAY (vazio ou com dados)
        if (Array.isArray(result))
            return Number(result[0].id_diretor)
        else
            return false

    } catch (error) {
        return false
    }
}

// Insere um novo diretor no Banco de dados
const setInsertDirector = async function (diretor) {
    // Realizando copia do objeto de mensagem padrão, permitindo que as alterações feitas nesta função não interfiram em outra função
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))
    try {
        if (diretor.data_nascimento == '' || diretor.data_nascimento == null || diretor.nome == undefined) {
            // Script SLQ para inserir no banco
            let sql = `INSERT INTO tbl_diretor (nome, nacionalidade, sexo, data_nascimento, foto, altura, biografia) VALUES ('${diretor.nome}', '${diretor.nacionalidade}', '${diretor.sexo}', NULL, '${diretor.foto}', '${diretor.altura}', '${diretor.biografia}')`

            // Executa o script SQL que cria um diretor no Banco de Dados
            let result = await prisma.$executeRawUnsafe(sql)

            // Valida se a requisição foi verdadeira
            if (result)
                return true
            else
                return false
        } else if (diretor.data_nascimento.length != 10) {
            MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [DATA_NASCIMENTO] inválido!!!'
            return MESSAGE.ERROR_REQUIRED_FIELDS // 400 
        } else {
            // Script SQL para inserir no banco
            let sql = `INSERT INTO tbl_diretor (nome, nacionalidade, sexo, data_nascimento, foto, altura, biografia) VALUES ('${diretor.nome}', '${diretor.nacionalidade}', '${diretor.sexo}', '${diretor.data_nascimento}', '${diretor.foto}', '${diretor.altura}', '${diretor.biografia}')`

            // Executa o script SQL que cria um diretor no Banco de Dados
            let result = await prisma.$executeRawUnsafe(sql)

            // Valida se a requisição foi verdadeira
            if (result)
                return true
            else
                return false
        }
    } catch (error) {
        return false
    }
}

// Edita um diretor já existente no BD
const setUpdateDirector = async function (diretor) {
    try {
        if (diretor.data_nascimento == '' || diretor.data_nascimento == null || diretor.nome == undefined) {
            // Script SQL que atualiza o diretor existente
            let sql = `UPDATE tbl_diretor SET nome = '${diretor.nome}', nacionalidade = '${diretor.nacionalidade}', sexo = '${diretor.sexo}', data_nascimento = NULL, foto = '${diretor.foto}', altura = '${diretor.altura}', biografia = '${diretor.biografia}' WHERE id_diretor = ${diretor.id}`

            // Executa o comando no BD
            let result = await prisma.$executeRawUnsafe(sql)

            if (result)
                return true
            else
                return false
        } else if (diretor.data_nascimento.length != 10) {
            MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [DATA_NASCIMENTO] inválido!!!'
            return MESSAGE.ERROR_REQUIRED_FIELDS // 400
        } else {
            // Script SQL que atualiza o diretor existente
            let sql = `UPDATE tbl_diretor SET nome = '${diretor.nome}', nacionalidade = '${diretor.nacionalidade}', sexo = '${diretor.sexo}', data_nascimento = '${diretor.data_nascimento}', foto = '${diretor.foto}', altura = '${diretor.altura}', biografia = '${diretor.biografia}' WHERE id_diretor = ${diretor.id}`

            // Executa o comando no BD
            let result = await prisma.$executeRawUnsafe(sql)

            if (result)
                return true
            else
                return false
        }
    } catch (error) {
        return false
    }
}

// Deleta um diretor já existente
const setDeleteDirector = async function (id) {
    try {
        // Script sql que deleta um diretor no BD
        let sql = `DELETE FROM tbl_diretor WHERE id_diretor = ${id}`

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
    getSelectAllDirectors,
    getSelectByIdDirector,
    getSelectLastIdDirector,
    setInsertDirector,
    setUpdateDirector,
    setDeleteDirector
}