var express=require('express')
var cors= require('cors')
var app=express()
app.use(cors())


const {MongoClient}=require("mongodb")
var uri="mongodb+srv://anasawanas:wlDjzXdOo3xlMWtoj@cluster0.e4xmyco.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(uri);
const database = client.db('user');

app.get("/", function(req,res)
{
    res.sendFile(__dirname+'/src/Weather.js')
})


var server = app.listen(8000,function(){
    var host = server.address().address
    var port = server.address().port
    console.log("working",host,port)
})
