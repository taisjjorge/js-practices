import BotaoConclui from './ConcluiTarefa.js'
import BotaoDeleta from './DeletaTarefa.js'
import { CarregaTarefa } from './CarregaTarefa.js'


// let tarefas = []

export const handleNovoitem = (evento) => {
  evento.preventDefault()
  const tarefas = JSON.parse(localStorage.getItem('tarefas')) || []
  // const lista = document.querySelector('[data-list]')
  const input = document.querySelector('[data-form-input]')
  const valor = input.value

  const calendario = document.querySelector('[data-form-date]')
  const data = moment(calendario.value)
  const horario = data.format('HH:mm')

  const dataFormatada = data.format('DD/MM/YYYY')
  const concluida = false

  const dados = {
    valor,
    dataFormatada,
    horario,
    concluida,
  }

  const tarefasAtualizadas = [...tarefas, dados]
  localStorage.setItem('tarefas', JSON.stringify
    (tarefasAtualizadas))

  input.value = " "
  CarregaTarefa()

  // const criaTarefa = Tarefa(dados)
  // lista.appendChild(criaTarefa)

  // sessionStorage.setItem("tarefa", JSON.stringify(dados)) // armazena dados enquanto a sessao estiver aberta (navegador aberto)

}

export const Tarefa = ({ valor, horario, concluida }, id) => {
  const tarefa = document.createElement('li')
  const conteudo = `<p class="content">${horario} * ${valor}</p>`

  if (concluida) {
    tarefa.classList.add('done')
  }
  tarefa.classList.add('task')
  tarefa.innerHTML = conteudo

  tarefa.appendChild(BotaoConclui(CarregaTarefa, id))
  tarefa.appendChild(BotaoDeleta(CarregaTarefa, id))

  return tarefa

}