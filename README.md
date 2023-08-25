

para criação do banco de dados, basta utilizar a migration que está no caminho public/db/mysql.sql


-- necessario ter 
nodejs
mysql 
redis
-->


# - Projeto Restaurante Saboroso

---

# Orientações

Segue as orientações gerais para desenvolvedores que desejarem rodar o projeto em sua máquina.

** Para rodar o projeto em seu computador, é necessario ter instalado: 

- <a href="https://nodejs.org/en/">NodeJS - v14.20.1</a>
- <a href="https://redis.io/docs/getting-started/installation/install-redis-on-linux/">Redis</a>

**Após a instalação de todos as ferramentas acima, rode os seguintes comandos em seu terminal:**

```bash
sudo npm install express-generator -g
sudo npm install -g bower
sudo npm install -g nodemon
git clone https://github.com/matheusevs/RestauranteSaboroso.git
cd RestauranteSaboroso
cd public/admin/
bower install
cd ../..
npm install
redis-server --port 6378
npm start
```

**Para criação do banco de dados, basta utilizar a migration que está no caminho public/db/mysql.sql

**Após rodar todos os comandos, acesse a url http://localhost:3000/ para ter acesso a aplicação e http://localhost:3000/admin para ter acesso a página de administração**

---

<!--<img src="img/gif.gif">-->
