module.exports = function connect(app,chaters){
    app.get('/connect',(req,res,next) => {
      /*  let name = req.query.name,
            cache = [],
            socket;

        for(let i in sockets){
          if(name === sockets[i].name){
            socket = sockets[i].socket; // 获取当前聊天对象
            break;
          }
        }*/

        let data = {
          "redirect": "http://127.0.0.1:3000/chat"
        };

      /*  data = JSON.stringify(data,(key, value) => {
            if (typeof value === 'object' && value !== null) {
                if (cache.indexOf(value) !== -1) {
                    // Circular reference found, discard key
                    return;
                }
                // Store value in our collection
                cache.push(value);
            }
            return value;
        });*/
        data = JSON.stringify(data);
        res.end(data);
    });

    // 获取聊天界面接口
    app.get('/chat',(req,res,next) => {
        res.render('chat');
    });
};
