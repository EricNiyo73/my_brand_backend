import swaggerJSDoc from "swagger-jsdoc";

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Capstone API",
      version: "1.0.0",
      description: "capstone backend Apis",
    },
    servers: [
      {
        url: "http://localhost:300/",
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          name: "Authorization",
          in: "header",
        },

      },
    },
  },
  apis: ["./src/Routes/*.js", "./src/db_models/*.js"],
};

const document = swaggerJSDoc(options);
export default document;
