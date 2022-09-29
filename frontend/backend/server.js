
var MongoClient = require('mongodb').MongoClient;
var express = require('express');
var app = express();
var cors = require('cors');
const bodyParser = require('body-parser');



app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

var url = 

app.use(express.static('./build'));

app.get('/', (req, res) => {
  res.sendFile(__dirname+'/build/index.html');
})

app.get('/server.js', (req, res) => {
  res.send("not found");
})

app.get('/nav', (req, res) => {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("ecommerce");
    dbo.collection("nav").find({}).toArray(function(err, result) {
      if (err) throw err;
      
      if(result.length === 0){
       
        res.send("null");
        console.log(result);
      }
      else{
        res.send(result);
        
      }
      
      db.close();
    });
  });


  });

app.post('/cateogries', function(req, res) {


  
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("ecommerce");
    dbo.collection(req.body.data).find({}).toArray(function(err, result) {
      if (err) throw err;
      
      if(result.length === 0){
       
        res.send("null");
        
      }
      else{
        res.send(result);
        
      }
      
      db.close();
    });
  });


  });




  

  

  app.post('/data1', function(req, res) {


  
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("ecommerce");
      dbo.collection(req.body.data).findOne({}, function(err, result) {
        if (err) {
          console.log({error: err});
        }
        else{
        console.log(result);
        console.log(req.body.data);
        if(result === null){
          res.send("null");
        }
        else{
          res.send(result);
        }
      }
        
        db.close();
      });
    });
  
  
    });


    app.get('/sliderget', function (req, res) {

      MongoClient.connect(url, function(err, db) {
          if (err) throw err;
          var dbo = db.db("ecommerce");
          dbo.collection("slider").find({}).toArray(function(err, result) {
            if (err) throw err;
            if(result.length === 0){
              res.send({code: "null"})
            }
            else{
            res.send(result);
            }
            db.close();
          });
        });
  
     
    });



    app.post('/login', function(req, res) {


  console.log(req.body);

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("ecommerce");
    dbo.collection("frontendlogins").findOne({"_id":req.body._id, "password": req.body.password}, function(err, result) {
      if (err) throw err
      if(result=== null){
        res.send({code:null});
      }
      else{
        res.send({code:"ok", name:result.name, phonenumber:result.phonenumber})
      }
      
      db.close();
    });
  });
     
    
      });


      app.post('/checkoutdata', function(req, res) {
console.log(req.body);


      })
  



    app.get('*', (req, res) => {
      res.sendFile(__dirname + '/build/index.html');
    })


app.listen(process.env.PORT || 8000);