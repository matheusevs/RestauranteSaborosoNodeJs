var conn = require('./db');

module.exports = {

    save(req){

        return new Promise((resolve, reject) => {

            let data = req.fields;

            if(!data.email){

                reject('Preencha o e-mail.');
            
              } else {
            
                conn.query(`
            
                  INSERT INTO tb_emails (email) VALUES (?)
            
                `, [
            
                  data.email
                
                ], (err, results) => {
            
                  if(err){
            
                    reject(err.message)
            
                  } else {
            
                    resolve(results);
            
                  }
            
                });
            
              }

        });

    },

    getEmails(){

        return new Promise((resolve, reject) => {

            conn.query(`
                SELECT * FROM tb_emails ORDER BY register DESC
            `, (err, results) => {

                if(err){
                    reject(err);
                }
                
                resolve(results);

            });
            
        });

    },

    delete(id){

        return new Promise((resolve, reject) => {

            conn.query(`

                DELETE FROM tb_emails WHERE id = ?

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