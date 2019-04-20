const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));

// Handlebars
app.engine(
    'handlebars',
    exphbs({
        defaultLayout: 'main'
    })
);
app.set('view engine', 'handlebars');

// Routes
require('./routes/routes')(app);

// DB call & connection
var db = process.env.MONGODB_URI || "mongodb://localhost/mongoArticles";
mongoose.connect(db, { useNewUrlParser: true},  function (error) {
    // Log any errors connecting with mongoose
    if (error) {
        console.log(error);
    }
    // Or log a success message
    else {
        console.log("mongoose connection is successful");
    }
});

// Starting the server
app.listen(PORT, function () {
    console.log('App listening on http://localhost:' + PORT);
});

module.exports = app;