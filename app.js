/*
* chat created by ZJH9Rondo
*   21/07/2017
*/
const express = require('express');
const path    = require('path');
const app     = express();
const server  = require('http').createServer(app);
const io  = require('socket.io').listen(server);
const routes  = require('./routes/connect');
const sockets = [];

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade'); // 模板引擎 jade

//  静态文件目录
app.use(express.static(path.join(__dirname,'public')));


//  socket
io.on('connection',(socket) => {
    socket.on('message',(data) => {
      let flag = 0;
      if(sockets.length === 0){
        sockets.push({
          "socket": socket, 
          "name": data.chat_with,
        });
        sockets[0].socket.emit('message',data.to);
        console.log(sockets);
        return;
      }

      for(let i in sockets){
        if(data.chat_with === sockets[i].name){
          if(sockets[i].socket !== socket){
            sockets[i].socket = socket;
          }
          sockets[i].socket.emit('message',data.chachat_with);
          flag = 1;
          return;
        }
      }

      if(flag === 0){
        sockets.push({
          "socket": socket,
          "name": data.chat_with
        });
        socket.emit('message',data.chat_with);
      }
      console.log(sockets);
    });
});

// 路由信息
app.get('/',(req,res,next) => {
  res.render('index');
});
routes(app,sockets);

server.listen(3000);

module.exports = app;
