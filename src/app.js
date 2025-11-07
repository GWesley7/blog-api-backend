const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Importar rotas
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conexão com MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Conectado ao MongoDB Atlas'))
  .catch(err => console.error('❌ Erro ao conectar MongoDB:', err));

// Rotas ← AQUI ENTRE A CONEXÃO E O HEALTH!
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

// Rota de saúde da API
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'API do Blog funcionando!',
    timestamp: new Date().toISOString()
  });
});

// Middleware de erro 404
app.use((req, res) => {
  res.status(404).json({ message: 'Rota não encontrada' });
});

// Middleware de tratamento de erros
app.use((error, req, res, next) => {
  console.error('Erro:', error);
  res.status(500).json({ message: 'Erro interno do servidor' });
});

module.exports = app;