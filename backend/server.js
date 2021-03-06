const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
require('dotenv').config();

const app = express();

// Bodyparser Middleware
app.use(express.json());

//routes
app.use('/api/users/', userRoutes);
app.use('/api/products/', productRoutes);
app.use('/api/orders', orderRoutes);
// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
	// Set static folder
	app.use(express.static('client/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

mongoose
	.connect(process.env.MONGODB_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true
	})
	.then(console.log('Connected to the Database'))
	.catch((err) =>
		console.log('DB ERROR : ' + err + ', please provide the correct database link in the environment file')
	);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log('Server has Started on:  http://localhost:' + port));
