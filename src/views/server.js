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
        database: 'ccd',
        dateStrings: 'date'
    }
);

db.connect();

app.get('/students',(req,res) => {
    db.query(
        "SELECT * FROM student",
        (err,result) => {
            if(err){
                console.log(err)
            }else{
                res.send(result);
            }
        }
    );
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

app.post("/addStudent", (req,res)=>{
    const postStudentId = req.body.studentId;
    const postStudentDormitory = req.body.studentDormitory;
    const postStudentPassword = req.body.studentPwd;

    db.query(
        "INSERT INTO student (student_id,dormitory,student_password) values (?,?,?)"
        ,[postStudentId,postStudentDormitory,postStudentPassword],
        function(err){
            if(err){
                console.log(err)
                throw err;
            }else{
                console.log("성공");

            };
        });
});

app.post("/banStudent", (req,res)=>{
    const startDate = req.body.postStartDate;
    const endDate = req.body.postEndDate;
    const banStudentNum = req.body.banStudentNum;

    db.query(
        "INSERT INTO blacklist (student_num,start_date,end_date) values (?,?,?)"
        ,[banStudentNum,startDate,endDate],
        function(err){
            if(err){
                console.log(err)
                throw err;
            }else{
                console.log("성공");

            };
        });
});

app.post("/deleteStudent", (req,res)=>{
    const postStudentNum = req.body.postStudentNum;

    db.query(
        " delete  from student where student_num = (?)"
        ,[postStudentNum],
        function(err,rows,fields){
            if(err){
                console.log("실패");

            }else{
                console.log("성공");

            };
        });
});

app.get("/duplicateStudent",async(req,res)=>{
    const studentId = req.query.studentId;
    db.query(
        "SELECT student.student_id FROM student where student_id = (?)"
        ,[studentId],
        function(err,result){
            if(err){
                console.log(err)
            }else{
                console.log(result);
                res.send(result);
            }
        });
})

app.get("/searchStudents", async (req,res)=>{
    const postStudentId = req.query.postStudentId;
    const postOptionValue = (req.query.postOptionValue==null)? 0 : req.query.postOptionValue;
    console.log(req.query.postStudentId)
    console.log(req.query.postOptionValue)
    if(req.query.postStudentId==undefined&&(req.query.postOptionValue==0||req.query.postOptionValue==undefined)){
        db.query(
            "SELECT student.*,dormitory_name FROM student join dormitory on dormitory.dormitory_num = student.dormitory "
            ,['%'+postStudentId+'%'],
            function(err,result){
                if(err){
                    console.log(err)
                }else{
                    console.log(result);
                    res.send(result);
                }
            });
    }
    else if(req.query.postStudentId==undefined){
        db.query(
            "SELECT student.*,dormitory_name FROM student join dormitory on dormitory.dormitory_num = student.dormitory  where dormitory.dormitory_num = (?)"
            ,[postOptionValue],
            function(err,result){
                if(err){
                    console.log(err)
                }else{
                    console.log(result);
                    res.send(result);
                }
            });
    }
    else if((req.query.postOptionValue==0||req.query.postOptionValue==undefined)){
        db.query(
            "SELECT student.*,dormitory_name FROM student join dormitory on dormitory.dormitory_num = student.dormitory and student_id like (?) "
            ,['%'+postStudentId+'%'],
            function(err,result){
                if(err){
                    console.log(err)
                }else{
                    console.log(result);
                    res.send(result);
                }
            });}

    else{
        db.query(
            "SELECT student.*,dormitory_name FROM student join dormitory on dormitory.dormitory_num = student.dormitory and student_id like (?)  where dormitory.dormitory_num = (?)"
            ,['%'+postStudentId+'%',postOptionValue],
            function(err,result){
                if(err){
                    console.log(err)
                }else{
                    console.log(result);
                    res.send(result);
                }
            });}

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

app.get("/signIn", async (req,res)=>{
    const postAuthId = req.query.postAuthId;
    const postAuthPassword = req.query.postAuthPassword;
    db.query(
        "SELECT * FROM admin where admin_id=(?) and admin_password=(?) ;"
        ,[postAuthId,postAuthPassword],
        function(err,result){
            if(err){
                console.log(err)
            }else{
                console.log(result);
                res.send(result);
            }
        });
});


app.listen(PORT,()=>{
    console.log(`yes,your server is running on port ${PORT}!`);
});



