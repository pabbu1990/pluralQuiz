var mongoose = require('mongoose'),
    Questions = require('../models/question');

module.exports = function(app){

    app.get('/questions', function(req, res){
        
        Questions.find({}, function(err, body){
            if(err) {
                console.log('Error occured'+err);
                throw err;}
            console.log(JSON.stringify(body).length);
             res.send(JSON.stringify(body));  
        })
        
    });
    // app.post('/new', function(res){
    //     if(err) throw err;
        
    // })
}