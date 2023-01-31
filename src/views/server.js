const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const bodyParser = require("body-parser");
const mysql = require('mysql');
const cors = require('cors');
const multer = require("multer");
const path = require("path");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

const db = mysql.createConnection(
    {
        user: 'root',
        host:'localhost',
        password: '910su147!A',
        database: 'ccd',
        dateStrings: 'date'
    }
);

const storage = multer.diskStorage({
    destination: ".././assets/img/kumoh/",
    filename: function(req, file, cb) {
        cb(null, "imgfile" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 10000000000000 }
});

const conn = db.connect();

setInterval(function () {
    const current = new Date();
    const curHour = current.getHours();
    const curMin = current.getMinutes();

    if(curMin==0){
        console.log("curMin is 0, updating seat_availability_status");
        db.query("UPDATE ccd.seat_availability SET ccd.seat_availability.seat_availability_status = \"사용 가능\" where date_format(ccd.seat_availability.seat_availability_end_time, \"%H\") = date_format(curtime(), \"%H\")",
            (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("end_time: "+curHour+" seat_availability_status update!");
                    console.log(result);
                }
            }
        )
    }
}, 60000);

app.post("/upload", upload.single("img"), function(req, res, next) {
    res.send({
        fileName: req.file.filename,
        filePath: req.file.filePath
    });
});

app.get('/studentDormitoryName',(req,res) => {
    const dormitoryNum = req.query.dormitoryNum;
    db.query(
        "SELECT dormitory_name FROM dormitory WHERE dormitory_num = ?",
        [dormitoryNum],
        function (err, result) {
            if(err){
                console.log(err)
            }else{
                res.send(result);
            }
        }
    )
});

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

app.delete('/deleteAllStudents',async(req,res) => {
    db.query(
        "DELETE FROM student",
        (err,result) => {
            if(err){
                console.log(err)

            }else{
                console.log("삭제 성공")
                res.send(result);
            }
        }
    );
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
});
app.get("/duplicateSeatName",async(req,res)=>{
    const facility_seat_name = req.query.facility_seat_name;
    const facility_num = req.query.facility_num;
    db.query(
        "SELECT facility_seat.facility_seat_name FROM facility_seat where facility_seat_name = (?) AND facility_num =(?)"
        ,[facility_seat_name,facility_num],
        function(err,result){
            if(err){
                console.log(err)
            }else{
                console.log(result);
                res.send(result);
            }
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

app.post("/addExelStudent", async (req, res) => {

        const ExcelData = req.body.ExcelData;
        let index = -3;
        let cnt = 0;
        for (;cnt < parseInt(ExcelData.length / 3); cnt++) {
            index = index + 3;
            await db.query(
                "INSERT INTO student (student_id,dormitory,student_password) values (?,?,?),(?,?,?),(?,?,?)",
                [ExcelData[index].학번, ExcelData[index].생활관, ExcelData[index].비밀번호,
                    ExcelData[index + 1].학번, ExcelData[index + 1].생활관, ExcelData[index + 1].비밀번호,
                    ExcelData[index + 2].학번, ExcelData[index + 2].생활관, ExcelData[index + 2].비밀번호],
                function (err) {
                    if (err) {
                        console.log(err)
                        throw err;
                    } else {
                        console.log("입력 성공");
                    }
                    ;
                });

        }
        if(cnt === parseInt(ExcelData.length / 3)){
        for (let remain = index + 3; remain < ExcelData.length; remain++) {
            await db.query(
                "INSERT INTO student (student_id,dormitory,student_password) values (?,?,?)",
                [ExcelData[remain].학번, ExcelData[remain].생활관, ExcelData[remain].비밀번호],
                function (err) {
                    if (err) {
                        console.log(err)
                        throw err;
                    } else {
                        console.log("입력 성공");
                    }
                    ;
                });

        }
    }
}
);

app.post("/UpdateStudent", (req,res)=>{
    const postStudentId = req.body.studentId;
    const postStudentDormitory = req.body.studentDormitory;
    const postStudentPassword = req.body.studentPwd;
    const postStudentNum = req.body.studentNum;
    db.query(
        "UPDATE student SET student_id = (?), dormitory = (?),student_password = (?) where student_num = (?)  "
        ,[postStudentId,postStudentDormitory,postStudentPassword,postStudentNum],
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

app.post("/banClear", (req,res)=>{
    const banClearStudentNum = req.body.banStudentNum;

    db.query(
        "DELETE FROM blacklist where blacklist_num = (?) "
        ,[banClearStudentNum],
        function(err){
            if(err){
                console.log(err)
                throw err;
            }else{
                console.log("성공");
            };
        });
});

app.post("/autoBanClear", (req,res)=>{
    const postEndDate = req.body.postEndDate;

    db.query(
        "DELETE FROM blacklist where end_date = (?) "
        ,[postEndDate],
        function(err){
            if(err){
                console.log(err)
                throw err;
            }else{
                console.log("성공");
            };
        });
});

app.post("/autoIncreaseInitialize", (req,res)=>{
    db.query(
        "ALTER TABLE student auto_increment = 1",
        (err,result) => {
            if(err){
                console.log(err)
            }else{
                console.log("초기화성공");
                res.send(result)
            }
})});

app.post("/deleteStudent", (req,res)=>{
    const postStudentId = req.body.postStudentNum;

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
    if(req.query.postStudentId==undefined&&(req.query.postOptionValue==0||req.query.postOptionValue==undefined)){
        db.query(
            "SELECT student.*,dormitory_name,blacklist_num FROM student left outer join blacklist on blacklist.student_num=student.student_num join dormitory on dormitory.dormitory_num = student.dormitory order by student_id asc"
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
            "SELECT student.*,dormitory_name,blacklist_num FROM student left outer join blacklist on blacklist.student_num=student.student_num join dormitory on dormitory.dormitory_num = student.dormitory  where dormitory.dormitory_num = (?) order by student_id asc "
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
            "SELECT student.*,dormitory_name,blacklist_num FROM student left outer join blacklist on blacklist.student_num=student.student_num join dormitory on dormitory.dormitory_num = student.dormitory and student_id like (?) order by student_id asc"
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
            "SELECT student.*,dormitory_name,blacklist_num FROM student left outer join blacklist on blacklist.student_num=student.student_num join dormitory on dormitory.dormitory_num = student.dormitory and student_id like (?)  where dormitory.dormitory_num = (?) order by student_id asc "
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

app.get('/getImageDormitory', async(req, res)=>{
    const DormitoryNum = req.query.postDormitoryNum
    db.query(
        "SELECT dormitory_pic FROM dormitory where dormitory_num = (?)",
        [DormitoryNum],
        (err, result)=>{
            if(err){
                console.log(err)
            }else{
                res.send(result);
            }
        }
    );
});
app.get('/getImageFacility', async(req, res)=>{
    const FacilityNum = req.query.postFacilityNum;
    db.query(
        "SELECT facility_pic FROM facility where facility_num = (?)",
        [FacilityNum],
        (err, result)=>{
            if(err){
                console.log(err)
            }else{
                res.send(result);
            }
        }
    );
});

app.get("/signInByAdmin", async (req,res)=>{
    const postAuthId = req.query.postAdminId;
    const postAuthPassword = req.query.postAdminPassword;
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

app.get("/signInByStudent", async (req,res)=>{
    const postAuthId = req.query.postStudentId;
    const postAuthPassword = req.query.postStudentPassword;
    db.query(
        "SELECT * FROM student where student_id=(?) and student_password=(?) ;"
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

app.get('/facilityPopulation',(req,res) => {
    const facilityNum = req.query.facilityNum;
    db.query(
        "SELECT count(*) FROM ccd.reservation where res_facility_num = ? and date_format(record_date, \"%Y-%M-%D\") = date_format(curdate(), \"%Y-%M-%D\") and start_time < curtime() and end_time > curtime()",
        [facilityNum],
        (err,result) => {
            if(err){
                console.log(err)
            }else{
                res.send(result);
            }
        }
    );
});


app.post('/reservation', (req,res) => {
    const postData = req.body.params;
    console.log(postData);
    db.query(
        "INSERT INTO reservation(student_num, start_time, end_time, record_date, reservation_status, seat_availability_num, student_temperature, res_facility_num) VALUES (?,?,?,?,?,?,?,?)",
        [postData.studentNum, postData.startTime, postData.endTime, postData.recordTime, postData.reservationStatus, postData.seatAvailabilityNum, postData.temp, postData.facilityNum],
        function (err, result) {
            if (err) {
                console.log(err)
            } else {
                res.send(result);
            }
        }
    );
});

app.get('/hasReservation', (req,res) => {
    const studentNum = req.query.studentNum;
    const startTime = req.query.startTime;
    const endTime = req.query.endTime;
    // const seatAvailabilityNum = req.query.seatAvailabilityNum;
    db.query(
        "SELECT count(*) FROM ccd.reservation where date_format(record_date, \"%Y-%M-%D\") = date_format(curdate(), \"%Y-%M-%D\")  and student_num = (?) and start_time = (?) and end_time = (?) and reservation_status != \"예약 취소\""
        ,[studentNum, startTime, endTime],
        function (err, result) {
            if(err){
                console.log(err)
            }else{
                res.send(result);
                // res.send(parseInt(result[0]['count(*)']));
            }
        }
    );
});

app.get('/getMyCurReservation', (req,res) => {
    const studentNum = req.query.studentNum;
    db.query(
        "SELECT * FROM ccd.reservation where student_num = ? and date_format(record_date, \"%Y-%M-%D\") = date_format(curdate(), \"%Y-%M-%D\") and start_time < curtime() and end_time > curtime() and reservation_status = \"예약\"",
        [studentNum],
        function (err, result) {
            if(err){
                console.log(err)
            }else{
                res.send(result);
            }
        }
    )
});

app.get('/getMyReservationList', (req,res) => {
    const studentNum = req.query.studentNum;
    db.query(
        "SELECT * FROM reservation where student_num = ? and date_format(record_date, \"%Y-%M-%D\") = date_format(curdate(), \"%Y-%M-%D\") and end_time > curtime()",
        [studentNum],
        function (err, result) {
            if(err){
                console.log(err)
            }else{
                res.send(result);
            }
        }
    )
});

app.post('/cancelReservation', (req,res) => {
    const postData = req.body.params;
    console.log("reservation cancel request");
    db.query(
        "UPDATE reservation SET reservation_status = \"예약 취소\" WHERE reservation_num = ?",
        [postData.reservationNum],
        function (err, result) {
            if(err){
                console.log(err);
            }else{
                console.log("reservation cancel success!");
                res.send(result);
            }
        }
    )
});

app.post('/updateSeatAvailabilityStatus', (req,res) => {
    const postData = req.body.params;
    db.query(
        "UPDATE seat_availability SET seat_availability_status = \"사용 가능\" WHERE seat_availability_num = ?",
        [postData.seatAvailabilityNum],
        function (err, result) {
            if(err){
                console.log(err)
            }else{
                res.send(result);
            }
        })
});

app.get('/isBlacked', (req,res) => {
    const studentNum = req.query.studentNum;
    const currentDate = req.query.currentDate;
    db.query(
        "SELECT count(*) FROM ccd.blacklist where student_num = (?) and end_date > (?)",
        [studentNum, currentDate],
        function (err, result) {
            if(err){
                console.log(err)
            }else{
                res.send(result);
            }
        }
    );
});
app.get('/getMyCurReservation', (req,res) => {
    const studentNum = req.query.studentNum;
    db.query(
        "SELECT * FROM reservation where student_num = ? and date_format(record_date, \"%Y-%M-%D\") = date_format(curdate(), \"%Y-%M-%D\") and start_time < curtime() and end_time > curtime()",
        [studentNum],
        function (err, result) {
            if(err){
                console.log(err)
            }else{
                res.send(result);
            }
        }
    )
});
app.get('/isBlackedProfile', (req,res) => {
    const studentNum = req.query.studentNum;
    const currentDate = req.query.currentDate;
    db.query(
        "SELECT count(*) FROM ccd.blacklist where student_num = (?) and date_format(end_date, \"%Y-%M-%D\")> date_format(curdate(), \"%Y-%M-%D\")",
        [studentNum, currentDate],
        function (err, result) {
            if(err){
                console.log(err)
            }else{
                res.send(result);
            }
        }
    );
});
app.get('/getMyReservationList', (req,res) => {
    const studentNum = req.query.studentNum;
    db.query(
        "SELECT * FROM reservation where student_num = ? and date_format(record_date, \"%Y-%M-%D\") = date_format(curdate(), \"%Y-%M-%D\") and end_time > curtime()",
        [studentNum],
        function (err, result) {
            if(err){
                console.log(err)
            }else{
                res.send(result);
            }
        }
    )
});

app.get('/selectReservationStudentList',(req,res)=>{
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    db.query(
        "select st.student_id, res.start_time, res.end_time, res.record_date, " +
        "res.reservation_status, fs.facility_seat_name, fa.facility_name, res.student_temperature " +
        "from reservation as res left join seat_availability as sa on res.seat_availability_num = sa.seat_availability_num " +
        "left join facility_seat as fs on sa.facility_seat_num = fs.facility_seat_num " +
        "left join student as st on res.student_num = st.student_num left join facility as fa on fs.facility_num = fa.facility_num " +
        "where res.record_date >= (?) and res.record_date <=(?)",[startDate,endDate],
        function (err, result) {
            if(err){
                console.log(err);
            }else{
                res.send(result);
            }
        }
    )
});

app.post('/updateSeatAvailabilityStatusAble', (req,res) => {
    const postData = req.body.params;
    db.query(
        "UPDATE seat_availability SET seat_availability_status = \"사용 가능\" WHERE seat_availability_num = ?",
        [postData.seatAvailabilityNum],
        function (err, result) {
            if(err){
                console.log(err)
            }else{
                console.log("update Seat Availability Status to Able!");
                res.send(result);
            }
        })
});

app.get('/getBlacklistEndDate', (req,res) => {
    const studentNum = req.query.studentNum;
    db.query(
        "SELECT start_date, end_date FROM ccd.blacklist where student_num = (?)",
        [studentNum],
        function (err, result) {
            if(err){
                console.log(err)
            }else{
                res.send(result);
            }
        }
    );
});

app.post('/updateSeatAvailabilityStatusDisable', (req,res) => {
    const postData = req.body.params;
    db.query(
        "UPDATE seat_availability SET seat_availability_status = (?) WHERE seat_availability_num = (?)",
        [postData.seatAvailabilityStatus, postData.seatAvailabilityNum],
        function (err, result) {
            if(err){
                console.log(err)
            }else{
                res.send(result);
            }
        }
    );
});

app.post('/insertNotice', async (req, res)=>{
    const noticeData = req.body.noticeData;
    db.query(
        "INSERT INTO notice (notice_title, notice_contents) VALUES (?, ?);",
        [noticeData.noticeTitle, noticeData.noticeContents],
        function (err, result) {
            if(err){
                console.log(err)
            }else{
                res.send(result);
            }
        }
    )
});

app.post('/updateNotice', async (req, res)=>{
    const noticeData = req.body.noticeData;
    db.query(
        "UPDATE notice SET notice_title = ?, notice_contents = ? WHERE notice_num = ?;",
        [noticeData.noticeTitle, noticeData.noticeContents, noticeData.noticeNum],
        function (err, result) {
            if(err){
                console.log(err)
            }else{
                res.send(result);
            }
        }
    )
});

app.get('/getLatestNotice', async (req, res)=>{
    db.query(
        "SELECT * FROM notice ORDER BY notice_num DESC LIMIT 1;",
        function(err, result){
            if(err){
                console.log(err)
            }else{
                res.send(result);
            }
        }
    );
});

app.get('/facilityTimeList', (req,res) => {
    const facilityNum = req.query.facilityNum;
    db.query(
        "SELECT seat_availability_start_time, seat_availability_end_time FROM ccd.seat_availability left join facility_seat on seat_availability.facility_seat_num = facility_seat.facility_seat_num left join facility on facility.facility_num = facility_seat.facility_num where facility.facility_num = (?) GROUP BY seat_availability_start_time, seat_availability_end_time;",
        [facilityNum],
        (err,result) => {
            if(err){
                console.log(err)
            }else{
                res.send(result);
            }
        }
    )
});

app.get('/facilitySeatList', (req,res) => {
    const facilityNum = req.query.facilityNum;
    db.query(
        "SELECT seat_availability_num, seat_availability_start_time, seat_availability_end_time, facility_seat_status, fs.facility_seat_num, fs.facility_seat_name, fs.facility_num FROM ccd.seat_availability as sa left join facility_seat as fs on fs.facility_seat_num = sa.facility_seat_num where fs.facility_num = (?)",
        [facilityNum],
        (err,result) => {
            if(err){
                console.log(err)
            }else{
                res.send(result);
            }
        }
    )
});

app.get('/getSeatsByTimes', (req,res) => {
    const  startTime = req.query.startTime;
    const endTime = req.query.endTime;
    const facilityNum = req.query.facilityNum;
    db.query(
        "SELECT seat_availability_num, seat_availability_start_time, seat_availability_end_time, seat_availability_status, facility_seat_name FROM ccd.seat_availability as sa left join facility_seat as fs on sa.facility_seat_num = fs.facility_seat_num left join facility as f on fs.facility_num = f.facility_num where f.facility_num = (?) and sa.seat_availability_start_time = (?) and sa.seat_availability_end_time = (?)",
        [facilityNum,startTime,endTime],
        (err,result) => {
            if(err){
                console.log(err)
            }else{
                res.send(result);
            }
        }
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

app.get('/getFacilityName', async(req, res)=>{
    const facilityNum = req.query.facilityNum;
    db.query(
        "SELECT facility_name FROM facility WHERE facility_num = ?",
        [facilityNum],
        (err, result)=>{
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
        "SELECT terms_num, terms_title, terms_contents, terms_facility_num, facility_name , dormitory_name FROM ccd.terms LEFT JOIN ccd.facility ON terms.terms_facility_num = facility.facility_num LEFT JOIN ccd.dormitory on facility.dormitory_num = dormitory.dormitory_num ORDER BY dormitory_name ASC;",
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
        "INSERT INTO terms (terms_num, terms_title, terms_contents, terms_facility_num) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE terms_title = ?, terms_contents = ?, terms_facility_num =?;",
        [termsData.termsNum, termsData.termsTitle, termsData.termsContents, termsData.termsFacility, termsData.termsTitle, termsData.termsContents, termsData.termsFacility],
        (err, result)=>{
            if(err){
                console.log(err)
            }else{
                res.send(result);
            }
        }
    );
});

app.post('/insertTerms', async (req, res)=>{
    const termsData = req.body.termsData;
    db.query(
        "INSERT INTO terms (terms_title, terms_contents, terms_facility_num) VALUES (?, ?, ?);",
        [termsData.termsTitle, termsData.termsContents, termsData.termsFacility],
        function(err, result){
            if(err){
                console.log(err)
            }else{
                res.send(result);
            }
        }
    );
});

app.post('/insertDefaultTerms', async (req, res)=>{
    const termsData = req.body.termsData;
    db.query(
        "INSERT INTO terms (terms_title, terms_contents, terms_facility_num) VALUES (?, ?, ?);",
        [termsData.termsTitle, termsData.termsContents, termsData.termsFacility],
        function(err, result){
            if(err){
                console.log(err)
            }else{
                res.send(result);
            }
        }
    );
});

app.post('/updateTerms', async (req, res)=>{
    const termsData = req.body.termsData;
    db.query(
        "UPDATE terms SET terms_title = ?, terms_contents = ?, terms_facility_num = ? WHERE terms_num = ?;",
        [termsData.termsTitle, termsData.termsContents, termsData.termsFacility, termsData.termsNum],
        function(err, result){
            if(err){
                console.log(err)
            }else{
                res.send(result);
            }
        }
    );
})

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

app.get('/termsPaging', async (req, res)=>{
    const page = req.query.curPage;
    const limit = parseInt(req.query.limit);
    const offset = (page -1) * limit;
    db.query(
        "SELECT terms_num, terms_title, terms_contents, terms_facility_num, facility_name , dormitory_name FROM ccd.terms LEFT JOIN ccd.facility ON terms.terms_facility_num = facility.facility_num LEFT JOIN ccd.dormitory on facility.dormitory_num = dormitory.dormitory_num ORDER BY dormitory_name ASC LIMIT ? OFFSET ?;",
        [limit, offset],
        (err, result)=>{
            if(err){
                console.log(err)
            }else{
                res.send(result);
            }
        }
    );
});

app.get('/countTerms', async (req, res)=>{
    db.query(
        "SELECT COUNT(*) AS count FROM terms;",
        (err, result)=>{
            if(err){
                console.log(err)
            }else{
                res.send(result);
            }
        }
    );
});

app.get('/getTermsByFacilityNum', async (req, res)=>{
    const facilityNum = req.query.facilityNum;
    db.query(
        "SELECT * FROM terms WHERE terms_facility_num = (?);",
        [facilityNum],
        (err, result)=>{
            if(err){
                console.log(err)
            }else{
                res.send(result);
            }
        })
});

app.get('/getMaxPkFromFacility', async (req, res)=>{
    db.query(
        "SELECT MAX(facility_num) AS lastFacilityNum FROM ccd.facility;",
        (err, result)=>{
            if(err){
                console.log(err)
            }else{
                res.send(result);
                console.log("마지막 facility_num : " + result);
            }
        }
    );
});

// app.get('/notice', async(req, res)=>{
//     db.query(
//         "SELECT * FROM notice;",
//         (err, result)=>{
//             if(err){
//                 console.log(err)
//             }else{
//                 res.send(result);
//             }
//         }
//     );
// });
//
// app.delete('/noticeDelete', async(req, res)=>{
//     const postNoticeNum = req.body.notice_num;
//     db.query(
//         "DELETE FROM notice WHERE notice_num = ?;",
//         [postNoticeNum],
//         (err, result)=>{
//             if(err){
//                 console.log(err)
//             }else{
//                 res.send(result);
//             }
//         }
//     );
// });
//
// app.post('/noticeEditSave', async (req, res)=>{
//     const noticeData = req.body.noticeData;
//     console.log(noticeData);
//     db.query(
//         "INSERT INTO notice (notice_title, notice_contents) VALUES (?, ?) ON DUPLICATE KEY UPDATE notice_num = VALUES(noticeNum), notice_title = VALUES(notice_title), notice_contents = VALUES(notice_contents);",
//         [noticeData.noticeTitle, noticeData.noticeContents],
//         (err, result)=>{
//             if(err){
//                 console.log(err)
//             }else{
//                 res.send(result);
//             }
//         }
//     );
// });

app.get('/notice', async(req, res)=>{
    db.query(
        "SELECT * FROM notice ORDER BY notice_date DESC;",
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

app.get('/countNotice', async (req, res)=>{
    db.query(
        "SELECT count(*) FROM ccd.notice;",
        (err, result)=>{
            if(err){
                console.log(err)
            }else{
                res.send(result);
            }
        }
    );
});

app.get('/noticePaging', async (req, res)=>{
    const page = req.query.curPage;
    const limit = parseInt(req.query.limit);
    const offset = (page - 1) * limit;
    db.query(
        "SELECT * FROM notice ORDER BY notice_date DESC LIMIT ? OFFSET ?;",
        [limit, offset],
        (err, result)=>{
            if(err){
                console.log(err)
            }else{
                res.send(result);
            }
        }
    );
});

// app.post('/noticeEditSave', async (req, res)=>{
//     const noticeData = req.body.noticeData;
//     const curDate = new Date();
//     const lastModifiedDate = curDate.getFullYear() + "-" + (curDate.getMonth() + 1) + "-" + curDate.getDate();
//     console.log(noticeData);
//     db.query(
//         "INSERT INTO notice (notice_num, notice_title, notice_contents, notice_writer, notice_date) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE notice_title = ?, notice_contents = ?;",
//         [noticeData.noticeNum, noticeData.noticeTitle, noticeData.noticeContents, noticeData.noticeTitle, noticeData.noticeWriter, lastModifiedDate],
//         (err, result)=>{
//             if(err){
//                 console.log(err)
//             }else{
//                 res.send(result);
//             }
//         }
//     );
// })

app.post('/noticeCreate', async (req, res)=>{
    const noticeData = req.body.noticeData;
    console.log(noticeData);
    const curDate = new Date();
    const lastModifiedDate = curDate.getFullYear() + "-" + (curDate.getMonth() + 1) + "-" + curDate.getDate();
    db.query(
        "INSERT INTO notice (notice_title, notice_contents, notice_writer, notice_date) VALUES (?, ?, ?, ?);",
        [noticeData.noticeTitle, noticeData.noticeContents, noticeData.noticeWriter, lastModifiedDate],
        (err, result)=>{
            if(err){
                console.log(err)
            }else{
                res.send(result);
            }
        }
    );
})

app.post('/noticeUpdate', async (req, res)=>{
    const noticeData = req.body.noticeData;
    console.log(noticeData);
    const curDate = new Date();
    const lastModifiedDate = curDate.getFullYear() + "-" + (curDate.getMonth() + 1) + "-" + curDate.getDate();
    db.query(
        "UPDATE notice SET notice_title = ?, notice_contents = ?, notice_writer = ?, notice_date = ? WHERE notice_num = ?;",
        [noticeData.noticeTitle, noticeData.noticeContents, noticeData.noticeWriter, lastModifiedDate, noticeData.noticeNum],
        (err, result)=>{
            if(err){
                console.log(err)
            }else{
                res.send(result);
            }
        }
    );
})

app.post('/facilitySeatUpdate',async(req,res) => {
    let termsData = req.body.termsData;

    db.query(
        //나중에 사진도 추가
        "UPDATE facility_seat AS facs SET facs.facility_seat_name = ?, facs.facility_seat_status = ?" +
        " WHERE facs.facility_seat_num = ?",[termsData.facility_seat_name, termsData.facility_seat_status, termsData.facility_seat_num],
        (err,result) => {
            if(err){
                console.log(err)
            }else{
                res.send(result);
            }
        }
    );
});
app.delete('/facilitySeatDelete', async(req, res)=>{
    const facility_seat_num = req.body.facility_seat_num;
    db.query(
        "DELETE FROM facility_seat WHERE facility_seat_num = ?",
        [facility_seat_num],
        (err, result)=>{
            if(err){
                console.log(err)
            }else{
                res.send(result);
            }
        }
    );
});
app.get('/getFacilitySeatNum',async(req,res) => {
    let facility_seat_name = req.query.facility_seat_name;
    let facility_num = req.query.facility_num;

    db.query(
        "SELECT facs.facility_seat_num FROM facility_seat AS facs WHERE facs.facility_seat_name = ? AND facs.facility_num = ?",[facility_seat_name,facility_num],
        (err,result) => {
            if(err){
                console.log(err)
            }else{
                res.send(result);
            }
        }
    );
});

app.get('/getFacilitySeatName', async(req, res)=>{
    const seat_availability_num = req.query.seat_availability_num;
    db.query(
        "SELECT facility_seat_name FROM ccd.facility_seat where facility_seat_num = (SELECT facility_seat_num FROM ccd.seat_availability where seat_availability_num = ?)",
        [seat_availability_num],
        (err, result)=>{
            if(err){
                console.log(err)
            }else{
                res.send(result);
            }
        }
    );
});

app.get('/getFacilitySeatNumList',async(req,res) => {
    let facility_num = req.query.facility_num;

    db.query(
        "SELECT facs.facility_seat_num FROM facility_seat AS facs WHERE facs.facility_num = ?",[facility_num],
        (err,result) => {
            if(err){
                console.log(err)
            }else{
                res.send(result);
            }
        }
    );
});
app.post('/facilitySeatInsert',async(req,res) => {

    let termsData = req.body.termsData;
    let seatnum = "";

    db.query(
        //나중에 사진도 추가
        "INSERT INTO facility_seat(facility_seat_name,facility_num,facility_seat_status) VALUES(?,?,?)" ,[termsData.facility_seat_name, termsData.facility_num, termsData.facility_seat_status],
        function (err,result) {
            if (err) {
                // handle error
            }else{
                // Your row is inserted you can view
                console.log(result.insertId);
                res.send(result);
            }
        }
    );
});

app.post('/facilitySeatAvailabilityInsert',async(req,res) => {
    let termsData = req.body.termsData;
    db.query(
        //나중에 사진도 추가
        "INSERT INTO seat_availability(seat_availability_start_time,seat_availability_end_time,facility_seat_num,seat_availability_status) VALUES(?,?,?,?) " ,[termsData.facility_start_time, termsData.facility_end_time, termsData.facility_seat_num, termsData.seat_availability_status],
        (err,result) => {
            if(err){
                console.log(err)
            }else{
                res.send(result);
            }
        }
    );
});
app.delete('/facilitySeatAvailabilityDelete',async(req,res) => {
    let facility_seat_num = req.body.facility_seat_num;
    db.query(
        //나중에 사진도 추가
        "DELETE FROM seat_availability WHERE facility_seat_num = ?",[facility_seat_num],
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
        "UPDATE dormitory AS dor SET dor.dormitory_name = ?,dor.dormitory_pic = ? WHERE dor.dormitory_num = ?",[termsData.dormitory_name,termsData.dormitory_pic,termsData.dormitory_num],
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
        "UPDATE facility AS fac SET fac.facility_name = ?,fac.facility_limit_people = ?,fac.facility_start_time = ?, fac.facility_end_time = ?,fac.facility_pic = ? WHERE fac.facility_num = ?",[termsData.facility_name, termsData.facility_limit_people, termsData.facility_start_time, termsData.facility_end_time, termsData.facility_pic,termsData.facility_num],
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
        "INSERT INTO facility(facility_name,facility_limit_people,facility_start_time,facility_end_time,dormitory_num,facility_pic) VALUES(?,?,?,?,?,?)" ,[termsData.facility_name,termsData.facility_limit_people, termsData.facility_start_time, termsData.facility_end_time, termsData.dormitory_num,termsData.facility_pic],
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


