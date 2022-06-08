const connection = require('../db_connection');

// Get all categories 
module.exports.getAll = function(req, res){
    connection.query('SELECT * FROM category', function (error, results, fields) {
        if (error) throw error;
        console.log(results);
        res.send(results);
    });
}
