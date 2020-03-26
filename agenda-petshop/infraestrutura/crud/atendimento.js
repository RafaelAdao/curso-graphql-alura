const executaQuery = require('../database/queries')

class Atendimento {
  lista() {
    const sql = 'SELECT a.id, a.data, a.status, a.observacoes, p.id as petId, p.nome as petNome, p.tipo as petTipo, p.observacoes as petObservacoes, c.id as clienteId, c.nome as clienteNome, c.cpf as clienteCpf, s.id as servicoId, s.nome as servicoNome, s.preco as servicoPreco, s.descricao as servicoDescricao FROM Atendimentos a INNER JOIN Clientes c INNER JOIN Pets p INNER JOIN Servicos s WHERE a.clienteID = c.id AND a.petId = p.id and a.servicoId = s.id'

    return executaQuery(sql).then(resultado => {

      return resultado.map(atendimento => ({
        id: atendimento.id,
        status: atendimento.status,
        data: atendimento.data,
        observacoes: atendimento.observacoes,
        cliente: {
          id: atendimento.clienteId,
          nome: atendimento.clienteNome,
          cpf: atendimento.clienteCpf,
        },
        pet: {
          id: atendimento.petId,
          nome: atendimento.petNome,
          tipo: atendimento.petTipo,
          observacoes: atendimento.petObservacoes,
        },
        servico: {
          id: atendimento.servicoId,
          nome: atendimento.servicoNome,
          preco: atendimento.servicoPreco,
          descricao: atendimento.servicoDescricao,
        }
      }))
    })
  }

  buscaPorId(id) {
    const sql = `SELECT a.id, a.data, a.status, a.observacoes, p.id as petId, p.nome as petNome, p.tipo as petTipo, p.observacoes as petObservacoes, c.id as clienteId, c.nome as clienteNome, c.cpf as clienteCpf, s.id as servicoId, s.nome as servicoNome, s.preco as servicoPreco, s.descricao as servicoDescricao FROM Atendimentos a INNER JOIN Clientes c INNER JOIN Pets p INNER JOIN Servicos s WHERE a.clienteID = c.id AND a.petId = p.id and a.servicoId = s.id AND a.id=${parseInt(id)}`
    return executaQuery(sql).then(atendimentos => ({
      id: atendimentos[0].id,
      status: atendimentos[0].status,
      data: atendimentos[0].data,
      observacoes: atendimentos[0].observacoes,
      cliente: {
        id: atendimentos[0].clienteId,
        nome: atendimentos[0].clienteNome,
        cpf: atendimentos[0].clienteCpf,
      },
      pet: {
        id: atendimentos[0].petId,
        nome: atendimentos[0].petNome,
        tipo: atendimentos[0].petTipo,
        observacoes: atendimentos[0].petObservacoes,
      },
      servico: {
        id: atendimentos[0].servicoId,
        nome: atendimentos[0].servicoNome,
        preco: atendimentos[0].servicoPreco,
        descricao: atendimentos[0].servicoDescricao,
      }
    }))
  }

  adiciona(item) {
    const { clienteId, petId, servicoId, status, observacoes } = item
    const current_datetime = new Date()
    const data = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate()

    const sql = `INSERT INTO Atendimentos(clienteId, petId, servicoId, data, status, observacoes) VALUES(${clienteId}, ${petId}, ${servicoId}, '${data}', '${status}', '${observacoes}');
    SELECT * FROM Clientes WHERE Clientes.id = ${clienteId}; SELECT * FROM Pets WHERE Pets.id = ${petId};SELECT * FROM Servicos WHERE Servicos.id = ${servicoId};`

    return executaQuery(sql).then(resposta => {
      const dados = resposta[0]
      const cliente = resposta[1][0]
      const pet = resposta[2][0]
      const servico = resposta[3][0]

      return ({
        id: dados.insertId,
        cliente,
        pet,
        servico,
        data,
        status,
        observacoes
      }
      )
    })
  }

  atualiza(novoItem) {
    const { id, clienteId, petId, servicoId, status, observacoes } = novoItem
    const current_datetime = new Date()
    const data = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate()

    const sql = `UPDATE Atendimentos SET clienteId=${clienteId}, petId=${petId}, servicoId=${servicoId}, data='${data}', status='${status}', observacoes='${observacoes}' WHERE id=${id}; SELECT * FROM Clientes WHERE Clientes.id = ${clienteId}; SELECT * FROM Pets WHERE Pets.id = ${petId};SELECT * FROM Servicos WHERE Servicos.id = ${servicoId};`

    return executaQuery(sql).then(resposta => {
      const dados = resposta[0]
      const cliente = resposta[1][0]
      const pet = resposta[2][0]
      const servico = resposta[3][0]

      return ({
        id: dados.insertId,
        cliente,
        pet,
        servico,
        data,
        status,
        observacoes
      }
      )
    })
  }

  deleta(id) {
    const sql = `DELETE FROM Atendimentos WHERE id=${id}`

    return executaQuery(sql).then(() => id)
  }
}

module.exports = new Atendimento
