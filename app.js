var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    connection = require('./config/connect'),
    apiController = require('./controllers/apiController'),
    seedController = require('./controllers/seedController');
    
    app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started");
    })

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
    // Seed initial data from CSV to MongoDB
    //seedController();
    
    // Function to make all the api calls
    apiController(app);

    
   

  
            
            
        
    
  
 
    
    
    