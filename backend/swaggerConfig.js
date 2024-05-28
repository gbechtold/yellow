const swaggerJsDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Yellow Submarine API',
      version: '1.0.0',
      description: 'This is a simple CRUD API for the Yellow Submarine project',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
  },
  apis: ['./routes/*.js'], // Pfad zu deinen Route-Dateien
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = swaggerSpec;
