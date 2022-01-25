
import swaggerJsDoc from "swagger-jsdoc";
const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'St Charles Automotive Api',
      version: '1.0.0',
      description:
        'This is a REST API application made with Express. It retrieves/send data from St Charles Automotive.',
    },
    servers: [
      {
        url: "http://localhost:4000",
        description: "Local host development",
      },
    ],
    components: {
      securitySchemes: {
        jwt: {
          type: "http",
          scheme: "bearer",
          in: "header",
          bearerFormat: "JWT"
        },
      }
    }
    ,
    security: [{
      jwt: []
    }],
  },
  apis: ["./api/routes/*.js", "./api/swaggerschema/*.js"],

  swagger: "3.0",
  jsonEditor: true,
};

module.exports = swaggerJsDoc(options)