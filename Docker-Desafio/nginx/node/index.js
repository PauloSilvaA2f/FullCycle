const express = require('express');
const app = express();
const port = 3000;
const mysql = require('mysql');

// Configure a conexão com o banco de dados MySQL
const db = mysql.createConnection({
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb',
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conectado ao banco de dados MySQL');
});

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Olá Mundo</title>
      </head>
      <body>
        <form action="/fullcycle" method="post">
          <label for="name">Digite seu nome:</label>
          <input type="text" id="name" name="name" required>
          <button type="submit">Fire Now!!</button>
        </form>
      </body>
    </html>
  `);
});

app.post('/fullcycle', (req, res) => {
  const name = req.body.name;

  // Inserir o nome na tabela MySQL
  db.query('INSERT INTO people (name) VALUES (?)', [name], (err, result) => {
    if (err) {
      console.error('Erro ao inserir o nome no banco de dados:', err);
      return res.status(500).send('Erro interno do servidor.');
    }

    // Recuperar todos os registros da tabela
    db.query('SELECT * FROM people', (err, rows) => {
      if (err) {
        console.error('Erro ao recuperar registros do banco de dados:', err);
        return res.status(500).send('Erro interno do servidor.');
      }

      // Exibir a mensagem "Olá" seguida do nome e os registros da tabela
      res.send(`
        <p>FullCycle ROCKS!!</p>
        <p>Registros na tabela:</p>
        <ul>
          ${rows.map((row) => `<li>${row.name}</li>`).join('')}
        </ul>
      `);
    });
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
