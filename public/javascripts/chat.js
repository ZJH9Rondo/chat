(() => {
    const send = document.getElementById('send');
    const message = document.getElementById('message');
    const socket = io.connect(); // 建立链接

    let chat_name,
        user_nick;
    /*
    * 接收数据
    */
    (() => {
      window.addEventListener('message',(e) => {
          chat_name = e.data.chater_name;
          user_nick = e.data.user_nick;
          socket.emit('online',{"from": user_nick});
      },false);

      // 当文档加载完毕, 给父级来源发送信息。
      window.addEventListener('load', (e) => {
          e.currentTarget.opener.postMessage('ready','http://127.0.0.1:3000');
      }, false);
      // 对话页关闭，给父级发送消息
      window.addEventListener('closed',(e) => {
          e.currentTarget.opener.postMessage('closed','http://127.0.0.1:3000');
      },false);
    })();

    // send message
    send.addEventListener("click", () => {
        let message_self = document.createElement('p'),
            message_ctn = document.getElementById('message-ctn');

        socket.emit('message',{"from": user_nick,"to": chat_name,"body": message.value});
        message_self.className = 'message_self';
        message_self.innerText = message.value;
        message_ctn.appendChild(message_self);
    });

    // accept and display
    socket.on('message',(data) => {
        let message_res = document.createElement('p'),
            message_ctn = document.getElementById('message-ctn');

        message_res.className = 'message_res';
        message_res.innerText = data;
        message_ctn.appendChild(message_res);
    });
})();
