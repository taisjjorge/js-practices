import { handleNovoitem } from "./components/CriaTarefa.js"
import { CarregaTarefa } from "./components/CarregaTarefa.js"

const novaTarefa = document.querySelector('[data-form-button]')

novaTarefa.addEventListener('click', handleNovoitem)
CarregaTarefa()