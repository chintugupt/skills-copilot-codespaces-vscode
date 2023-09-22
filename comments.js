//create web server
const express = require('express');
const app = express();
//connect to the database
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/express-comments', {useNewUrlParser: true, useUnifiedTopology: true});
//set up view engine
app.set('view engine', 'ejs');
//set up static files
app.use(express.static('public'));
//set up body parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
//import comment model
const Comment = require('./models/comment');
//import comment routes
const commentRoutes = require('./routes/comments');
//import method override
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

//use comment routes
app.use(commentRoutes);

//listen to port 3000
app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});

//home route
app.get('/', (req, res) => {
    res.redirect('/comments');
});

//404 route
app.get('*', (req, res) => {
    res.send('404: Page not found');
});