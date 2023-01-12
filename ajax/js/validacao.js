// const dataNascimento = document.querySelector('#nascimento')
// dataNascimento.addEventListener('blur', (evento) => {
//   validaDataNascimento(evento.target)
// })

export function valida(input) {
  const tipoDeInput = input.dataset.tipo

  if (validadores[tipoDeInput]) {
    validadores[tipoDeInput](input)
  }

  if (input.validity.valid) {
    input.parentElement.classList.remove('input-container--invalido')
    input.parentElement.querySelector('.input-mensagem-erro').innerHTML = ''
  } else {
    input.parentElement.classList.add('input-container--invalido')
    input.parentElement.querySelector('.input-mensagem-erro').innerHTML = exibeMsgErro(tipoDeInput, input)
  }
}
const tiposDeErro = [
  'valueMissing',
  'typeMismatch',
  'patternMismatch',
  'customError',
  'tooShort'
]

const msgsErro = {
  nome: {
    valueMissing: 'O campo nome não pode ser vazio ou conter menos de 8 caracteres.',
    tooShort: 'O campo nome deve conter 8 ou mais caracteres.'
  },
  email: {
    valueMissing: 'O campo de email não pode estar vazio.',
    typeMismatch: 'O email digitado não é válido.',
  },
  senha: {
    valueMissing: 'O campo de senha não pode estar vazio',
    patternMismatch: 'A senha deve conter de 6 a 12 dígitos, exclusivamente composta por letras e números, sendo pelo menos 1 caracter letra maiúscula, minúscula e dígito numérico. Exemplo: Senha1',
  },
  dataNascimento: {
    valueMissing: 'O campo de data de nascimento não pode estar vazio',
    customError: 'Você deve ter 18 anos ou mais para se cadastrar.',
  },
  cpf: {
    valueMissing: 'O campo CPF não pode ser vazio.',
    customError: 'O CPF digitado não é válido',
  },
  cep: {
    valueMissing: 'O campo CEP não pode ser vazio.',
    patternMismatch: 'O CEP digitado não é válido',
    customError: 'O CEP digitado não é válido. Por favor, verifique e tente novamente.',
  },
  logradouro: {
    valueMissing: 'O campo Logradouro não ser vazio.',
  },
  cidade: {
    valueMissing: 'O campo Cidade não pode ser vazio.',
  },
  estado: {
    valueMissing: 'O campo Estado não pode ser vazio.',
  }
}

const validadores = {
  dataNascimento: input => validaDataNascimento(input),
  cpf: input => validaCPF(input),
  cep: input => recuperarCEP(input),
}

function exibeMsgErro(tipoDeInput, input) {
  let mensagem = ''

  tiposDeErro.forEach(erro => {
    if (input.validity[erro]) {
      mensagem = msgsErro[tipoDeInput][erro]
    }
  })

  return mensagem
}

function validaDataNascimento(input) {
  const dataRecebida = new Date(input.value)
  let msg = ''

  if (!maiorQue18(dataRecebida)) {
    msg = 'Você deve ter 18 anos ou mais para se cadastrar'
  }

  input.setCustomValidity(msg)
}

function maiorQue18(data) {
  const dataAtual = new Date()
  const dataMais18 = new Date(
    data.getUTCFullYear() + 18,
    data.getUTCMonth(),
    data.getUTCDate()
  )

  return dataMais18 <= dataAtual
}

function validaCPF(input) {
  const cpfFormatado = input.value.replace(/\D/g, '') //regex pra substituir tudo que nao for digito por uma string vazia
  let mensagem = ''

  if (!checaRepeticaoCPF(cpfFormatado) || !checaEstruturaCPF(cpfFormatado)) {
    mensagem = 'CPF digitado não é válido.'
  }

  input.setCustomValidity(mensagem)

}

function checaRepeticaoCPF(cpf) {
  const valoresRepetidos = [
    '00000000000',
    '11111111111',
    '22222222222',
    '33333333333',
    '44444444444',
    '55555555555',
    '66666666666',
    '77777777777',
    '88888888888',
    '99999999999',
  ]

  let cpfValido = true

  valoresRepetidos.forEach(valor => {
    if (valor == cpf) {
      cpfValido = false
    }
  })

  return cpfValido
}

function checaEstruturaCPF(cpf) {
  const multiplicador = 10

  return checaDigitoVerificador(cpf, multiplicador)
}

function checaDigitoVerificador(cpf, multiplicador) {
  if(multiplicador >= 12) {
    return true
  }

  let multiplicadorInicial = multiplicador
  let soma = 0
  const cpfSemDigitos = cpf.substring(0, multiplicador - 1).split('')
  const digitoVerificador = cpf.charAt(multiplicador - 1)

  for(let contador = 0; multiplicadorInicial > 1; multiplicadorInicial--) {
    soma = soma + cpfSemDigitos[contador] * multiplicadorInicial
    contador++
  }

  if(digitoVerificador == confirmaDigito(soma)) {
    return checaDigitoVerificador(cpf, multiplicador + 1)
  }

  return false

}

function confirmaDigito(soma) {
  return 11 - (soma % 11)
}

function recuperarCEP(input) {
  const cep = input.value.replace(/\D/g, '')
  const url = `https://viacep.com.br/ws/${cep}/json`
  const options = {
    method: 'GET',
    mode: 'cors',
    headers: {
      'content-type': 'application/json;charset=utf-8',
    }
  }

  if(!input.validity.patternMismatch && !input.validity.valueMissing) {
    fetch(url, options).then(
      response => response.json()
    ).then(
      data => {
        // console.log(data)
        if(data.erro) {
          input.setCustomValidity('O CEP digitado não é válido.')
          return
        }
        input.setCustomValidity('')
        preencheCamposComCEP(data)
        return
      }
    )
  }

}

function preencheCamposComCEP(data) {
  const logradouro = document.querySelector('[data-tipo="logradouro"]')
  const cidade = document.querySelector('[data-tipo="cidade"]')
  const estado = document.querySelector('[data-tipo="estado"]')

  logradouro.value = data.logradouro
  cidade.value = data.localidade
  estado.value = data.uf
}