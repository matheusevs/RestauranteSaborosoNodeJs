var conn = require('./db');
const Pagination = require('./Pagination');

module.exports = {
    
    render(req, res, error, success){

        res.render('reservations', {
            title: 'Reservas - Restaurante Saboroso!',
            background: 'images/img_bg_2.jpg',
            h1: 'Reserve uma Mesa!',
            body: req.body,
            error,
            success
        });

    },

    save(fields){

        return new Promise((resolve, reject) => {

            if(fields.date.indexOf('/') > -1){

                let date = fields.date.split('/');
                fields.date = `${date[2]}-${date[1]}-${date[0]}`;

            }

            let query, params = [
                fields.name,
                fields.email,
                fields.people,
                fields.date,
                fields.time
            ];

            if(parseInt(fields.id) > 0){

                query = `
                    UPDATE tb_reservations
                    SET
                        name = ?,
                        email = ?,
                        people = ?,
                        date = ?,
                        time = ?
                    WHERE id = ?
                `;

                params.push(fields.id);

            } else {

                query = `
                    INSERT INTO tb_reservations (name, email, people, date, time)
                    VALUES(?, ?, ?, ?, ?)
                `;

            }

            conn.query(query, params, (error, results) => {
    
                if(error){

                    reject(error);
                
                } else {

                    resolve(results);

                }
    
            });
        
        });

    },

    getReservations(page){

        if(!page){
            page = 1;
        }

        let pag = new Pagination(
            `SELECT SQL_CALC_FOUND_ROWS * FROM tb_reservations ORDER BY name LIMIT ?, ?`
        );

        return pag.getPage(page);

    },

    delete(id){

        console.log(id);


        return new Promise((resolve, reject) => {

            conn.query(`

                DELETE FROM tb_reservations WHERE id = ?

            `, [id], (error, results) => {


                if(error){

                    reject(error);

                } else {

                    resolve(results);

                }

            });

        });

    }

}