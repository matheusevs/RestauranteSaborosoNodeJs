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

            let input = formUpdate.querySelector(`[name=${name}]`);

            switch(name){

                case 'date':
                    if(input){

                        input.value = moment(data[name]).format('YYYY-MM-DD');
                    
                    }
                break;

                default:                    
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

        if(confirm(`Deseja realmente excluir a reserva de ${data.name}?`)){

            fetch(`/admin/reservations/${data.id}`, {
                method: 'DELETE'
            })
            .then(response => response.json())
            .then(json => {
    
                window.location.reload();
    
            });
        
        }

    });

});