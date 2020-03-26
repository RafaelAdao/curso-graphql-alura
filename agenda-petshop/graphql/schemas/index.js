const path = require('path')
const mergeGraphQlSchemas = require('merge-graphql-schemas')

const arquivos = path.join(__dirname, './')

const {
  fileLoader,
  mergeTypes
} = mergeGraphQlSchemas

const arquivosCarregados = fileLoader(arquivos)

const schemas = mergeTypes(arquivosCarregados)

module.exports = schemas