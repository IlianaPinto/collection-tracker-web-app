const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();
mongoose.connect('mongodb+srv://Jarvis:jarvis@cluster0.ffvol.mongodb.net/Collection_Tracker?retryWrites=true&w=majority',{
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

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

//Routes
app.use('/items',require('./routes/items'));

// Static files
app.use(express.static(__dirname+'/public'));

// Server is listening
app.listen(app.get('port'), () => {
    console.log("Server on port", app.get('port'));
});