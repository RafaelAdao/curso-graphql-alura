const mysql = require('mysql')

const conexao = mysql.createConnection({
  host: 'localhost',
  port: 8083,
  user: 'root',
  password: 'example',
  database: 'agenda-petshop'
})

module.exports = conexao
