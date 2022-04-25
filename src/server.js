/***********************
  Load Components!

  Express      - A Node.js Framework
  Body-Parser  - A tool to help use parse the data in a post request
  Pg-Promise   - A database tool to help use connect to our PostgreSQL database
***********************/
var express = require('express'); //Ensure our express framework has been added
var app = express();
var bodyParser = require('body-parser'); //Ensure our body-parser tool has been added
app.use(bodyParser.json());              // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//Create Database Connection
var pgp = require('pg-promise')();

/**********************
  Database Connection information
  host: This defines the ip address of the server hosting our database.
    We'll be using `db` as this is the name of the postgres container in our
    docker-compose.yml file. Docker will translate this into the actual ip of the
    container for us (i.e. can't be access via the Internet).
  port: This defines what port we can expect to communicate to our database.  We'll use 5432 to talk with PostgreSQL
  database: This is the name of our specific database.  From our previous lab,
    we created the football_db database, which holds our football data tables
  user: This should be left as postgres, the default user account created when PostgreSQL was installed
  password: This the password for accessing the database. We set this in the
    docker-compose.yml for now, usually that'd be in a seperate file so you're not pushing your credentials to GitHub :).
**********************/
const dev_dbConfig = {
  host: 'db',
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD
};

/** If we're running in production mode (on heroku), the we use DATABASE_URL
 * to connect to Heroku Postgres.
 */
const isProduction = process.env.NODE_ENV === 'production';
const dbConfig = isProduction ? process.env.DATABASE_URL : dev_dbConfig;

// Heroku Postgres patch for v10
// fixes: https://github.com/vitaly-t/pg-promise/issues/711
if (isProduction) {
  pgp.pg.defaults.ssl = { rejectUnauthorized: false };
}

const db = pgp(dbConfig);

// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/'));//This line is necessary for us to use relative paths and access our resources directory



/*********************************
 Below we'll add the get & post requests which will handle:
   - Database access
   - Parse parameters from get (URL) and post (data package)
   - Render Views - This will decide where the user will go after the get/post request has been processed

 Web Page Requests:

  
************************************/

//Main page
app.get('/', function (req, res) {
  res.render('pages/main', {
    my_title: "Main Audio API Page"
  });
});

//Update Search History Table
app.get('/searches', function (req, res) {
  var Artists = 'SELECT * FROM savedAudio';
  console.log(Artists);
  db.task('get-everything', task => {
    return task.batch([
      task.any(Artists)
    ]);
  }).then(data => {
    res.render('pages/searches', {
      my_title: "Search History Page",
      Artists: data[0],
    })
  })
    .catch(function (err) {
      // display error message in case an error
      request.flash('error', err);
      response.render('pages/main', {
        my_title: "Search History Page",
        data: '',
      })
    });
});

  //SUBMIT AUDIO
  app.post('/searches', function (req, res) {
    //Save val's from page
    const submission = req.body.submission;
    const nameAlt = req.body.nameAlt;
    const genre = req.body.genre;
    const country = req.body.country;
    var bio = req.body.bio;
    const label = req.body.label;

    bio = bio.replace(/'/g, "");
    bio = bio.replace(/"/g, "");
    bio = bio.replace(/(\r\n|\n|\r)/gm, "");

    //Query to insert val's
    var query = `Insert into savedAudio (submission,nameAlt,genre,country,bio,label) values('${submission}','${nameAlt}','${genre}','${country}','${bio}','${label}')`;

    console.log(query.slice(390, 400));

    //Insert command into savedAudio_db
    db.query(query)
      .then(function (rows) {
        res.status(200);
      })
      .catch(function (err) {
        console.log('error', err);
        res.status(500);
      });
  });

  /* +===== TESTING =====+ */
  //docker-compose run web npm test
  //Might need to move test folder into src (note .yml volumes)
  //docker-compose build
  //module.exports = app.listen(3000);

  const testArtists = [
    {
    id: 1,
    submission: "Eminem" ,       /* Stage Name of the Submitted Artist / Group                     */
    nameAlt: "Marshall Mathers III" ,   /*     Real Name     */
    genre: "Hip-Hop",  /* Artist Genre */
    country: "USA",        /* Place of Birt    */
    bio: "A LONG ASS BIOGRAPHY",         /* Small Artist BIO*/
    label: "AfterMath Records",
    },
    {
    id: 2,
    submission: "Madonna" ,       /* Stage Name of the Submitted Artist / Group                     */
    nameAlt: "Madonna Louise Vernica Ciccone" ,   /*     Real Name     */
    genre: "Pop",  /* Artist Genre */
    country: "Michigan, USA",        /* Place of Birt    */
    bio: "A LONG ASS BIOGRAPHY",         /* Small Artist BIO*/
    label: "Interscope Records",
    }
  ]

// Simple get api provided to check if the node.js starts up successfully. Opening up http://localhost:3000 should display the below returned json.
app.get("/", (req, res) => {
  res.json({ status: "success", message: "Welcome!" });
});

app.get("/searches", (request, response) => {
  response.send(ops);
});

// GET (BY ID)
app.get("/searches/:id", (request, response) => {
  const artistId = request.params.id;
  const artist = testArtists.find((artist) => artist.id === parseInt(artistId));
  if (!artist)
    return response
      .status(404)
      .send("The artist with the provided ID does not exist.");
  response.send(op);
});

  //app.listen(3000);
  const server = app.listen(process.env.PORT || 3000, () => {
    console.log(`Express running → PORT ${server.address().port}`);
  });