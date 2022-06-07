const { response } = require('express');
const connection = require('../db_connection');

// Get all products, using the filters provided
module.exports.getAll = function(req, res){
    connection.query('SELECT * FROM product', function (error, results, fields) {
        if (error) return res.send({status: 'error', message:error});
        if (!results.length) return res.send({status: 'fail', data:[]});
        console.log({status: 'success', data: JSON.parse( JSON.stringify(results))});
        return res.send({status: 'success', data: JSON.parse( JSON.stringify(results))});
    });
}

// Get a single product
module.exports.getOne = function(req, res){
    connection.query(`SELECT * FROM product WHERE product.id = ${req.params.productId} LIMIT 1;`, function (error, results, fields) {
        if (error) return res.send({status: 'error', message:error});
        if (!results.length) return res.send({status: 'fail', data:[]});
        console.log({status: 'success', data: JSON.parse( JSON.stringify(results))});
        return res.send({status: 'success', data: JSON.parse( JSON.stringify(results))});
    });
}