# - Projeto Restaurante Saboroso

---

# Orientações

Segue as orientações gerais para desenvolvedores que desejarem rodar o projeto em sua máquina.

**Para rodar o projeto em seu computador, é necessario ter instalado:**

- <a href="https://nodejs.org/en/">NodeJS - v14.20.1</a>
- <a href="https://redis.io/docs/getting-started/installation/install-redis-on-linux/">Redis</a>
- <a href="https://dev.mysql.com/downloads/installer/">MYSQL</a>

**Após a instalação de todos as ferramentas acima, rode os seguintes comandos em seu terminal:**

```bash
sudo npm install express-generator -g
sudo npm install -g bower
sudo npm install -g nodemon
git clone https://github.com/matheusevs/RestauranteSaboroso.git
cd RestauranteSaboroso
cd public/admin/
bower install
cd ..
cd images
mkdir uploads
cd ../..
npm install
npm start
```

**Após isso, abra um novo terminal na pasta raiz e continue rodando os comandos:**

```bash
redis-server --port 6379
```

**Para criação do banco de dados, basta utilizar a migration que está no caminho public/db/mysql.sql**

**Após rodar todos os comandos, acesse a url http://localhost:3000/ para ter acesso a aplicação e http://localhost:3000/admin para ter acesso a página de administração**

---

<!-- <img src="media/gif.gif"> -->
<div style="text-align: center; padding-top: 50px;">
    <video width="640" height="360" controls>
        <source src="media/restauratesaboroso.mp4" type="video/mp4">
        Seu navegador não suporta o elemento de vídeo.
    </video>
</div>