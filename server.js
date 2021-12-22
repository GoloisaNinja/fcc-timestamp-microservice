// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
	res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/hello', function (req, res) {
	res.json({ greeting: 'hello API' });
});

// api/:date route for returning JSON object as outlined in directions
app.get('/api', (req, res) => {
	const noUserDate = Date.now();
	const dateToReturn = new Date(noUserDate);
	res.send({ unix: dateToReturn.getTime(), utc: dateToReturn.toUTCString() });
});
app.get('/api/:date', (req, res) => {
	let userDate;
	const regex = new RegExp('-|,');
	const isString = regex.test(req.params.date);
	if (isString) {
		userDate = new Date(req.params.date);
	} else {
		userDate = new Date(parseInt(req.params.date));
	}

	if (!userDate.getTime()) {
		return res.send({ error: 'Invalid Date' });
	}
	res.send({
		unix: userDate.getTime(),
		utc: userDate.toUTCString(),
	});
});

// listen for requests :)
const PORT = process.env.PORT || 5000;
var listener = app.listen(PORT, function () {
	console.log('Your app is listening on port ' + listener.address().port);
});
