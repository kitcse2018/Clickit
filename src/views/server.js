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
        host: 'localhost',
        password: '1234',
        database: 'ccd'
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



app.post('/login',async (req,res) =>{
    const{id,password}=req.body;
    db.query("SELECT * FROM student WHERE STUDENT_ID = '${id}'",
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


app.post("/deleteStudent", (req,res)=>{
    const postStudentId = req.body.postStudentId;

    db.query(
        " delete  from student where student_num = (?)"
        ,[postStudentId],
        function(err,rows,fields){
            if(err){
                console.log("실패");

            }else{
                console.log("성공");

            };
        });
});

app.get("/searchStudents", async (req,res)=>{
    const postStudentId = req.query.postStudentId;
    const postOptionValue = (req.query.postOptionValue==null)? 0 : req.query.postOptionValue;
    console.log(req.query.postStudentId)
    console.log(req.query.postOptionValue)
    if(req.query.postStudentId==undefined&&req.query.postOptionValue==undefined){
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
    else if(postOptionValue == 0){
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

app.get('/facility',(req,res) => {
    db.query(
        "SELECT * FROM facility",
        (err,result) => {
            if(err){
                console.log(err)
            }else{
                res.send(result);
            }
        }
    );
});





app.get('/inner_facility',async(req,res) => {
    let inner_facility_num = req.query.facilityNum;
    db.query(
        "SELECT * FROM inner_facility AS inf INNER JOIN facility_seat AS fs ON inf.inner_facility_num = fs.inner_facility_num " +
        "INNER JOIN seat_availability AS sa ON fs.facility_seat_num = sa.facility_seat_num WHERE inf.facility_num = ?",[inner_facility_num],
        (err,result) => {
            if(err){
                console.log(err)
            }else{
                res.send(result);
            }
        }
    );
});

//관리자 전용 select
app.get('/dormitoryEdit',(req,res) => {
    let dormitory_num = req.query.dormitory_num;
    db.query(
        "SELECT * FROM dormitory AS dorm WHERE dorm.dormitory_num = ?",[dormitory_num],
        (err,result) => {
            if(err){
                console.log(err)
            }else{
                res.send(result);
            }
        }
    );
});

//생성 혹은 업데이트
app.post('/dormitoryUpdate',async(req,res) => {
    //let dormitoryPic = req.query.dormitory_pic
    let termsData = req.body.termsData;
    console.log(termsData);

    db.query(
        //나중에 사진도 추가
        "UPDATE dormitory AS dor SET dor.dormitory_name = ? WHERE dor.dormitory_num = ?",[termsData.dormitory_name,termsData.dormitory_num],
        (err,result) => {
            if(err){
                console.log(err)
            }else{
                res.send(result);
            }
        }
    );
});

app.post('/deleteFacility',async(req,res) => {
    //let dormitoryPic = req.query.dormitory_pic
    let termsData = req.body.termsData;
    console.log(termsData);

    db.query(
        //나중에 사진도 추가
        "DELETE FROM facility WHERE facility.facility_num = ?",[termsData.facility_num],
        (err,result) => {
            if(err){
                console.log(err)
            }else{
                res.send(result);
            }
        }
    );
});


app.get('/adminfacility',(req,res) => {
    let dormitory_num = req.query.dormitory_num;
    db.query(
        "SELECT * FROM facility AS fac WHERE fac.dormitory_num = ? ORDER BY fac.facility_name",[dormitory_num],
        (err,result) => {
            if(err){
                console.log(err)
            }else{
                res.send(result);
            }
        }
    );
});

app.get('/facilityEdit',(req,res) => {
    let facility_num = req.query.facility_num;
    db.query(
        "SELECT * FROM facility AS fac WHERE fac.facility_num = ? ORDER BY fac.facility_name",[facility_num],
        (err,result) => {
            if(err){
                console.log(err)
            }else{
                res.send(result);
            }
        }
    );
});

app.get('/adminfacilitySeat',(req,res) => {
    let facility_num = req.query.facility_num;
    db.query(
        "SELECT * FROM facility_seat AS facs WHERE facs.facility_num = ? GROUP BY facs.facility_seat_name ORDER BY facs.facility_seat_name",[facility_num],
        (err,result) => {
            if(err){
                console.log(err)
            }else{
                res.send(result);
            }
        }
    );
});

//생성 혹은 업데이트
app.post('/facilityUpdate',async(req,res) => {
    //let dormitoryPic = req.query.dormitory_pic
    let termsData = req.body.termsData;
    console.log(termsData);

    db.query(
        //나중에 사진도 추가
        "UPDATE facility AS fac SET fac.facility_name = ?,fac.facility_limit_people = ?,fac.facility_start_time = ?, fac.facility_end_time = ? WHERE fac.facility_num = ?",[termsData.facility_name, termsData.facility_limit_people, termsData.facility_start_time, termsData.facility_end_time, termsData.facility_num],
        (err,result) => {
            if(err){
                console.log(err)
            }else{
                res.send(result);
            }
        }
    );
});

app.post('/facilityInsert',async(req,res) => {
    //let dormitoryPic = req.query.dormitory_pic
    let termsData = req.body.termsData;
    console.log(termsData);

    db.query(
        //나중에 사진도 추가
        "INSERT INTO facility(facility_name,facility_limit_people,facility_start_time,facility_end_time,dormitory_num) VALUES(?,?,?,?,?)" ,[termsData.facility_name,termsData.facility_limit_people, termsData.facility_start_time, termsData.facility_end_time, termsData.dormitory_num],
        (err,result) => {
            if(err){
                console.log(err)
            }else{
                res.send(result);
            }
        }
    );
});

app.get('/innerFacilityNumName',async(req,res) => {
    db.query(
        "SELECT inner_facility_num, inner_facility_name FROM inner_facility;",
        (err,result) => {
            if(err){
                console.log(err)
            }else{
                res.send(result);
            }
        }
    );
});

app.get('/terms', async(req, res)=>{
    db.query(
        "SELECT terms_num, terms_title, terms_contents, terms_inner_facility_num, inner_facility_name, inner_facility_locate_name FROM ccd.terms LEFT JOIN ccd.inner_facility ON terms.terms_inner_facility_num = inner_facility.inner_facility_num;",
        (err, result)=>{
            if(err){
                console.log(err)
            }else{
                res.send(result);
            }
        }
    );
});

app.post('/termsEditSave', async (req, res)=>{
    const termsData = req.body.termsData;
    console.log(termsData);
    db.query(
        "INSERT INTO terms (terms_title, terms_contents, terms_inner_facility_num) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE terms_title = VALUES(terms_title), terms_contents = VALUES(terms_contents), terms_inner_facility_num = VALUES(terms_inner_facility_num);",
        [termsData.termsTitle, termsData.termsContents, termsData.termsFacility],
        (err, result)=>{
            if(err){
                console.log(err)
            }else{
                res.send(result);
            }
        }
    );
});

app.delete('/termsDelete', async (req, res)=>{
    const postTerms = req.body.terms_num;
    db.query(
        "DELETE FROM terms WHERE terms_num = ?;",
        [postTerms],
        (err, result)=>{
            if(err){
                console.log(err)
            }else{
                res.send(result);
            }
        }
    );
});

app.get('/notice', async(req, res)=>{
    db.query(
        "SELECT * FROM notice;",
        (err, result)=>{
            if(err){
                console.log(err)
            }else{
                res.send(result);
            }
        }
    );
});



app.delete('/noticeDelete', async(req, res)=>{
    const postNoticeNum = req.body.notice_num;
    db.query(
        "DELETE FROM notice WHERE notice_num = ?;",
        [postNoticeNum],
        (err, result)=>{
            if(err){
                console.log(err)
            }else{
                res.send(result);
            }
        }
    );
});

app.post('/noticeEditSave', async (req, res)=>{
    const noticeData = req.body.noticeData;
    console.log(noticeData);
    db.query(
        "INSERT INTO notice (notice_title, notice_contents) VALUES (?, ?) ON DUPLICATE KEY UPDATE notice_num = VALUES(noticeNum), notice_title = VALUES(notice_title), notice_contents = VALUES(notice_contents);",
        [noticeData.noticeTitle, noticeData.noticeContents],
        (err, result)=>{
            if(err){
                console.log(err)
            }else{
                res.send(result);
            }
        }
    );
})

app.listen(PORT,()=>{
    console.log(`yes,your server is running on port ${PORT}!`);
});



