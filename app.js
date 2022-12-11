const express = require('express');

const app = express();
const dotenv = require('dotenv');

const routes = require('./routes/index.routes');

dotenv.config();
const port = process.env.APP_PORT || 3000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});