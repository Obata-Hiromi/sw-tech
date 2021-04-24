const net = require('net');
const server = net.createServer().listen(8080, 'localhost');
console.log('Server Startup...');

server.on('connection', (socket) => {
  console.log('Connection from Client');
  socket.on('data', (data) => {
    console.log(data.toString());

    const data1 = new Date();
    const responseHeader1 = 'Data: ' + data1 + '\r\n';
    var responseLine = 'HTTP/1.1 200 OK\r\n';
    var responseBody = 'Hello World\r\n';

    if(data.indexOf('GET / HTTP/1.1') == -1){
      responseLine = 'HTTP/1.1 404 Not Found\r\n';
      responseBody = 'Not Found\r\n';
    }

    const response = responseLine + responseHeader1 + '\r\n' + responseBody;
    socket.write(response);
    socket.end();
  });
  server.close();

  socket.on('end', () => {
    console.log('End connection with client');
  });
});

server.on('close', () => {
  console.log('Shut down the Server');
});
