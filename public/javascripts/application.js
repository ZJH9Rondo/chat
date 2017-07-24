;(() =>{
  const message_ctn = document.getElementsByClassName('message-ctn');
  const user_name = document.getElementsByClassName('user-name');

  // signup遮罩层
  (() => {
      const cover_main = document.getElementById('cover-main');
      const nick = document.getElementById('nick');
      const signup = document.getElementById('signup');

      // 获取在线好友
      function get_Inline(sockets){
        console.log(sockets.length);
        for(let i in sockets){
           let message = document.createElement('div');

           message.className = 'message';
           message_ctn[0].appendChild(message);
           message_ctn[0].lastChild.innerHTML = '<div class="user-front"><img src="" alt=""></div><div class="message-dsr"><p class="user-name">' + sockets[i].name + '</p><p class="message-text"></p></div>';
        }
      }

        // addEventListener
     function select_chat(){
          let messages = document.getElementsByClassName('message');

          for(let i = 0;i < messages.length; i++){
            messages[i].addEventListener('click',() => {
              $.ajax({
                type: "get",
                url: "http://127.0.0.1:3000/connect",
                datatype: "JSON",
                success: (data) => {

                    data = JSON.parse(data);
                    window.open(data.redirect);
                    window.addEventListener('message',(e) => {
                      if(e.origin == 'http://127.0.0.1:3000'){
                        switch(e.data){
                          case 'ready': interval = setTimeout((win) => {

                                          win.postMessage(user_name[i].innerText,'http://127.0.0.1:3000/chat');
                                        },1000,e.source);
                                        break;
                         case 'closed':  clearInterval(interval);
                                         break;
                        }
                      }
                    },false);
                },
              });
            },false);
          }
      }

      signup.addEventListener('click',(e) => {
          let socket = io.connect();

          socket.emit('message',{"chat_with": nick.value});
          cover_main.style.display = 'none';

          $.ajax({
            type: "get",
            url: "http://127.0.0.1:3000/get_Inline",
            datatype: "JSON",
            success: (sockets) => {
                sockets = JSON.parse(sockets);
                get_Inline(sockets);
                select_chat();
            }
          });
      });
  })();
})();
