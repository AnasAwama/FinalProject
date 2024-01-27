var express = require('express');
var cors = require('cors');
var app = express();
app.use(cors({
    origin:"http://localhost:3000",
}));

var bodyParser = require('body-parser');
var urlEncoded = bodyParser.urlencoded({ extended: false });
app.use(urlEncoded);
app.use(express.static('public'));

const { MongoClient, Int32 } = require('mongodb');

var uri = 'mongodb+srv://anasawanas:arYKi82BOmFYqOxN@cluster0.e4xmyco.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Connect to MongoDB
client.connect().then(() => {
  console.log('MongoDB connection established successfully');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

const db = client.db('test');
const coll = db.collection('users');

app.post('/logIn',bodyParser.json(),async(req,res)=>{
    try {
      console.log('Received data:', req.body);
        const { email, password } = req.body;
        console.log('email:', email);
        console.log('pass:',password);
        const user = await coll.findOne({ email });
        console.log("User: ",user)
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        
        if (password!=user.password) {
          return res.status(401).json({ error: 'Invalid email or password' });
      }
        await coll.updateOne({ email }, { $set: { flag: 1 } });
        res.status(200).json({ user });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
})

app.get('/user', bodyParser.json(), async (req, res) => {
  try {
    var query = await coll.findOne({ flag: 1 });
    console.log('Flag:', query);
    const { name:username } = query;
    console.log("UserName",username)
    res.status(200).json({ username });
  } catch (error) {
    console.error('Error during user query:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

app.post('/regist', bodyParser.json(), async (req, res) => {
  try {
    console.log('Received data:', req.body);
    const { name, email, password, confirmPassword, age, gender } = req.body;
    console.log('Name:', name);
    console.log('email:', email);
    console.log('gender:', gender);

    const existingUser = await coll.findOne({ name, email });

    if (existingUser) {
      console.log('User with this email is already registered:', existingUser);
      return res.status(400).json({ error: 'User with this email is already registered' });
    }

    const user = {
        'name':name,
        'email':email,
        'password':password,
        'age':age,
        'gender':gender,
        flag: 1,
    };

    const result = await coll.insertOne(user);

    console.log(user);
    console.log('User registered successfully');
    
    res.status(201).json({ user: user, message: 'User registered successfully', userId: result.insertedId });
    
    } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

app.post('/logOut', bodyParser.json(), async (req, res) => {
  try {
    console.log('Received logOut request');
    console.log("req: ",req.body)
    const { name } = req.body; 
    const query = await coll.findOne({ name, flag: 1 });
    console.log("qurey: ", query)
    if (query) {
      const updates = await coll.updateOne({ name }, { $set: { flag: 0 } });
      console.log('Flag updated:', updates);
      res.status(200).json({ success: true, message: 'Logout successful' });
    } else {
      res.status(404).json({ success: false, message: 'User not found or already logged out' });
    }
  } catch (error) {
    console.error('Error during user query:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

app.post('/history', bodyParser.json(), async(req,res)=>{

  try {
    const { history } = req.body;

    const userWithFlagOne = await User.findOne({ flag: 1 });

    if (userWithFlagOne) {
      userWithFlagOne.history = history;
      await userWithFlagOne.save();
    } else{
      const newHistory = new SearchHistory({
        _id: userId,
        history: history
      });
      await newHistory.save();
    }

    res.status(200).json({ success: true, message: 'Search history stored successfully' });
  } catch (error) {
    console.error('Error during storing search history:', error);
    res.status(500).json({ success: false, message: 'Internal server error', details: error.message });
  }
})

var server = app.listen(9000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('working', host, port);
});