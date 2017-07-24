/*
* create socket connect
*/
(() => {
    const send = document.getElementById('send');
    const message = document.getElementById('message');
    const socket = io.connect();  // 建立socket连接

    let chat_name;

    /*
    *
    */
    (() => {
      window.addEventListener('message',(e) => {
          chat_name = e.data;
      },false);

      // 当文档加载完毕, 给父级来源发送信息。
      window.addEventListener('load', (e) => {
          e.currentTarget.opener.postMessage('ready','http://127.0.0.1:3000');
      }, false);
    })();

    /*
    * chat
    */
    (() => {
      // send message
      send.addEventListener("click", () => {
        let message_self = document.createElement('p'),
            message_ctn = document.getElementById('message-ctn'),
            messageObj;

        socket.emit('message',{"message": message.value,"chat_with": chat_name});
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
})();
