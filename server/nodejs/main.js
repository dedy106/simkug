var http = require('http'),
	fs = require('fs'),
	sanitize = require('validator').sanitize;
	
var app = http.createServer(function (request, response) {
	response.writeHead(200, {'Content-Type': 'text/plain'});
	response.write("hello");
	response.end();
}).listen(1337);

var io = require('socket.io').listen(app);
var user = {};
var clients = {};

io.sockets.on('connection', function(socket) { 

	socket.on('sendmessage', function(data) { 
		var escaped_message = sanitize(data["message"]).escape();
    var client = user[socket.id];
    if (data.to == undefined || data.to == "All")
		  io.sockets.in(socket.room).emit("message",{ type: "MSG",message: escaped_message, time : new Date() }); 
    else {
      //kirim ke semua socket dengan user yg sama
      for (var i in clients[socket.room +"_"+data.to]){
        var sock = clients[socket.room +"_"+data.to][i];
        io.sockets.sockets[sock].emit("message",{ type: "MSG",message: escaped_message, from: data.from, to: data.to, time: new Date() });    
      }
      //kirim ke user yg sama tetapi dgn socket yg beda
      for (var i in clients[socket.room +"_"+data.from]){
        var sock = clients[socket.room +"_"+data.from][i];
        if (sock != socket.id){
          io.sockets.sockets[sock].emit("message",{ type: "MSG",message: escaped_message, other: data.from, to: data.to, time: new Date() });    
        }
      }
      
    }
	});
	
  /*socket.on("connect_to", function(data){
     socket.broadcast.emit(data+"_ready");
  });*/

  /*socket.on("msg_server", function(data){
    var escaped_message = sanitize(data.message).escape();
    socket.broadcast.emit(data.server+"_message", {message:escaped_message});
  });*/

  socket.on('set nickname', function (data) {
    //tampung informasi user setiap socket
    user[socket.id] = {lokasi: data.lokasi, periode: data.periode, nama:data.nama, room : data.server};
    socket.room = data.server;
    socket.nama = data.nama;
    socket.join(data.server);
    //jika user yg sama login lebih dari 1...
    //di tampung ke array
    if (clients[socket.room +"_"+ data.nama] == undefined)
        clients[socket.room +"_"+ data.nama] = [];
    clients[socket.room +"_"+ data.nama].push(socket.id);
    
    var listUser = [];
    for (var i in clients){
      var room_user = i.split("_");
      var room = room_user[0];
      var uid = room_user[1];
      if (room == socket.room){
        listUser.push(uid);
      }
    }
    io.sockets.in(socket.room).emit("message", {type: "JOIN", nama: data.nama, message: data.nama +" baru bergabung", time : new Date(), users: listUser });
    socket.emit('ready', {type:"READY",message:data.nama, room: socket.room});
    socket.emit('lokasi',{lokasi: data.lokasi, periode: data.periode});
    var url = 'http://10.15.224.206/simkug/server/getList.php?lokasi='+data.lokasi+'&periode='+data.periode;
    var oldData = '';
    download(url, function (data){
              if (data){
                  if (oldData != data){
                    var msg = JSON.parse(data);
                    io.sockets.to(socket.room).emit('message_list',{message: msg.message});      
                    oldData = data;
                    
                  }
              } 
          });   
  });

  /*socket.on('chatmsg', function (msg) {
    socket.get("nickname", function(err, name){
        io.broadcast.emit('message',{message:name +":"+msg.message});  
    });
  });*/
   socket.on('disconnect', function () {

    var tmp = [];
    for (var i in clients[socket.room +"_"+socket.nama]){
        var sock = clients[socket.room +"_"+socket.nama][i];
        if (sock != socket.id)
          tmp.push(sock);
    }
    if (tmp.length == 0){
      io.sockets.in(socket.room).emit("message", {type:"LEAVE",nama:socket.nama, message:socket.nama +" logout" });
      clients[socket.room +"_"+socket.nama] = undefined;
      delete user[socket.id];
      delete clients[socket.room +"_"+socket.nama];
      
    }else {
      clients[socket.room +"_"+socket.nama] = tmp;
    }
    socket.leave(socket.room);
    //clearInterval(list);
  });
  
  
});
function download(url, callback) {
  http.get(url, function(res) {
    var data = "";
    res.on('data', function (chunk) {
      data += chunk;
    });
    res.on("end", function() {
      callback(data);
      download(url, callback);
    });
  }).on("error", function() {
    callback(null);
  });
}