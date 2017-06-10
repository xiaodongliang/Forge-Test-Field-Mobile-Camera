var express =require ('express') ;

var router =express.Router () ;

var url = require('url');


var fs = require('fs');

var json_plan_tasks = '././offline-models'; 
 

router.get ('/getTasks', function (req, res) {
 
    var args = url.parse(req.url, true).query;

    fs.readFile('./jsontasks/' + args.taskName, function(err, blob){
          if (err) {
            console.log('   Get Plan Task Error: ' + err);
            res.end();
          } else {
            console.log('   Get ' + args.taskName + ' Succeeded '  );
            res.send(blob);
          }
    }); 
    
});

var blob = null;
router.post ('/setImage', function (req, res) {  
 
    blob = req.body.blob;
    console.log(blob.length); 

    res.send ('ok') ;
});

 router.get ('/getImage', function (req, res) { 
 
     res.send (blob) ;
 });

module.exports =router ;