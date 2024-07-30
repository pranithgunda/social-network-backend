require('dotenv').config();
const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

const PORT = process.env.PORT || 3001;
// instantiate app variable of express object
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// expose routes
app.use(routes);

// 
db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`App running on server ${PORT}`);
    });
});