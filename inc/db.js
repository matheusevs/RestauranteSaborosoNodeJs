const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', //Coloque o usuário do seu banco de dados aqui
  database: 'saboroso',
  password: '', //Coloque a senha do seu banco de dados aqui
  multipleStatements: true
});

module.exports = connection;
