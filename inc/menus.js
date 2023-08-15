let conn = require('./db');
let path = require('path');

module.exports = {

    getMenus(){

        return new Promise((resolve, reject) => {

            conn.query(`
                SELECT * FROM tb_menus ORDER BY title
            `, (err, results) => {

                if(err){
                    reject(err);
                }
                
                resolve(results);

            });
            
        });

    },

    save(fields, files){

        return new Promise((resolve, reject) => {

            fields.photo = `images/upload/${path.parse(files.photo.path).base}`;

            conn.query(`
            
                INSERT INTO tb_menus (title, description, price, photo)
                VALUES(?, ?, ?, ?)
            
            `, [
                fields.title,
                fields.description,
                fields.price,
                fields.photo
            ], (error, results) => {

                if(error){

                    reject(error);

                } else {

                    resolve(results);

                }

            });

        });

    }

}