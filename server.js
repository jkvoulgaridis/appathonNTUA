const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require('cors')
const axios = require('axios')


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true })) 
app.timeout = 0;
const mysql = require('mysql')
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'rootroot',
  database: 'CriteriaDB',
  insecureAuth : true
});


con.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

app.get("/", (req, res) => {
  res.json({ message: "Welcome to application." });
});

//test querry : con.querry('insert into CriteriaDb (Type,CriterionText,StudyId) values("ins", "text", 2mkj) ;' 

app.get("/test" ,(req,res) => {
	var querryToExec =  'insert into Criterion (Type,CriterionText,StudyId) values("ins", "text", "2mkj") ;'
  con.query(querryToExec ,(err,res) => {
    if(err) throw err;
  });
  res.json({querry : querryToExec , status : 'completed' });
});

app.post("/insert/" , (req,res) => {
    var type = req.body.type
    var main_txt = req.body.criteriaTXT
    var studyId = req.body.studyID
    console.clear()
    console.log(`got type = ${type} , text = ${main_txt} , studyId = ${studyId}`)
    var querryToExec = `INSERT INTO Criterion (Type,CriterionText,StudyId) VALUES ("${type}", "${main_txt}", "${studyId}")`
    con.query(querryToExec ,(err,res) => {
    if(err) {
      console.log('exception thrown from /insert/ endpoint')
      res.send('400')
    }
    });
    res.send('200')
});

app.listen(3000, () => {
  console.log("Server up and Running :D");
});

