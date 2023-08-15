var express = require('express');
var users = require('./../inc/users');
var admin = require('./../inc/admin');
var menus = require('./../inc/menus')
var router = express.Router();

router.use(function(req, res, next){


    if(['/login'].indexOf(req.url) === -1 && !req.session.user){

        res.redirect('/admin/login');

    } else {

        req.menus = admin.getMenus(req);
        next();

    }

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

router.get('/logout', function(req, res, next){

    delete req.session.user;
    res.redirect('/admin/login');

});

router.get('/', function(req, res, next){

    admin.dashboard().then(data => {

        res.render('admin/index', admin.getParams(req, {
            data            
        }));

    }).catch(error => {

        console.error(error);

    });
    
});

router.get('/contacts', function(req, res, next){

    res.render('admin/contacts', admin.getParams(req));

});

router.get('/emails', function(req, res, next){

    res.render('admin/emails', admin.getParams(req));

});

router.get('/menus', function(req, res, next){

    menus.getMenus().then(data => {
        
        res.render('admin/menus', admin.getParams(req, {
            data
        }));

    }).catch(error => {

        console.error(error);

    });

});

router.get('/reservations', function(req, res, next){

    res.render('admin/reservations', admin.getParams(req));

});

router.get('/users', function(req, res, next){

    res.render('admin/users', admin.getParams(req));

});

module.exports = router;