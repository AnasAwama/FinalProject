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

app.post('logIn',bodyParser.json(),async(req,res)=>{
    try {
        const { email, password } = req.body;
        const user = await coll.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        res.redirect(301, '/Weather');
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
})


app.post('/regist', bodyParser.json(), async (req, res) => {
  try {
    console.log('Received data:', req.body);
    const { name, email, password, confirmPassword, age, gender } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

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
        flag: 0,
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

var server = app.listen(9000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('working', host, port);
});