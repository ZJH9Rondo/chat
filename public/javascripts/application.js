;(() =>{
  const message_ctn = document.getElementsByClassName('message-ctn');
  const user_name = document.getElementsByClassName('user-name');

  // signup遮罩层
  (() => {
      const cover_main = document.getElementById('cover-main');
      const nick = document.getElementById('nick');
      const signup = document.getElementById('signup');

      // 获取在线好友
      function get_Inline(chaters){
        // 生成Dom 显示在线人数
        function create_mes(chater){
          let message = document.createElement('div');

          message.className = 'message';
          message_ctn[0].appendChild(message);
          message_ctn[0].lastChild.innerHTML = '<div class="user-front"><img src="" alt=""></div><div class="message-dsr"><p class="user-name">' + chater + '</p><p class="message-text"></p></div>';
        }

        let messages = document.getElementsByClassName('message');
        if(messages.length === 0){
          for(let chater in chaters){
            create_mes(chater);
          }
        }else{
            let i = 0;
            for(let chater in chaters){
              if(i === messages.length){
                create_mes(chater);
              }
              i++;
            }
        }
      }

        // addEventListener
     function select_chat(user_nick){
          let messages = document.getElementsByClassName('message'),
              users_name = document.getElementsByClassName('user-name');

          for(let i = 0;i < messages.length; i++){
            messages[i].addEventListener('click',() => {
              $.ajax({
                type: "get",
                url: "http://127.0.0.1:3000/connect",
                datatype: "JSON",
                success: (data) => {

                    data = JSON.parse(data);
                    window.open(data.redirect);
                    // 跨document通信
                    window.addEventListener('message',(e) => {
                      if(e.origin == 'http://127.0.0.1:3000'){
                        switch(e.data){
                          case 'ready': interval = setTimeout((win) => {
                              win.postMessage({"chater_name":users_name[i].innerText,"user_nick": user_nick},'http://127.0.0.1:3000/chat');},1000,e.source);
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
          let socket = io.connect(),
              user_nick = nick.value;

          socket.emit('online',{"from": user_nick});
          cover_main.style.display = 'none';

          socket.on('online',(data) => {
            get_Inline(data.chaters);
            select_chat(user_nick);
          });
      });

  })();
})();
