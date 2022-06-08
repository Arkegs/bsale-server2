const { response } = require('express');
const connection = require('../db_connection');

// Get all products, using the filters provided if there is any
module.exports.getAll = function(req, res){
    // Set the SQL Query depending on the filters provided
    let completeQuery = 'SELECT * FROM product ';
    // Filter by Search term or Category
    if(req.query.search || req.query.category){
        (req.query.search) 
        ? completeQuery += `WHERE product.name LIKE '%${req.query.search}%' `
        : completeQuery += `WHERE product.category = ${req.query.category} `;
    }
    // Sort results by price or name
    if(req.query.sortPrice || req.query.sortName){
        if(req.query.sortPrice !== 'asc' && req.query.sortPrice !== 'desc') req.query.sortPrice = '';
        if(req.query.sortName !== 'asc' && req.query.sortName !== 'desc') req.query.sortName = '';
        (req.query.sortPrice)
        ? completeQuery += `ORDER BY product.price ${req.query.sortPrice} `
        : completeQuery += `ORDER BY product.name ${req.query.sortName} `
    }
    // Paginate
    completeQuery += 'LIMIT 8 ';
    if(req.query.page){
        const pageNum = parseInt(req.query.page);
        if (pageNum && pageNum > 0) completeQuery += `OFFSET ${8 * (pageNum-1)}`;
    }
    console.log(completeQuery);
    console.log(req.query);
    // Use the created query to retrieve the required products
    connection.query(completeQuery, function (error, results, fields) {
        if (error) return res.send({status: 'error', message:error});
        if (!results.length) return res.send({status: 'fail', data:[]});
        return res.send({status: 'success', data: JSON.parse(JSON.stringify(results))});
    });
}

// Get a single product
module.exports.getOne = function(req, res){
    connection.query(`SELECT * FROM product WHERE product.id = ${req.params.productId} LIMIT 1;`, function (error, results, fields) {
        if (error) return res.send({status: 'error', message:error});
        if (!results.length) return res.send({status: 'fail', data:[]});
        return res.send({status: 'success', data: JSON.parse( JSON.stringify(results))});
    });
}