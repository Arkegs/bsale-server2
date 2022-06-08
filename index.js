// Only use .env if not in production environment
if(process.env.NODE_ENV !== "production"){
    require('dotenv').config();
}

// Require packages
const express = require('express');

// Establish connection with DB
const connection = require('./db_connection');

// Keep alive function. Set to ping DB every 5 seconds
function keepAlive() { 
    connection.getConnection(function(err, connection){
    if(err) { 
        console.error('Error on keep alive function', err); 
        return; 
    }
        connection.ping();
        connection.release();
    });
}
setInterval(keepAlive, 4999);

// Express app setup
const port = process.env.SERVERPORT || 5000;
const app = express();

// RESTful endpoints setup
const categoryRoutes = require('./routes/categories');
const productRoutes = require('./routes/products');
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);

app.get('*', function(req, res){
    return res.send({status: 'error', message:'Invalid endpoint'});
});

// Initialize express app
app.listen(port, () => console.log(`Oh yeah! Listening on port ${port}!`));