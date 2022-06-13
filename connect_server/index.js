const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')

app.use(cors());
app.use(express.json())

const db = mysql.createConnection({
    user:'root',
    host:'localhost',
    password:'password',
    database:'cricketer'
})

app.post('/player_detail',(req,res)=>{
    const player_id = req.body.player_id;
    const player_name = req.body.player_name;
    const player_location = req.body.player_location;
    const join_date = req.body.join_date;

    db.query('INSERT INTO player_detail (player_id, player_name, player_location, join_date)VALUES(?,?,?,?)',
    [player_id,player_name,player_location,join_date],
    (err,result)=>{
        if(err){
           console.log(err)
        }else{
            res.send('Values Inserted')
        }
    }
    )

    db.connect((err)=>{
        err?console.log(err):console.log("connected");
    })
})

app.get('/showdata',(req,res)=>{
    db.query('call showdata()',(err,result)=>{
        if(err){
          console.log(err)
        }else{
            res.send(result[0])
        }
    })
})


app.listen(5001,()=>{
    console.log('Yes, your server is runnning on port 3001')
});