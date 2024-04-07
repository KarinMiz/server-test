// import WebSocket from 'ws';
// export function startWebSocketServer() {
//     const wss = new WebSocket.Server({ port: 3000 });

//     wss.on('connection', function connection(ws: WebSocket) {
//         console.log('Client connected');

//         ws.on('message', function incoming(message: WebSocket.MessageEvent) {
//             console.log('Received:', message);
//         });

//         ws.send('Hello, client!');
//     });
// }