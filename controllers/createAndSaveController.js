var bodyParser = require('body-parser'),
    Questions = require('../models/question'),
    Options = require('../models/options');


    module.exports = function(saveQuestion){ //function to save answer and options
        var count = 0;
        var options_id = [];
        var optionList = saveQuestion.optionsList;
        for(var i=0; i<optionList.length; i++){
            Options.create(optionList[i], function(err, body){
                if(err) 
            {
                console.log('There was aan error saving answers');
                throw err;
                
            }
                options_id.push(body._id);
                count++;
                if(count == optionList.length){
                    saveQuestions(saveQuestion.question, options_id);
                }
            })
        }
    }
    
  // function to save question
  function saveQuestions(question, options_id) {
        var saveQuestion = {
        question: question,
        options: options_id
            };
             Questions.create(saveQuestion, function(err, body){
        if(err) 
        {
            console.log('There was aan error saving question');
            throw err;
        }
    })
  }