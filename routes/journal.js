var express = require('express');
var router = express.Router();

/* GET to root page of app. */
router.get('/', function(req, res, next) {
    const db = req.app.get('db');
    db.all("SELECT * FROM entries ORDER BY timestamp DESC",
	   (err, rows) => {
	       if (err) {
		   console.log(err);
		   next();
	       }
	       else {
		   res.render('journal.ejs', {rows: rows});
	       }
	   }
	  );
});

/* POST to store an entry in the database. */
router.post('/store', function(req, res, next) {
    const db = req.app.get('db');
    db.run("INSERT INTO entries VALUES (?,?,?)",
	   [ "gery",
		   req.body.entry,
	     Math.floor(Date.now()/1000) // Unix time in seconds
	   ], 
	   (err) => {
	       if (err) {
		   console.log(err);
		   next();
	       }
	       else {
		   res.redirect('/journal/');
	       }
	   }
	  ); 
});

module.exports = router;
