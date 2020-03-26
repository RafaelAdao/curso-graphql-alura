import { api, opcoesFetch, baseURL } from './config'


const listarClientes = () =>
  fetch(baseURL, opcoesFetch('{clientes { id nome cpf}}'))
    .then(resposta => resposta.json())
    .then(dados => dados.data.clientes)

const buscarClientePorId = id =>
  fetch(baseURL, opcoesFetch(`{
    cliente(id: ${id}) {
      nome
      cpf
    }
  }`))
    .then(resposta => resposta.json())
    .then(dados => dados.data.cliente)

const adicionarCliente = cliente =>
  fetch(baseURL, opcoesFetch(`
    mutation {
      adicionarCliente(nome: "${cliente.nome}", cpf: "${cliente.cpf}") {
        id
        nome
      }
    }
  `))
    .then(resposta => resposta.json())
    .then(dados => dados.data.cliente)

const alterarCliente = (id, cliente) =>
  fetch(baseURL, opcoesFetch(`
    mutation {
      atualizarCliente(id: ${id}, nome: "${cliente.nome}", cpf: "${cliente.cpf}") {
        id
        nome
        cpf
      }
    }
  `))
    .then(resposta => resposta.json())
    .then(dados => dados.data.cliente)

const removerCliente = id =>
  fetch(baseURL, opcoesFetch(`
    mutation {
      deletarCliente(id: ${id})
    }
  `))

export default {
  listarClientes,
  buscarClientePorId,
  adicionarCliente,
  alterarCliente,
  removerCliente
}