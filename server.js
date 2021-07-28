var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');
const { Socket } = require('dgram');
app.use(express.static(__dirname));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
var Message = mongoose.model('Message',{
  name : String,
  message : String
})
var dbUrl = 'mongodb+srv://jonathank900:LBgbEaciGkQGVFb2@simple-chat.4rrcx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
app.get('/messages', (req, res) => {
  Message.find({},(err, messages)=> {
    res.send(messages);
  })
})
app.get('/messages', (req, res) => {
  Message.find({},(err, messages)=> {
    res.send(messages);
  })
})
app.post('/messages', (req, res) => {
  var message = new Message(req.body);
  message.save((err) =>{
    if(err)
      sendStatus(500);
    io.emit('message', req.body);
    res.sendStatus(200);
  })
})

io.on('connection', () =>{
  console.log('Usuario conectado')
  
})
mongoose.connect(dbUrl ,{useMongoClient : true} ,(err) => {
  console.log('mongodb connected',err);
})
var server = http.listen(3000, () => {
  console.log('server is running on port', server.address().port);
});