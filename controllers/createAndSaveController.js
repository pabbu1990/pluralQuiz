var bodyParser = require('body-parser'),
    Questions = require('../models/question');


    module.exports = function(saveQuestion){ //function to save answer and options
        var count = 0;
        var options = [];
        var optionList = saveQuestion.options;
        for(var i=0; i<optionList.length; i++){
                options.push(optionList[i]);
                count++;
                if(count == optionList.length){
                    var questionToSave = {
                    question: saveQuestion.question,
                    options: options
                        };
                    Questions.create(saveQuestion, function(err, body){
                    if(err) 
                    {
                        console.log('There was aan error saving question');
                        throw err;
                    }
                    return body;
                });
            }
        }
    }