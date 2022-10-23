const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const bodyParser = require("body-parser");
const mysql = require('mysql');
const cors = require('cors')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

const db = mysql.createConnection(
    {
        user: 'root',
        host:'localhost',
        password: 'cym0523200!',
        database: 'study'
    }
);

db.connect();

app.get('/students',(req,res) => {
    db.query(
        "SELECT * FROM STUDY",
        (err,result) => {
            if(err){
                console.log(err)
            }else{
                res.send(result);
            }
        }
    );
});

app.post('/login',async (req,res) =>{
    const{id,password}=req.body;
    db.query("SELECT * FROM STUDY WHERE STUDENT_ID = '${id}'",
        (err,rows,fileds)=>{
            if(rows != undefined){
                if(rows[0]==undefined){
                    res.send(null);
                }else {
                    if(password==rows[0].student_password){
                        res.send(rows[0])
                    }else{
                        res.send('실패')
                    }
                }
            }}
    )
});

app.post("/idplz", (req,res)=>{
    const postDormitoryName = req.body.postDormitoryName;

    db.query(
        "INSERT INTO dormitory (name) values (?)"
        ,[postDormitoryName],
        function(err,rows,fields){
            if(err){
                console.log("실패");

            }else{
                console.log("성공");

            };
        });
});

app.get("/searchStudents", async (req,res)=>{
    const postStudentName = req.query.postStudentName;

    db.query(
        "SELECT * FROM STUDY WHERE student_name = (?)"
        ,[postStudentName],
        function(err,result){
            if(err){
                console.log(err)
            }else{
                console.log(result);
                res.send(result);
            }
        });
});


app.get('/dormitories',(req,res) => {
    db.query(
        "SELECT * FROM dormitory",
        (err,result) => {
            if(err){
                console.log(err)
            }else{
                res.send(result);
            }
        }
    );
});

app.listen(PORT,()=>{
    console.log(`yes,your server is running on port ${PORT}!`);
});



