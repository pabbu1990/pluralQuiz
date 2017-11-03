var creds = require("./dbProps.json");

module.exports = {
    getDbConnection: function(){
       return  "mongodb://"+creds.username+":"+creds.password+"@ds243285.mlab.com:43285/pluralsightquiz";
    }
}