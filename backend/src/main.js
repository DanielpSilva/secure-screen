// hubbe/backend/src/main.js

const express = require('express');
const http = require('http');

const app = express();
const port = 3001;
const server = http.createServer(app);
app.use(express.json());


app.use((req, res) => {
  res.status(404).send('Endpoint não encontrado');
});

app.use((err, req, res) => {
  console.error(err.stack);
  res.status(500).send('Algo deu errado!');
});

server.listen(port, () => {
  console.log(`Servidor backend está rodando em http://localhost:${port}`);
});
