module.exports = function connect(app,sockets){
    app.get('/connect',(req,res,next) => {
        let data = {
          "redirect": "http://127.0.0.1:3000/chat",
        };

        data = JSON.stringify(data);
        res.end(data);
    });

    // 获取聊天界面接口
    app.get('/chat',(req,res,next) => {
        res.render('chat');
    });

    // 获取在线人数接口
    app.get('/get_Inline',(req,res,next) => {
        let data = [];

        console.log(sockets.length,'在线人数');
        for(let i in sockets){
          data.push({"name": sockets[i].name});
        }

        // 循环转换处理生成json
        /*data = JSON.stringify(data,(key, value) => {
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
        console.log(data,'在线数据');
        res.send(data);
    });
};
