    var fs = require('fs');
    var csv = require('fast-csv');
    var stream = fs.createReadStream('files/dumpData.csv');
    var createAndSaveController = require('./createAndSaveController');
    var masterList = [];

    var oCount = 0;
    
    module.exports = function(){  // function to load data from csv
        csv.fromStream(stream, {headers:false, delimiter:'|',})
        .on('data', function(data){
          masterList.push(data);
        })
        .on('end', function(){
          console.log('done');
          doThisAtTheEnd();
          console.log('Records fetched: '+oCount);
        });
    }
    
    // function to populate the question, answer, options and call save controller
    function doThisAtTheEnd(){
    for(var i=0; i<masterList.length; i++){
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
        var saveQuestion = {
            question,
            optionsList
        }
        createAndSaveController(saveQuestion , function(err, res){
            if(err){
                console.log('There was an error saving during createAndSaveController: '+err);
            }
        });
        oCount++;
    }
    }