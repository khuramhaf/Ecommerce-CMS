
var express = require('express');
var app = express();
var cors = require('cors');
const bodyParser = require('body-parser');
var ObjectId = require('mongodb').ObjectId;

const multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'images/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '.jpg') //Appending .jpg
      console.log(file);
    }
  })
  
  var upload = multer({ storage: storage });



app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

var ObjectId = require('mongodb').ObjectId;
var MongoClient = require('mongodb').MongoClient;
var db;

var url = 


// Initialize connection once
MongoClient.connect(url, function(err, database) {
  if(err) throw err;

  db = database;

  // Start the application after the database connection is ready
  app.listen(process.env.PORT || 9000);
  console.log("Listening on port 8000");
});

process.on('SIGINT', function() {
  db.close();
    
    console.log("db has closed");
    process.exit(0);
  
});


process.on('beforeExit', (code) => {
  db.close();
  console.log('Process beforeExit event with code: ', code);
});



app.use(express.static('./build'));

app.get('/', (req, res) => {
  res.sendFile(__dirname+'/build/index.html');
})

app.get('/server.js', (req, res) => {
  res.send("not found");
})

app.post('/navadd', (req, res) => {
  
    var dbo = db.db("ecommerce");
    

    dbo.createCollection(req.body.data, function(err, resp) {
      if (err) {
        res.send(err);
      }

      else {
        var myobj = { cname: req.body.data };
        dbo.collection("nav").insertOne(myobj, function(err, resp) {
          console.log("cateogry is added");
          res.send({status: "ok"});
        });

      }
      
    });
  });




app.post('/prodadd',upload.single('image'), (req, res) => {
 
    var dbo = db.db("ecommerce");
    var myobj = { _id: req.body._id, image:req.body.imageurl, price:req.body.price,
    
    productname: req.body.productname, quantity:req.body.quantity};

    dbo.createCollection(req.body._id, function(err, resp) {
      if (err) {
        res.send(err)
       }

       else {
         console.log("collection is successfully created");
        dbo.collection(req.body.cat).insertOne(myobj, function(err, resp) {
          console.log("product is added in main cateogery");

          });

          dbo.collection(req.body._id).insertOne(myobj, function(err, resp) {
            console.log("product is added in main collection");
            res.send({code: "ok"});
     
          });

       }

      })
});



app.get('/catget', function(req, res) {

    var dbo = db.db("ecommerce");
    dbo.collection("nav").find({}).toArray(function(err, result) {
      if (err) throw err;
      
    
        res.send(result);
        
      
      
     
    });
  });



  app.post('/delcat', function(req, res) {
    
   
      var dbo = db.db("ecommerce");
      dbo.collection(req.body.cat).find({}).toArray(function(err, result) {
        if (err) throw err;
        
        if(result.length === 0){
         
          
          
        }
        else{
var x = 0;
          while (x<result.length){
            dbo.collection(result[x]._id).drop(function(err, delOK) {
              if (err) throw err;
              if (delOK) console.log("Collection deleted x");
              });
        
              x++;
          }
             
          }

          dbo.collection(req.body.cat).drop(function(err, delOK) {
            if (err) throw err;
            if (delOK) console.log("Collection deleted y");
            var myquery = { cname: req.body.cat };
            dbo.collection("nav").deleteOne(myquery, function(err, obj) {
              if (err) throw err;
              console.log("1 document deleted");
              res.send({code: "ok"});
              
              
            });
          
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
          
        });
      });
    
    
      });



      app.post('/delprod', function(req, res) {

        var dbo = db.db("ecommerce");
        var myquery = { _id: req.body._id };
        dbo.collection(req.body.cname).deleteOne(myquery, function(err, obj) {
          if (err) throw err;
          console.log("1 document deleted");
          res.send({code: "ok"});
        })
        dbo.collection(req.body._id).drop(function(err, delOK) {
          if (err) throw err;
          if (delOK) console.log("Collection deleted y");
        })

        });


        app.post('/slideradd',upload.single('image'), (req, res) => {
 
          var dbo = db.db("ecommerce");
          var myobj = {image:req.body.imageurl};
      
              dbo.collection("slider").insertOne(myobj, function(err, resp) {
                console.log("product is added in main cateogery");
                res.send({code: "ok"});
      
                });
              })


              app.post('/delslider', function(req, res) {

                var dbo = db.db("ecommerce");
                
                console.log(req.body._id);
                dbo.collection("slider").deleteOne({"_id": ObjectId(req.body._id)}, function(err, obj) {
                  if (err) throw err;
                  console.log("1 document deleted");
                  res.send({code: "ok"});
                })

              })


              app.get('/sliderget', function(req, res) {

                var dbo = db.db("ecommerce");
                dbo.collection("slider").find({}).toArray(function(err, result) {
                  if (err) throw err;
                  
                
                    res.send(result);
                    
                  
                  
                 
                });
              });



              
        app.post('/updateprodprice', (req, res) => {
 console.log(req.body)

 var dbo = db.db("ecommerce");
  var myquery = { _id: req.body._id };
  var newvalues = { $set: {price: req.body.productprice} };
  dbo.collection(req.body.cname).updateOne(myquery, newvalues, function(err, resp) {
    if (err) throw err;
    console.log("1 document updated");
    res.send({code: "ok"})
  });
       
              })

              app.post('/updateprodname', (req, res) => {
                console.log(req.body)

                var dbo = db.db("ecommerce");
  var myquery = { _id: req.body._id };
  var newvalues = { $set: {productname: req.body.productname} };
  dbo.collection(req.body.cname).updateOne(myquery, newvalues, function(err, resp) {
    if (err) throw err;
    console.log("1 document updated");
    res.send({code: "ok"})
  });
                      
                             })
  


  

  
    app.get('/images/:id', (req, res) => {
      console.log("i am called");
      console.log(req.params['id']);
      res.sendFile(__dirname + '/images/'+req.params['id']);
      
    })
  


    app.get('*', (req, res) => {
      res.sendFile(__dirname + '/build/index.html');
    })


