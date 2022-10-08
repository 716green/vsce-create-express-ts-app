export const appFile =
  "import express, { Request, Response } from 'express';\nimport dotenv from 'dotenv';\ndotenv.config();\n\nconst app = express();\nconst PORT = process.env.PORT || 3000;\n\napp.get('/', (_req: Request, res: Response) => {\n\tres.send('Hello World!');\n});\n\napp.listen(PORT, () => console.log('listening on port',PORT));";
