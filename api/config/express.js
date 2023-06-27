const express = require('express');
const cors = require('cors');
require('dotenv').config();

module.exports = () => {
    const app = express();

    app.set('port', process.env.PORT || 5000);

    app.use(cors());
    app.use(express.json());

    app.use('/', require('../routes/authentication'));
    app.use('/', require('../routes/db_connection'));

    return app;
};