
const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'API Project',
    description: 'Movies API'
  },
  host: 'onrender.com',
  schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);

