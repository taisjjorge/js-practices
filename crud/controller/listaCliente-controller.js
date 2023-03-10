import { clienteService } from "../service/cliente-service.js"

const criaNovaLinha = (nome, email, id) => {
  const novoCliente = document.createElement('tr')
  const conteudo = `<td class="td" data-td>${nome}</td>
    <td>${email}</td>
    <td>
        <ul class="tabela__botoes-controle">
            <li><a href="../view/edita_cliente.html?id=${id}" class="botao-simples botao-simples--editar">Editar</a></li>
            <li><button class="botao-simples botao-simples--excluir" type="button">Excluir</button></li>
        </ul>
  </td>`

  novoCliente.innerHTML = conteudo
  novoCliente.dataset.id = id
  // console.log(novoCliente)
  return novoCliente
}

const tabela = document.querySelector('[data-tabela]')

tabela.addEventListener('click', async (evento) => {
  let ehBotaoDeletar = evento.target.className === 'botao-simples botao-simples--excluir'

  if (ehBotaoDeletar) {
    try {
      const deletaCliente = evento.target.closest('[data-id]')
      let id = deletaCliente.dataset.id
      await clienteService.removeCliente(id)
      deletaCliente.remove()

    } catch (erro) {
      console.log(erro)
      window.location.href = '../view/erro.html'
    }
  }
})

const render = async () => {
  try {
    const listaClientes = await clienteService.listaClientes()

    listaClientes.forEach(item => {
      tabela.appendChild(criaNovaLinha(
        item.name,
        item.email,
        item.id
      ))
    });
  }
  catch(erro) {
    console.log(erro)
    window.location.href = '../view/erro.html'
  }
}

render()