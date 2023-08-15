var express = require('express');
var users = require('./../inc/users');
var router = express.Router();

router.get('/', function(req, res, next){

    res.render('admin/index', {

    });

});

router.post('/login', function(req, res, next){

    let data = req.body;

    if(!data.email){

        users.render(req, res, "Informe o email");

    } else if(!data.password){

        users.render(req, res, "Informe a senha");

    } else {

        users.login(data.email, data.password).then(user => {

            req.session.user = user;
            res.redirect('/admin');
            
        }).catch(error => {

            console.log(error)

            users.render(req, res, error.message || error);

        });

    }

});

router.get('/login', function(req, res, next){

    users.render(req, res, null);

});

router.get('/contacts', function(req, res, next){

    res.render('admin/contacts', {

    });

});

router.get('/emails', function(req, res, next){

    res.render('admin/emails', {

    });

});

router.get('/menus', function(req, res, next){

    res.render('admin/menus', {

    });

});

router.get('/reservations', function(req, res, next){

    res.render('admin/reservations', {

    });

});

router.get('/users', function(req, res, next){

    res.render('admin/users', {

    });

});

module.exports = router;