var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    connection = require('./config/connect'),
    Questions = require('./models/question'),
    Options = require('./models/options');
    var fs = require('fs');
    var csv = require('fast-csv');
    var stream = fs.createReadStream('files/dumpData.csv');
    var masterList = [];

    var option = 
    {
        server: {
            socketOptions: {
                keepAlive: 99000000,
                connectTimeoutMS: 9900000
            }
        },
        replset: {
            socketOptions: {
                keepAlive: 99000000,
                connectTimeoutMS: 9900000
            }
        }
    };

    mongoose.connect(connection.getDbConnection(), option).then(function(err){
        if(err) throw err;
    });

    var oCount = 0;
    csv.fromStream(stream, {headers:false, delimiter:'|',})
    .on('data', function(data){
      //console.log(data);
      masterList.push(data);
      
      //addJobToCollection(data);
    })
    .on('end', function(){
      console.log('done');
      doThisAtTheEnd();
      console.log(oCount);
      //console.log(masterList.toString());
    });
    
    function doThisAtTheEnd(){
    for(var i=0; i<masterList.length; i++){
        //console.log(masterList[i]);
        // var values = JSON.stringify(masterList[i]).split('?');
        // //console.log(values.length);
        // console.log(i+') '+'Question: '+values[0]+' | Answer: '+values[1]);
        var question = masterList[i][0];
        var answer = {
            oValue: masterList[i][1], 
            isCorrect: true};
        var optionsList = [];
        optionsList.push(answer);
        var moreOptions = masterList[i][2].split(',');
        
        for(var j=0; j<moreOptions.length; j++){
            optionsList.push({
                oValue: moreOptions[j],
                isCorrect:false
            })
        }
        saveOptions(question, optionsList);
        oCount++;
        
        //console.log(optionsList);
        //console.log(i+') '+'Question: '+question+' | Answer: '+answer+' Options: '+moreOptions.length);
        // x.replace(/"/ig, '');
        //console.log(values[1]);
        //var answer = JSON.stringify(values[1]).trim().split(']');
        //console.log('Question: '+question[0]+' | Answer: '+question[1].replace("\", ));
    }
    }
    
    

    // .on("error", function(data){
    //           return false;
    //           });
    // var question ='Is this getting saved?';
    // var options = [{
    //     oValue: "pabbu",
    //     isCorrect: true
    // },
    // {
    //     oValue: "kiran",
    //     isCorrect: true
    // }]
    
    // saveOptions(question, options);

    function saveOptions(question, optionList){
    var count = 0;
    //console.log(optionList);
    var options_id = [];
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
                saveQuestions(question, options_id);
            }
        })
    }
    }

  function saveQuestions(question, options_id) {
        console.log('You are here and the question is: '+question);
        var saveQuestion = {
       question: question,
        options: options_id
            };
           console.log('You are here and the complete question being saved is: '+JSON.stringify(saveQuestion)); 
             Questions.create(saveQuestion, function(err, body){
        if(err) 
        {
            console.log('There was aan error saving question');
            throw err;
            
        }
        else
        console.log("Success Nigga. Your shit is saved: "+body);
    })
  }
   

  
            
            
        
    
  
 
    
    
    