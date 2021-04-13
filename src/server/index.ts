import { createServer, IncomingMessage, ServerResponse } from 'http';
import dotenv from 'dotenv';

dotenv.config();
 
const s = createServer((request: IncomingMessage, response: ServerResponse) => {
  response.end('Hello world!');
})
 
export const server = (): void => {
    s.listen(process.env.PORT_REST, () => {
        console.log(`Running on ${process.env.PORT_REST}!`)
    });
}