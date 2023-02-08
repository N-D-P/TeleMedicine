const {Pool} =require('pg')

const pool=new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'telemedicine',
    password: 'Ninad@bits',
    post: 5432
})

pool.query(`SELECT * FROM account`,function(err,res){
    console.log(res);
})

module.exports =pool