import { createServer, IncomingMessage, ServerResponse } from 'http';
 
const port = 5000;
 
const s = createServer((request: IncomingMessage, response: ServerResponse) => {
  response.end('Hello world!');
})
 
export const server = (): void => {
    s.listen(port, () => {
        console.log('Running on 5000!')
    });
}