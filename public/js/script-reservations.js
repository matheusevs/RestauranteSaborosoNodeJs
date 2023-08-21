let formCreate = document.querySelector('#modal-create form');

formCreate.save().then(json => {

    window.location.reload();

}).catch(error => {

    console.error(error);

});

let formUpdate = document.querySelector('#modal-update form');

formUpdate.save().then(json => {

    window.location.reload();

}).catch(error => {

    console.error(error);

});