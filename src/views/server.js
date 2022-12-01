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
        password: 'ql!@#$%qjs12',
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
            "SELECT student.*,dormitory_name,blacklist_num FROM student left outer join blacklist on blacklist.student_num=student.student_num join dormitory on dormitory.dormitory_num = student.dormitory order by student_id asc  "
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
            "SELECT student.*,dormitory_name,blacklist_num FROM student left outer join blacklist on blacklist.student_num=student.student_num join dormitory on dormitory.dormitory_num = student.dormitory  where dormitory.dormitory_num = (?) order by student_id asc"
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
            "SELECT student.*,dormitory_name,blacklist_num FROM student left outer join blacklist on blacklist.student_num=student.student_num join dormitory on dormitory.dormitory_num = student.dormitory and student_id like (?) order by student_id asc "
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
            "SELECT student.*,dormitory_name,blacklist_num FROM student left outer join blacklist on blacklist.student_num=student.student_num join dormitory on dormitory.dormitory_num = student.dormitory and student_id like (?)  where dormitory.dormitory_num = (?) order by student_id asc"
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

app.get('/facilityWithDormitory',(req,res) => {
    const dormitoryNum = req.query.dormitoryNum;
    db.query(
        "SELECT * FROM facility where dormitory_num = (?)",
        [dormitoryNum],
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
    const dormitory_num = req.query.dormitory_num;
    db.query(
        "SELECT * FROM facility where dormitory_num = (?)",
        // "SELECT * FROM facility",
        [dormitory_num],
        (err,result) => {
            if(err){
                console.log(err)
            }else{
                res.send(result);
            }
        }
    );
});
app.get('/facilitySeatTime', (req,res) => { // 일단 킵
    const facilityNum = req.query.facilityNum;
    db.query(

    )
});

app.get('/reservation', (req,res) => {
    const facility_num = req.query.facility_num;
    const start_time = req.query.start_time;
    const end_time = req.query.end_time;
    db.query(

    )
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
app.get('/facilityNumName',async(req,res) => {
    db.query(
        "SELECT facility_num, facility_name, dormitory_name FROM facility left join dormitory on facility.dormitory_num = dormitory.dormitory_num;",
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
        "SELECT terms_num, terms_title, terms_contents, terms_facility_num, facility_name , dormitory_name FROM ccd.terms LEFT JOIN ccd.facility ON terms.terms_facility_num = facility.facility_num LEFT JOIN ccd.dormitory on facility.dormitory_num = dormitory.dormitory_num;",
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
        "INSERT INTO terms (terms_title, terms_contents, terms_facility_num) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE terms_title = VALUES(terms_title), terms_contents = VALUES(terms_contents), terms_facility_num = VALUES(terms_facility_num);",
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



