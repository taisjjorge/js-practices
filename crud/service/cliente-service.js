const baseURL = `http://localhost:3000/profile`

const listaClientes = () => {
  return fetch(baseURL)
    .then(resposta => {
      if (resposta.ok) {
        return resposta.json()
      }
      throw new Error('Não foi possível listar clientes')
    })
}

const criaCliente = (nome, email) => {
  return fetch(baseURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: nome,
      email: email,
    })
  })
    .then(resposta => {
      if(resposta.ok){
        return resposta.body
      }
      throw new Error('Não foi possível cadastrar o cliente')
    })
}

const removeCliente = (id) => {
  return fetch(`${baseURL}/${id}`, {
    method: 'DELETE',
  }).then(resposta => {
    if(!resposta.ok){
      throw new Error('Não foi possível remover o cliente')
    }
  })
}

const detalhaCliente = (id) => {
  return fetch(`${baseURL}/${id}`)
    .then(resposta => {
      if(resposta.ok){
        return resposta.json()
      }
      throw new Error('Não foi possível detalhar os dados do cliente')
    })
}

const atualizaCliente = (id, nome, email) => {
  return fetch(`${baseURL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: nome,
      email: email,
    })
  })
    .then(resposta => {
      if(resposta.ok){
        return resposta.json()
      }
      throw new Error('Não foi possível atualizar dados do cliente')
    })
}

export const clienteService = {
  listaClientes,
  criaCliente,
  removeCliente,
  detalhaCliente,
  atualizaCliente,
}



