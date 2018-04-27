module.exports = sio;
var dateformat = require('dateformat');
var sendmail = require('sendmail')();

function sio(server) {
    var io = require('socket.io')(server);

    //接続
    io.on('connection', (socket) => {
        socket.on('login',(data) =>{
            socket.broadcast.emit('login', {
              username: data.name,
              time : dateformat(new Date(), 'yyyy-mm-dd HH:MM:ss'),
            });
        });
        socket.on('logout',(data) =>{
            socket.broadcast.emit('logout', {
              username: data.name,
              time : dateformat(new Date(), 'yyyy-mm-dd HH:MM:ss'),
            });
        })
        socket.on('chat message', (data) => {
            io.emit('chat message', {
              username: data.name,
              message: data.message,
              time : dateformat(new Date(), 'yyyy-mm-dd HH:MM:ss'),
            });
            sendmail({
              from: 'mifukiahelp@gmail.com',
              to: data.mail,
              subject: 'simchatからメッセージが送信されました',
              text: `ユーザー：${data.name}　メッセージ：${data.message}　https://chatappsim.herokuapp.com/login`
            }, function(err, reply) {
              console.log(err && err.stack);
              console.dir(reply);
            });
        });
    });
}
