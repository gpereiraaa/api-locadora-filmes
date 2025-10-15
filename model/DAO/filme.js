/********************************************************************************************
 * Objetivo: Arquivo responsável pela realização do CRUD de filme no Banco de dados MySQL
 * Data: 01/10/2025
 * Autor: Gustavo Pereira 
 * Versão: 1.0
 ********************************************************************************************/

/************************************************************************************************************************************************
 * Dependencias do node para banco de dados relacional
 *      Sequelize  -> Foi uma biblioteca para acesso a banco de dados
 *      Prisma     -> É uma biblioteca atual para acesso e manipulação de dados, utilizando SQL ou ORM (MySQL, PostgreSQL, SQLServer, Oracle)
 *      Knex       -> É uma biblioteca atual para acesso e manipulação de dados, utilizando SQL (MySQL)
 * 
 * Dependencias do node para banco de dados não relacional
 *      Mongoose   -> É uma biblioteca para acesso a banco de dados não relacional (MongoDB)
 * 
 * 
 * 
 * Instalação do Prisma
 * npm install prisma --save             -> Realiza a conexão com o Banco de dados
 * npm install @prisma/client --save     -> Permite executar scripts SQL no Banco de dados 
 * npx prisma init                       -> Inicializar o prisma no projeto (.env, prisma, etc)
 * 
 * npx prisma migrate dev                -> Permite sincronizar o Prisma com o BD, modelar o BD conforme as configurações do ORM. 
 * 
 * npx prisma migrate reset              -> CUIDADO: Esse comando faz um reset no BD - Realiza o reset do database 
 * npx prisma generate                   -> Realiza apenas o sincronismo com o BD
 * 
 *  $queryRawUnsafe()    -> Permite executar apenas scripts SQL que retornam dados do BD (SELECT), permite tambem executar um script SQL atraves de uma variavel
 * 
 *  $executeRawUnsafe()    -> Permite executar scripts SQL que NÃO retornam dados do BD (INSERT, UPDATE, DELETE)
 * 
 *  $queryRaw()    -> Permite executar apenas scripts SQL que retornam dados do BD (SELECT), permite APENAS executar um script SQL direto no metodo. 
 *                                                                                            Permite tambem aplicar segurança contra SQL Injectoin
 * 
 *  $executeRaw()    -> Permite executar scripts SQL que NÃO retornam dados do BD (INSERT, UPDATE, DELETE), permite APENAS executar um script SQL direto no metodo. 
 *                                                                                                            Permite tambem aplicar segurança contra SQL Injectoin
 * 
 ************************************************************************************************************************************************/

// Import da biblioteca do PrismaClient 
//const {PrismaClient} = require('@prisma/client')
const { PrismaClient } = require('../../generated/prisma')

// Cria um objeto do prisma client para manipular os scripts SQL
const prisma = new PrismaClient()

// Retorna todos os filmes do banco de dados 
const getSelectAllFilms = async function () {
    try {
        // Script SQL
        let sql = `select * from tbl_filme order by id desc`

        // Executa no banco de dados o script SQL
        let result = await prisma.$queryRawUnsafe(sql)

        // Validação para identificar se o retorno do BD é um ARRAY (vazio ou com dados)
        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        //console.log(error)
        return false
    }

}

// Retorna um filme filtrando pelo ID do banco de dados 
const getSelectByIdFilms = async function (id) {
    try {
        // Script SQL
        let sql = `select * from tbl_filme where id = ${id}`

        // Executa no banco de dados o script SQL
        let result = await prisma.$queryRawUnsafe(sql)

        // Validação para identificar se o retorno do BD é um ARRAY (vazio ou com dados)
        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        //console.log(error)
        return false
    }
}

// Insere um filme no banco de dados 
const setInsertFilms = async function (filme) {
    try {
        let sql = `INSERT INTO tbl_filme (nome, sinopse, data_lancamento, duracao, orcamento, trailer, capa) VALUES ('${filme.nome}', '${filme.sinopse}', '${filme.data_lancamento}', '${filme.duracao}', '${filme.orcamento}', '${filme.trailer}', '${filme.capa}')`

        // $executeRawUnsafe() -> permite apenas executar scripts SQL que não tem retorno de dados (INSERT, UPDATE, DELETE)
        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

// Atualiza um filme existente no banco de dados filtrando pelo ID 
const setUpdateFilms = async function (filme) {
    try {
        let sql = `UPDATE tbl_filme SET 
                        nome                = '${filme.nome}', 
                        sinopse             = '${filme.sinopse}', 
                        data_lancamento     = '${filme.data_lancamento}', 
                        duracao             = '${filme.duracao}', 
                        orcamento           = '${filme.orcamento}', 
                        trailer             = '${filme.trailer}', 
                        capa                = '${filme.capa}'
                    WHERE id = ${filme.id}`

        // $executeRawUnsafe() -> permite apenas executar scripts SQL que não tem retorno de dados (INSERT, UPDATE, DELETE)
        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

// Apaga um filme existente no banco de dados filtrando pelo ID
const setDeleteFilms = async function (id) {
    try {
        let sql = `DELETE FROM tbl_filme WHERE id = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}


module.exports = {
    getSelectAllFilms,
    getSelectByIdFilms,
    setInsertFilms,
    setUpdateFilms,
    setDeleteFilms
}