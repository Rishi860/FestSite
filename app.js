const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors')

const authRouter = require('./routes/auth')
const adminRouter = require('./routes/admin')
const indexRouter = require('./routes/index')

const app = express();

// for parsing application/json
app.use(cors())
app.use(bodyParser.json())
// for parsing application/xwww-
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));

// Get the Javascript in the browser
app.use("/javascripts", express.static("./views/outJavascripts"));
app.use("/images", express.static("./public/images"));

app.use("/styles", express.static("./public/styles"));

// setting multiple view folders
app.set('views', [__dirname + '/views', __dirname + '/views/admin'])
app.set('view engine', 'jade');

// routes
app.use('/', indexRouter)
app.use('/auth', authRouter)
app.use('/admin', adminRouter)
// require('./routes')(app)
mongoose.connect(`mongodb://localhost:27017/sample`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
 },
 function (err, res) {
  if (err) {
   console.log ('ERROR connecting to MongoDB : ' + err);
  }
  else {
  console.log ('Connected to: MongoDB');
  }
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async function() {
  // we're connected!
  app.listen(8080)
  console.log('app started at port 8080');
});