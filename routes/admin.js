var express = require('express');
var users = require('./../inc/users');
var admin = require('./../inc/admin');
var menus = require('./../inc/menus');
var reservations = require('./../inc/reservations');
var contacts = require('./../inc/contacts');
var emails = require('./../inc/emails');
var moment = require('moment');
var router = express.Router();
moment.locale('pt-BR');

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


    contacts.getContacts().then(data => {

        res.render('admin/contacts', admin.getParams(req, {data}));
    
    }).catch(error => {

        console.error(error);

    });


});

router.delete('/contacts/:id', function(req, res, next){

    contacts.delete(req.params.id).then(results => {

        res.send(results);

    }).catch(error => {

        res.send(error);

    })

});

router.get('/emails', function(req, res, next){

    emails.getEmails().then(data => {

        res.render('admin/emails', admin.getParams(req, {data}));
    
    }).catch(error => {

        console.error(error);

    });

});

router.delete('/emails/:id', function(req, res, next){

    emails.delete(req.params.id).then(results => {

        res.send(results);

    }).catch(error => {

        res.send(error);

    })

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

router.post('/menus', function(req, res, next){

    menus.save(req.fields, req.files).then(results => {

        res.send(results);

    }).catch(error => {

        res.send(error);

    })

});

router.delete('/menus/:id', function(req, res, next){

    menus.delete(req.params.id).then(results => {

        res.send(results);

    }).catch(error => {

        res.send(error);

    })

});

router.get('/reservations', function(req, res, next){

    let start = (req.query.start) ? req.query.start : moment().subtract(1, 'year').format('YYYY-MM-DD');
    let end = (req.query.end) ? req.query.end : moment().format('YYYY-MM-DD');

    reservations.getReservations(req.query).then(pag => {

        res.render('admin/reservations', admin.getParams(req, {
            date: {
                start,
                end
            },
            data: pag.data,
            moment,
            links: pag.links
        }));

    }).catch(error => {

        console.error(error);

    })


});

router.get('/reservations/chart', function(req, res, next){

    req.query.start = (req.query.start) ? req.query.start : moment().subtract(6, 'year').format('YYYY-MM-DD');
    req.query.end = (req.query.end) ? req.query.end : moment().format('YYYY-MM-DD');

    reservations.chart(req.query).then(chartData => {

        res.send(chartData);

    }).catch(error => {

        console.error(error);

    });

});

router.post('/reservations', function(req, res, next){

    reservations.save(req.fields, req.files).then(results => {

        res.send(results);

    }).catch(error => {

        res.send(error);

    })

});

router.delete('/reservations/:id', function(req, res, next){

    reservations.delete(req.params.id).then(results => {

        res.send(results);

    }).catch(error => {

        res.send(error);

    })

});

router.get('/users', function(req, res, next){

    users.getUsers().then(data => {
        
        res.render('admin/users', admin.getParams(req, {data}));

    }).catch(error => {

        console.error(error);

    });

});

router.post('/users', function(req, res, next){

    users.save(req.fields).then(results => {

        res.send(results);

    }).catch(error => {

        res.send(error);

    });

});

router.post('/users/password-change', function(req, res, next){

    users.changePassword(req).then(results => {

        res.send(results);

    }).catch(error => {

        res.send({error});

    });

});

router.delete('/users/:id', function(req, res, next){

    users.delete(req.params.id).then(results => {

        res.send(results);

    }).catch(error => {

        res.send(error);

    });

});

module.exports = router;