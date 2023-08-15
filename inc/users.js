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
    
    }
}