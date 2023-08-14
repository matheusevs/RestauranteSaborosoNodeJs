var conn = require('./../inc/db');
var menus = require('./../inc/menus');
var reservations = require('./../inc/reservations');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  menus.getMenus().then(results => {

    res.render('index', { 
      title: 'Restaurante Saboroso!',
      menus: results,
      isHome: true
    });

  }).catch(error => {
    
    console.error(error);

  });

});

router.get('/contacts', function(req, res, next){

  res.render('contacts', {
    title: 'Contatos - Restaurante Saboroso!',
    background: 'images/img_bg_3.jpg',
    h1: 'Diga um oi!'
  });

});

router.get('/menus', function(req, res, next){

  menus.getMenus().then(results => {

    res.render('menus', {
      title: 'Menus - Restaurante Saboroso!',
      background: 'images/img_bg_1.jpg',
      h1: 'Saboreie nosso menu!',
      menus: results
    });

  }).catch(error => {
    
    console.error(error);

  });

});

router.get('/reservations', function(req, res, next){

  reservations.render(req, res);

});

router.post('/reservations', function(req, res, next){

  let data = req.body;

  if(!data.name){

    reservations.render(req, res, "Digite o nome");

  } else if(!data.email){

    reservations.render(req, res, "Digite o email");

  } else if(!data.people){

    reservations.render(req, res, "Selecione a quantidade de pessoas");
    
  } else if(!data.date){

    reservations.render(req, res, "Informe uma data");
    
  } else if(!data.time){

    reservations.render(req, res, "Informe um horário");
    
  } else {

    reservations.save(data).then(results => {

      req.body = {};
      reservations.render(req, res, null, "Reserva realizada com sucesso");
      

    }).catch(error => {

      reservations.render(req, res, error.message);

    });

  }

});

router.get('/services', function(req, res, next){

  res.render('services', {
    title: 'Serviços - Restaurante Saboroso!',
    background: 'images/img_bg_1.jpg',
    h1: 'É um prazer poder servir!'

  });

});

module.exports = router;
