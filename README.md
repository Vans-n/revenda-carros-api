# API de Controle de Estoque de Carros

Projeto desenvolvido com **Node.js + Express + Sequelize + SQLite** para gerenciar o estoque de uma revenda de carros.

A API permite realizar operações básicas de cadastro, consulta, atualização e remoção de veículos.

---

##  Funcionalidades

* Listar todos os carros
* Buscar carro por ID
* Cadastrar novo carro
* Atualizar informações de um carro
* Remover carro do sistema

---

## 🛠️ Tecnologias utilizadas

* Node.js
* Express
* Sequelize
* SQLite

---

## Como executar o projeto

### 1. Acessar a pasta do projeto

```bash
cd nome-da-pasta
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Rodar o servidor

```bash
node estoque.js
```

---

## 🌐 Acessar a API

A API estará disponível em:

```
http://localhost:3000
```

---

## Testes da API

Os testes foram realizados utilizando o **Insomnia**, mas você também pode usar outras ferramentas como Postman ou até o navegador (para requisições GET).

---

## 🔀 Rotas da API

### 🔹 GET - Listar todos os carros

```
GET /carros
```

📌 Descrição: Retorna todos os carros cadastrados no banco.

---

### 🔹 GET - Buscar carro por ID

```
GET /carros/:id
```

📌 Descrição: Retorna um carro específico pelo ID.

---

### 🔹 POST - Cadastrar carro

```
POST /carros
```

📌 Descrição: Cadastra um novo carro no sistema.

📥 Exemplo de JSON:

```json
{
  "marca": "Toyota",
  "modelo": "Corolla",
  "ano": 2022,
  "preco": 120000,
  "quantidade": 2
}
```

---

### 🔹 PUT - Atualizar carro

```
PUT /carros/:id
```

📌 Descrição: Atualiza os dados de um carro existente.

📥 Exemplo de JSON:

```json
{
  "marca": "Honda",
  "modelo": "Civic",
  "ano": 2020,
  "preco": 95000,
  "quantidade": 3
}
```

---

### 🔹 DELETE - Remover carro

```
DELETE /carros/:id
```

📌 Descrição: Remove um carro do banco de dados.

---

## 💡 Observações

* O banco de dados (`carros.db`) é criado automaticamente
* Não é necessário configurar nada manualmente
* Projeto desenvolvido com foco em aprendizado de API REST

---

## 👩‍💻 Autora

Projeto desenvolvido por **Vanessa Santos** 💚
