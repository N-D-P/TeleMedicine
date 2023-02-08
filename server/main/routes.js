var express = require('express')
var router = express.Router()
var pool = require('./db')


/*
    POSTS ROUTES SECTION
*/

router.get('/api/get/allaccounts', (req, res, next ) => {
  pool.query("SELECT * FROM account", (q_err, q_res) => {
      res.json(q_res.rows);
      console.log("All acoounts api called");

  })
})

router.get('/api/get/allappointments', (req,res, next) => {
  pool.query('SELECT * FROM AppointmenT', (q_err, q_res) => {
    res.json(q_res.rows);
  })
});

router.post('/api/post/updatenote',(req,res, next) => {
  const id = req.body.id;
  const notes = req.body.notes;
  pool.query(`UPDATE appointment SET notes = $1 WHERE id = $2`,[notes,id], (q_err, q_res) => {
    res.json(q_res.rows);
  })
});

router.post('/api/post/updatebill',(req,res, next) => {
  const id = req.body.id;
  const amount = req.body.amount;
    // pool.query(`INSERT INTO bill SET amount = $1 WHERE appointmentid = $2`,[amount,id], (q_err, q_res) => {
    //   res.json(q_res.rows);
    // })

    pool.query(`UPDATE bill SET amount = $1 WHERE appointmentid = $2`,[amount,id], (q_err, q_res) => {
      res.json(q_res.rows);
    })
});

router.get('/api/get/allbills', (req,res, next) => {
  pool.query('SELECT * FROM bill', (q_err, q_res) => {
    res.json(q_res.rows);
  })
});

router.post('/api/post/newbill', (req,res, next) => {
  const values=[req.body.id,req.body.amount,req.body.isPaid,req.body.isVerified,req.body.suser_id]
  console.log("Inside new bill");
  console.log(values[2]+values[3]+values[4]);
  pool.query('INSERT INTO bill VALUES($1,$2,$3,$4,$5)',values, 
  (q_err, q_res) => {
    res.json(q_res.rows);
  })
});

router.post('/api/post/removeappointment',(req,res, next) => {
  const id = req.body.id;
  console.log("ID:"+id);
  // const amount = req.body.amount;
    // pool.query(`INSERT INTO bill SET amount = $1 WHERE appointmentid = $2`,[amount,id], (q_err, q_res) => {
    //   res.json(q_res.rows);
    // })
    pool.query(`DELETE FROM appointment WHERE id = $1`,[id], (q_err, q_res) => {
      console.log(q_res);
      console.log(q_err);

      //res.json(q_res.rows);
      
    })
});


router.post('/api/post/login', (req,res, next) => {
  const email=req.body.email;
  const pwd=req.body.pwd;
  console.log(email, pwd);
  var id;
  //for user
  var role;
  pool.query('SELECT accounttype FROM account WHERE email=$1 and password=$2',[email,pwd], (q_err, q_res) => {
    if(q_res.rows.length > 0) {
      //console.log(res.type());email
      console.log(q_res);
      role = q_res.rows[0].accounttype;
      console.log(role);
      if(role == "D") {
        pool.query('SELECT id FROM doctor WHERE email=$1',[email], (q_err1, q_res1) => {
          id=q_res1.rows[0].id;
          res.json({"user":role,"id":id})
          //console.log(role.type());
        })
      }
      if(role == "P") {
        pool.query('SELECT id FROM patient WHERE email=$1',[email], (q_err1, q_res1) => {
          id=q_res1.rows[0].id;
          res.json({"user":role,"id":id})
          //console.log(role.type());
        })
      }
    }
    //console.log(role.type());
    
  })

  
});
//Route for user validation
//let role = whatever query
// if(u found user)
// role = q_res.rows[0].user
//return -> res.json({"user" : role,"id":id})
//.................................
router.get('/api/get/doctorinfo', (req, res, next ) => {
  const did = req.body.did;
  pool.query("SELECT * FROM doctor D WHERE D.id =$1", [did],(q_err, q_res) => {
      res.json(q_res.rows);
  })
})

router.get('/api/get/doctorreview', (req, res, next ) => {
  const did = req.body.did;
  pool.query("SELECT * FROM review R WHERE R.d_id =$1", [did],(q_err, q_res) => {
      res.json(q_res.rows);
  })
})

router.get('/api/get/doctorservices', (req, res, next ) => {
  const did = req.body.did;
  pool.query("SELECT * FROM providesservice PS, service S WHERE PS.d_id =$1 AND PS.sname = S.name" , [did],(q_err, q_res) => {
      res.json(q_res.rows);
  })
})

router.get('/api/get/doctoroffices', (req, res, next ) => {
  const did = req.body.did;
  pool.query("SELECT * FROM hasoffice HO, office O WHERE HO.d_id =$1 AND O.address = HO.address", [did],(q_err, q_res) => {
      res.json(q_res.rows);
  })
})

router.get('/api/get/doctorservices', (req, res, next ) => {
  const did = req.body.did;
  //const services= req.body.services;
  pool.query("SELECT * FROM providesservices where d_id=$1", [did],(q_err, q_res) => {
      res.json(q_res.rows);
  })
})


module.exports = router
