const path = require('path')
const mergeGraphQlSchemas = require('merge-graphql-schemas')

const {
  fileLoader
} = mergeGraphQlSchemas

const arquivos = path.join(__dirname, './')

const arquivosCarregados = fileLoader(arquivos)

module.exports = arquivosCarregados