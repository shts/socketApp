const port = process.argv[2]
var fs = require('fs');
var server = require('http').createServer(function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(`<h1>プロセス${port}</h1>`);
  res.end(fs.readFileSync('index.html'));
})

var io = require('socket.io')(server);
var adapter = require('socket.io-redis');
var Redis = require('ioredis');
var pubRedis = new Redis({host: 'localhost', port: 6379});
var subRedis = new Redis({host: 'localhost', port: 6379});
io.adapter(adapter({ pubClient: pubRedis, subClient: subRedis }));
io.sockets.on('connection', function(socket) {
  socket.on('msg', function(data) {
    io.sockets.emit('msg', data);
    console.log('receive:', data);
  });
});

// redis の pub/sub

var sub = new Redis({host: 'localhost', port: 6379});
sub.subscribe('Test Channel');
sub.on("message", function(channel, message) {
  console.log(`channel: ${channel}, message: ${message}`);
  io.sockets.emit('msg', message);
});
// サーバー台数分イベントが飛んでくる
// sub.psubscribe('*')
// sub.on('pmessage', async (pattern, channel, message) => {
//   console.log(`channel: ${channel}, message: ${message}`);
//   if (channel === 'Test Channel') {
//     io.sockets.emit('msg', message);
//   }
// })


server.listen(port);
