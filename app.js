const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');

// Criando a aplicação com Express
const app = express();

// Permite receber dados em JSON nas requisições (tipo POST e PUT)
app.use(express.json());

// Configuração do banco SQLite (vai criar o arquivo carros.db)
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './carros.db',
  logging: false // tirei os logs pra não poluir o terminal
});

// Modelo Carro (estrutura da tabela no banco)
const Carro = sequelize.define('Carro', {
  marca: {
    type: DataTypes.STRING,
    allowNull: false // não pode cadastrar carro sem marca
  },
  modelo: {
    type: DataTypes.STRING,
    allowNull: false // modelo também é obrigatório
  },
  ano: {
    type: DataTypes.INTEGER,
    allowNull: false // ano do carro
  },
  preco: {
    type: DataTypes.FLOAT,
    allowNull: false // preço obrigatório
  },
  quantidade: {
    type: DataTypes.INTEGER,
    defaultValue: 1 // se não informar, assume 1 no estoque
  }
}, {
  tableName: 'carros',
  timestamps: false // não quis usar createdAt/updatedAt
});

// Sincroniza o banco (cria a tabela se não existir)
(async () => {
  await sequelize.sync();
})();

// ---------------- ROTAS ----------------

// Rota inicial só pra testar se a API tá viva
app.get('/', (req, res) => {
  res.send('API de carros');
});

// GET - lista todos os carros cadastrados
app.get('/carros', async (req, res) => {
  const carros = await Carro.findAll(); // busca tudo no banco
  res.json(carros);
});

// GET - busca um carro específico pelo ID
app.get('/carros/:id', async (req, res) => {
  const carro = await Carro.findByPk(req.params.id);

  // Se encontrou, retorna o carro
  if (carro) {
    return res.json(carro);
  }

  // Se não encontrou, retorna erro 404
  res.status(404).json({ erro: "Carro não encontrado" });
});

// POST - cadastra um novo carro
app.post('/carros', async (req, res) => {
  try {
    // Pegando os dados que vieram no body
    const { marca, modelo, ano, preco, quantidade } = req.body;

    // Criando o carro no banco
    const novoCarro = await Carro.create({
      marca,
      modelo,
      ano,
      preco,
      quantidade
    });

    // Retorna sucesso com o ID criado
    res.status(201).json({
      mensagem: "Carro cadastrado!",
      id: novoCarro.id
    });

  } catch (error) {
    // Se der erro (ex: campo faltando), cai aqui
    res.status(400).json({ erro: "Erro ao cadastrar carro" });
  }
});

// PUT - atualiza um carro existente
app.put('/carros/:id', async (req, res) => {
  const carro = await Carro.findByPk(req.params.id);

  // Se não existir o id, retorna erro
  if (!carro) {
    return res.status(404).json({ erro: "Carro não encontrado" });
  }

  const { marca, modelo, ano, preco, quantidade } = req.body;

  // Atualiza os dados
  await carro.update({
    marca,
    modelo,
    ano,
    preco,
    quantidade
  });

  res.json({ mensagem: "Carro atualizado!" });
});

// DELETE - remove um carro do banco
app.delete('/carros/:id', async (req, res) => {
  const carro = await Carro.findByPk(req.params.id);

  if (!carro) {
    return res.status(404).json({ erro: "Carro não encontrado" });
  }

  const nomeCarro = `${carro.marca} ${carro.modelo}`;

  // Remove do banco
  await carro.destroy();

  res.json({ mensagem: `Carro '${nomeCarro}' removido!` });
});

// Inicializa o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});