const { response } = require('express');
const connection = require('../db_connection');

// Get all products, using the filters provided if there is any
module.exports.getAll = function(req, res){
    // Set the SQL Query depending on the filters provided
    let completeQuery = 'SELECT * FROM product ';
    // Sanitize query values to avoid SQL injection (Only A-Z, 0-9, _ and º are accepted)
    let letterNumberMatch = true;
    const letterNumber = /^[0-9a-zA-Zº_]+$/;
    Object.values(req.query).forEach(item => { 
        if(!item.match(letterNumber)){
            letterNumberMatch = false;
        } 
    });
    if(!letterNumberMatch) return res.send({status: 'fail', data:[], message:'Invalid query character. Only alphanumeric characters are allowed.'});
    // Filter by Search term or Category
    if(req.query.search || req.query.category){
        (req.query.search) 
        ? completeQuery += `WHERE product.name LIKE '%${req.query.search}%' `
        : completeQuery += `WHERE product.category = ${req.query.category} `;
    }
    // Sort results by price or name
    if(req.query.sort){
        if (req.query.sort === 'price_asc') completeQuery += `ORDER BY product.price ASC `;
        if (req.query.sort === 'price_desc') completeQuery += `ORDER BY product.price DESC `;
        if (req.query.sort === 'name_asc') completeQuery += `ORDER BY product.name ASC `;
        if (req.query.sort === 'name_desc') completeQuery += `ORDER BY product.name DESC `;
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
        if (!results.length) return res.send({status: 'fail', data:[], message: 'No matches'});
        return res.send({status: 'success', data: JSON.parse( JSON.stringify(results))});
    });
}