const express = require('express');
const cors = require('cors');
const path = require('path');
const { dbConnection } = require('./db/config');
require('dotenv').config();

const authRouter = require('./routes/auth');

// initApp
const app = express();

// DB Connection
dbConnection();

// Variables
app.set('port', process.env.PORT || 3000);

// Static
app.use(express.static('public'))

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
authRouter(app);

// Route Handler (Angular)
app.get('*', (req, res) => {
    res.sendfile(path.resolve(__dirname, 'public/index.html'));
});

app.listen(app.get('port'), ()=>{
    console.log(`Server: http://localhost:${app.get('port')}`);
});