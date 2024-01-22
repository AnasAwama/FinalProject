var express=require('express')
var cors= require('cors')
var app=express()
app.use(cors())
const path = require('path');
var bodyParser=require('body-parser')
var urlEncoded = bodyParser.urlencoded({extended:false})
app.use(urlEncoded);
app.use(express.static('public'))

const {MongoClient}=require("mongodb")
var uri="mongodb+srv://anasawanas:arYKi82BOmFYqOxN@cluster0.e4xmyco.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const db= client.db('test')
const coll= db.collection('users')


app.post("/logIn",urlEncoded,async(req,res)=>{
    const result=await coll.findOne({email:req.body.email,password:req.body.password})
    if(result){
        res.redirect('/Weather');
        await coll.updateOne({flag:1})
    }
    else{
        res.redirect('/Weather'); 
    }
})

app.post("/register",urlEncoded,async(req,res)=>{
    try {
        const { name, email, password, confirmPassword, dob, gender } = req.body;
        if (password !== confirmPassword) {
            return res.status(400).json({ error: 'Passwords do not match' });
        }
        if (!client.topology || !client.topology.isConnected()) {
            await client.connect();
        }
        const existingUser = await coll.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: 'User with this email is already registered' });
    }

        const user = {
        name,
        email,
        password,
        dob,
        gender,
        flag: 0,
        };
    const result = await coll.insertOne(user);
    console.log(user)
    console.log("result"+result)
    res.status(201).json({ message: 'User registered successfully', userId: result.insertedId });
    } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
})


var server = app.listen(9000,function(){
    var host = server.address().address
    var port = server.address().port
    console.log("working",host,port)
})
