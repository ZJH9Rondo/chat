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
const chaters = {};
const userAndSocketidMap = {};

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade'); // 模板引擎 jade

//  静态文件目录
app.use(express.static(path.join(__dirname,'public')));

//  socket
io.on('connection',(socket) => {
    socket.on('online',(data) => {
        socket.name = data.from;
        if(chaters[data.from]){
          userAndSocketidMap[data.from] = socket.id; //用户进入聊天页刷新连接
          return;
        }else{
          chaters[data.from] = data.from;
          userAndSocketidMap[data.from] = socket.id;
          io.emit('online',{"chaters": chaters});
        }
    });

    socket.on('message',(data) => {
      if(userAndSocketidMap[data.to]){
        io.sockets.connected[userAndSocketidMap[data.to]].emit('message',data.body); //获取指定的socket链接对象
      }else{
        io.sockets.connected[userAndSocketidMap[data.from]].emit('message','对方未上线');
      }
    });

    socket.on('offline',(data) => {
      if(chaters[data.from]){
        if(chaters[data.to]){
          io.sockets.connected[userAndSocketidMap[data.to]].emit('offline',data.body);
        }
        delete chaters[data.from];
        delete userAndSocketidMap[data.from];
      }
    });
});

// 路由信息
app.get('/',(req,res,next) => {
  res.render('index');
});
routes(app,chaters);

server.listen(3000);

module.exports = app;
