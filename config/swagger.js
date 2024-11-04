const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de plataforma de streaming",
      version: "1.0.0",
      description:
        "Documentación de API para gestionar contenido de películas y series.",
    },
    servers: [
      {
        url: "http://localhost:3008",
        url: "https://trabajo-integrador-untref-production.up.railway.app",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = { swaggerUi, swaggerDocs };
