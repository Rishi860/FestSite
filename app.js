const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors')
// const multer = require('multer')
// const upload = multer();

const authRouter = require('./routes/auth')

const app = express();

// for parsing application/json
app.use(bodyParser.json())
app.use(cors())
// for parsing application/xwww-
// app.use(bodyParser.urlencoded({ extended: true }));

// for parsing multipart/form-data
// app.use(upload.array());
// Get the Javascript in the browser
app.use("/javascripts", express.static("./views/outJavascripts"));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// app.use('/', routes)
app.use('/auth', authRouter)
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