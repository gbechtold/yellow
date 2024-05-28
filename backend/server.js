const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swaggerConfig');


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


/**
 * @swagger
 * /:
 *   get:
 *     summary: Returns a simple greeting
 *     responses:
 *       200:
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Hello World!"
 */
app.get('/', (req, res) => {
	res.send('Hello World!');

});

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log('Server running on http://localhost:${port}');
  	console.log(`Swagger docs available on http://localhost:${port}/api-docs`);
});

require('dotenv').config();
const connectDB = require('./db');
connectDB();