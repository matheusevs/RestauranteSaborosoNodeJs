const conn = require("./db");

module.exports = {

    render(req, res, error){

        res.render('admin/login', {
            body: req.body,
            error
        })
        
    },

    login(email, password){

        return new Promise((resolve, reject) => {

            conn.query(`

                SELECT * FROM tb_users WHERE email = ?
 
            `, [
                email
            ], (error, results) => {

                if(error){

                    reject(error);

                } else {

                    if(results.length <= 0){

                        reject('Usuário incorreto!');

                    } else {

                        let row = results[0];

                        if(row.password !== password){
                            
                            reject('Senha incorreta!');
                        
                        } else {
                            
                            resolve(row);

                        }

                    }
                }

            });

        });
    
    },

    getUsers(){

        return new Promise((resolve, reject) => {

            conn.query(`
                SELECT * FROM tb_users ORDER BY ID
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

            let query, queryPhoto = '', params = [
                fields.name,
                fields.email
            ];

            if(parseInt(fields.id) > 0){

                params.push(fields.id);

                query = `
                    UPDATE tb_users
                    SET name = ?,
                        email = ?,
                    WHERE id = ?
                `;

            } else {

                query = `
                    INSERT INTO tb_users (name, email, password)
                    VALUES(?, ?, ?)
                `;

                params.push(fields.password);

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

    delete(id){

        return new Promise((resolve, reject) => {

            conn.query(`

                DELETE FROM tb_users WHERE id = ?

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