require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const data = require('./data');

const app = express();

// Bodyparser Middleware
app.use(express.json());

app.get('/api/products', (req, res) => {
	res.json(data.products);
});

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
	// Set static folder
	app.use(express.static('client/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log('Server has Started on:  http://localhost:' + port));
