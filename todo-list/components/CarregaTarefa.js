import { ordenaDatas, removeDatasRepetidas } from "../service/data.js"
import { CriaData } from "./CriaData.js"

export const CarregaTarefa = () => {
  const lista = document.querySelector('[data-list]')

  const tarefasCadastradas = JSON.parse(localStorage.getItem('tarefas')) || []

  lista.innerHTML = " "
  
  const dataUnicas = removeDatasRepetidas(tarefasCadastradas)
  ordenaDatas(dataUnicas)
  dataUnicas.forEach((dia) => {

    lista.appendChild(CriaData(dia))
  })
}