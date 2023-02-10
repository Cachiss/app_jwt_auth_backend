const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');

const routes = require('./routes/index.routes');
const apiV1Routes = require('./api/v1/api_v1.routes');
const connectDb = require('./db/connection');
// Config dotenv & port
dotenv.config();
const port = process.env.APP_PORT || 3000;

// Options
connectDb();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
	origin: process.env.APP_URL,
}));

// Routes
app.use(routes);
app.use('/api/v1',apiV1Routes );

// Start server
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});