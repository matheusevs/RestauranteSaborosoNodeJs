new PluginFileReader('#modal-create [type=file]', '#modal-create img');
new PluginFileReader('#modal-update [type=file]', '#modal-update img');

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


[...document.querySelectorAll('.btn-delete')].forEach(btn => {

    btn.addEventListener('click', e => {

        let tr = e.path.find(el => {

            return (el.tagName.toUpperCase() === 'TR');

        });

        let data = JSON.parse(tr.dataset.row);

        if(confirm(`Deseja realmente excluir o menu ${data.title}?`)){

            fetch(`/admin/menus/${data.id}`, {
                method: 'DELETE'
            })
            .then(response => response.json())
            .then(json => {
    
                window.location.reload();
    
            });
        
        }

    });

});