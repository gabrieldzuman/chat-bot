const express = require('express');
const path = require('path');
const morgan = require('morgan'); 
const app = express();

const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

app.use(morgan('dev'));

app.use((req, res, next) => {
  res.status(404).json({ error: 'Página não encontrada!' });
});

app.use((err, req, res, next) => {
  console.error('Erro no servidor:', err);
  res.status(500).json({ error: 'Erro interno do servidor!' });
});

app.listen(port, () => {
  console.log(`Hacking http://localhost:${port}`);
});

