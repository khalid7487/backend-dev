import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import {type Express} from 'express'

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'API documentation for the Node.js TypeScript project',
    },
    servers: [
      {
        url: 'http://localhost:3001/api/v1/', // Update this to match your server's URL
      },
    ],
  },
  apis: ['./src/controller/**/*.ts'], // Path to your route files
}

const swaggerSpec = swaggerJSDoc(options)

export const setupSwagger = (app: Express): void => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
}
