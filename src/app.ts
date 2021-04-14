import { createServer } from './server';
import dotenv from 'dotenv';

dotenv.config();

async function server() {
    const app = createServer();
  
    app.listen(process.env.PORT_REST_EXPOSE);
  
    console.log(`API Gateway listening on ${process.env.PORT_REST_EXPOSE}/graphql`);
}

server();