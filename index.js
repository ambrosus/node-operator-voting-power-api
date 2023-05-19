const http = require('http');
const fs = require('fs');
require('dotenv').config();

const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
	// Extract the value of :any from the URL path
	const [, any] = req.url.split('/getsnapshot/');

	// Read the content of the JSON file
	fs.readFile('nodes_voting_power.json', 'utf8', (err, data) => {
		if (err) {
			console.error(err);
			res.statusCode = 500;
			res.end('Internal Server Error');
			return;
		}

		const snapshot = JSON.parse(data);

		// Set the response headers
		res.setHeader('Content-Type', 'application/json');
		res.statusCode = 200;

		// Send the JSON data as the response
		res.end(JSON.stringify(snapshot));
	});
});

server.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
