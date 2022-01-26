# Bem-vindos ao Auto Trybe Backend

## Contexto

---

Esse projeto foi desenvolvido para uma vaga de backend na empresa [`Trybe`](www.betrybe.com).

A proposta era desenvolver uma aplicação backend para uma concessionária de automóveis, abrangindo carros, motos e caminhões.

Poucos detalhes foram dados sobre a forma para abordar o projeto. As únicas informações fornecidas foram os campos minimos que a aplicação deveria abordar, sendo elas:

|   Tipo   |  Marca   |  Model   |  Versão  |   Ano    | Quilometragem |
| :------: | :------: | :------: | :------: | :------: | :-----------: |
| `string` | `string` | `string` | `string` | `Number` |   `Number`    |

---

---

## Modo de desenvolvimento

---

O projeto foi desenvolvido utilizando TDD, inicialmente com testes unitários, e posteriormente foi implementado um teste de integração.

### Tecnologias

---

Foi utilizado para o desenvolvimento desse projeto o NodeJS com Express para a criação básica, Mocha + Chai para a criação dos teste unitários e de integração.

### Dados

Segue abaixo os atributos de um automovel utilizados, os tipos de dados de cada um e a forma que foram armazenados no banco:
|Tipo | Marca | Model | Versão| Ano |Quilometragem | Tipo de Câmbio| Preço de venda |Mes Referencia |
:-----:|:-----:|:-----:|:-----:|:-----:|:-----:|:-----:|:-----:|:-----:|
`String` | `String` | `String` | `String`| `Number`| `Number`| `String`| `Number`| `String`
`type` | `brand` | `model` | `version`| `year`| `mileage`| `transmissionType`| `sellPrice`| `dateReference`

### Banco de dados

O banco escolhido para a aplicação foi `Mongodb`, pela agilidade no desenvolvimento, facilidade de adição de novas informações sem necessitar re-estruturar toda a estrutura e pela robustes para lidar com grande volume de requisições.

---

## Cobertura de teste

Uma visualização será implementada para dar visibilidade sobre a cobertura de testes.

---

## Contatos

### Paulo Ricardo Zambelli (Zambs)
<br/>

<div style="display: flex; align-items: center;">
  <img src="./images/linkedIn_logo.jpg" alt="LinkedIn" style="width:20px;"/>  /in/paulo-ricardo-zambelli-taveira 
</div>
<br/>
<div style="display: flex;align-items: center;">
  <img src="./images/github_logo.png" alt="LinkedIn" style="width:20px;"/> https://github.com/pauloricardoz
</div>

<br/>

Email: trybe.przt@gmail.com
