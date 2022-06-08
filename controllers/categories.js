const connection = require('../db_connection');

// Get all categories
module.exports.getAll = function(req, res){
    connection.query('SELECT * FROM category', function (error, results, fields) {
        if (error) return res.send({status: 'error', message:error});
        return res.send({status: 'success', data: JSON.parse( JSON.stringify(results))});
    });
}