new PluginFileReader('#modal-create [type=file]', '#modal-create img');
new PluginFileReader('#modal-update [type=file]', '#modal-update img');

let formCreate = document.querySelector('#modal-create form');

formCreate.addEventListener('submit', e => {

e.preventDefault();

let formCreateData = new FormData(formCreate);

fetch('/admin/menus', {
    method: 'POST',
    body: formCreateData
})
    .then(response => response.json())
    .then(json => {

    window.location.reload();
    
    });

});

let formUpdate = document.querySelector('#modal-update');

[...document.querySelectorAll('.btn-update')].forEach(btn => {

btn.addEventListener('click', e => {

    let tr = e.path.find(el => {

    return (el.tagName.toUpperCase() === 'TR');

    });

    let data = JSON.parse(tr.dataset.row);

    for(let name in data){

    switch(name){

        case 'photo':

            formUpdate.querySelector('img').src = '/' + data[name];
        
        break;

        default:
        let input = formUpdate.querySelector(`[name=${name}]`);
        
        if(input){

            input.value = data[name];
        
        } 

    }

    }

    $('#modal-update').modal('show');

});

});