const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
var cors = require('cors');
var path = require('path');

require('dotenv').config();

const app = express();
mongoose.connect(process.env.MONGOLAB_URI,{ 
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("DB is connected!");
})
.catch((err) => {
    console.error(err);
})
;

mongoose.set('useFindAndModify', false);

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

app.use(cors());

//Routes
app.use('/items',require('./routes/items'));
app.use('/collections', require('./routes/collections'));

app.use(express.static(__dirname+'/public'));
app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));

// Server is listening
app.listen(app.get('port'), () => {
    console.log("Server on port", app.get('port'));
});