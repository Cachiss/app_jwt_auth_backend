const express = require('express');
const app = express();
const dotenv = require('dotenv');

const routes = require('./routes/index.routes');
const apiV1Routes = require('./api/v1/api_v1.routes');

// Config dotenv & port
dotenv.config();
const port = process.env.APP_PORT || 3000;

// Options
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use(routes);
app.use('/api/v1',apiV1Routes );

// Start server
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});