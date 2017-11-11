var mongoose = require('mongoose'),
    Questions = require('../models/question'),
    bodyParser = require('body-parser'),
    JSONStream = require('JSONStream'),
    createAndSaveController = require('./createAndSaveController');
    
    
    module.exports = function(app){
    
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    
    app.get('', function(req, res){
        res.redirect('/questions');
        
    });
    
    
    app.get('/questions', function(req, res){
         Questions.find().stream()
         .pipe(JSONStream.stringify()).pipe(res);
    });
    
    app.post('/new', function(req, res){
        var count = 0;
        var options = [];
        console.log(JSON.stringify(req.body));
        var optionList = req.body.options;
        for(var i=0; i<optionList.length; i++){
                options.push(optionList[i]);
                count++;
                if(count == optionList.length){
                    var questionToSave = {
                    question: req.body.question,
                    options: options
                        };
                    Questions.create(questionToSave, function(err, body){
                    if(err) 
                    {
                        console.log('There was aan error saving question');
                        throw err;
                    }
                    res.send(body);
                    res.end();
                });
            }
        }

    });

    app.put("/edit/:id", function(req, res){
        console.log("OK OK"+JSON.stringify(req.body));
        console.log(JSON.stringify("Is this working?"+req.params.id));
         Questions.findByIdAndUpdate(req.params.id, req.body, function(err, updatedQuestion){
            if(err)
            {
                console.log(err);
                
            }
            else
            {
            res.send(updatedQuestion);
            }
         });
        
    });
}