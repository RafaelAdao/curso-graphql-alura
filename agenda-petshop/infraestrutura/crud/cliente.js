const executaQuery = require('../database/queries')

class Cliente {
  lista() {
    // const sql = 'SELECT c.*, p.id as petId, p.nome as petNome, p.tipo as petTipo, p.observacoes as  FROM Clientes c INNER JOIN Pets p WHERE c.id = d.donoId'
    const sql = 'SELECT * FROM Clientes; Select * FROM Pets'

    return executaQuery(sql).then(dados => {
      const clientes = dados[0]
      const pets = dados[1]

      return clientes.map(cliente => {
        const petsCLiente = pets.filter(pet => pet.donoId === cliente.id)
        return ({
          ...cliente,
          pets: petsCLiente
        })
      })
    })
  }

  buscaPorId(id) {
    const sql = `SELECT * FROM Clientes WHERE id=${id}; SELECT * FROM Pets WHERE Pets.donoId=${id}`

    return executaQuery(sql).then(dados => {
      const cliente = dados[0][0]
      const pets = dados[1]

      return ({
        ...cliente,
        pets
      })
    })
  }

  adiciona(item) {
    const { nome, cpf } = item
    const sql = `INSERT INTO Clientes(nome, CPF) VALUES('${nome}', '${cpf}')`

    return executaQuery(sql).then(resposta => (
      {
        ...item,
        id: resposta.insertId
      }
    ))
  }

  atualiza(novoItem) {
    const { id, nome, cpf } = novoItem
    const sql = `UPDATE Clientes SET nome='${nome}', CPF='${cpf}' WHERE id=${id}`

    return executaQuery(sql).then(resposta => novoItem)
  }

  deleta(id) {
    const sql = `DELETE FROM Clientes WHERE id=${id}`

    return executaQuery(sql).then(() => id)
  }
}

module.exports = new Cliente
