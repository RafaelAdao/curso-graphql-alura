const executaQuery = require('../database/queries')

class Pet {
  lista() {
    const sql = 'SELECT p.id, p.nome, p.tipo, p.observacoes, c.id as donoId, c.nome as donoNome, c.cpf as donoCpf FROM Pets p INNER JOIN Clientes c WHERE p.donoId = c.id'

    return executaQuery(sql).then(pets => {
      return pets.map(pet => ({
        id: pet.id,
        nome: pet.nome,
        tipo: pet.tipo,
        observacoes: pet.observacoes,
        dono: {
          id: pet.donoId,
          nome: pet.donoNome,
          cpf: pet.donoCpf,
        }
      }))
    })
  }

  buscaPorId(id) {
    const sql = `SELECT p.id, p.nome, p.tipo, p.observacoes, c.id as donoId, c.nome as donoNome, c.cpf as donoCpf FROM Pets p INNER JOIN Clientes c WHERE p.id=${parseInt(id)} AND p.donoId = c.id`

    return executaQuery(sql).then(pets => ({
      id: pets[0].id,
      nome: pets[0].nome,
      tipo: pets[0].tipo,
      observacoes: pets[0].observacoes,
      dono: {
        id: pets[0].donoId,
        nome: pets[0].donoNome,
        cpf: pets[0].donoCpf,
      }
    }))
  }

  adiciona(item) {
    const { nome, donoId, tipo, observacoes } = item

    const sql = `INSERT INTO Pets(nome, donoId, tipo, observacoes) VALUES('${nome}', ${donoId}, '${tipo}', '${observacoes}'); SELECT * FROM Clientes WHERE id=${donoId}`

    return executaQuery(sql).then(resposta => {
      const dono = resposta[1][0]
      
      return ({
        ...item,
        id: resposta[0].insertId,
        dono
      })
    })
  }

  atualiza(novoItem) {
    const { id, nome, donoId, tipo, observacoes } = novoItem

    const sql = `UPDATE Pets SET nome='${nome}', donoId=${donoId}, tipo='${tipo}', observacoes='${observacoes}' WHERE id=${id}; SELECT * FROM Clientes WHERE id=${donoId}`

    return executaQuery(sql).then(dados => {
      const dono = dados[1][0]

      return ({
        ...novoItem,
        dono
      })
    })
  }

  deleta(id) {
    const sql = `DELETE FROM Pets WHERE id=${id}`

    return executaQuery(sql).then(() => id)
  }
}

module.exports = new Pet
