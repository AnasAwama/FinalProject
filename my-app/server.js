var express=require('express')
var cors= require('cors')
var app=express()
app.use(cors())


const {MongoClient}=require("mongodb")
var uri="mongodb+srv://anasawanas:i7IZO0T4a6TQ71Km@cluster0.col41xi.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(uri);
const database = client.db('user');


var server = app.listen(8000,function(){
    var host = server.address().address
    var port = server.address().port
    console.log("working",host,port)
})
