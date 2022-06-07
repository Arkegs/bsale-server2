// Only use .env if not in production environment
if(process.env.NODE_ENV !== "production"){
    require('dotenv').config();
}

// Require packages
const express = require('express');
const connection = require('./db_connection');

// Keep alive function. Set to send a ping every 5 seconds to DB
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

// Set up Express app
const port = process.env.PORT || 5000;
const app = express();

// RESTful endpoints setups
const categoryRoutes = require('./routes/categories');
const productRoutes = require('./routes/products');
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);

app.listen(port, () => console.log(`Oh yeah! Listening on port ${port}!`));