const express = require('express');
const app = express();
const session = require('express-session');
const  { generateAccessToken, generateRefreshToken,verifyToken } = require('./auth');
const users = require('../api/db'); // users.js dosyasını dahil et
const port = 5000;

app.use(express.json());
app.use(session({ secret: 'keyboard cat',   resave: true, saveUninitialized: true}))


app.post('/api/private/signup', (req, res) => {
  const { username, password } = req.body;

  // Check if user already exists
  const userExists = users.find(u => u.username === username);
  if (userExists) {
    return res.status(409).json({ error: 'User already exists' });
  }

  // Create new user
  const newUser = {
    id: users.length + 1,
    username: username,
    password: password,
  };

  // Add user to array
  users.push(newUser);

  res.json({ message: 'User created' });
});

app.post('/api/private/login', (req, res) => {
  const {username,password} = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if(user){
    // Generate an access token
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.refreshToken = refreshToken;
   

    req.session.accessToken = accessToken;
    req.session.userId = user.id;

    res.json({message:'User logged in'})
  }else{
    res.json({status:'error',error:'Invalid username/password'})
  }
});


app.get('/api/private/users/',verifyToken,(req,res) => {
try {
    res.json({status:'success',message:'Korunmus route'})
  
} catch (error) {
    res.status(403).json({status:'error',error:'You are not allowed to delete this user'})
  
}
});

app.get('/api/public/users/',(req,res) => {
try {
    res.json({status:'success',message:'Beles route'})
  
} catch (error) {
    res.status(403).json({status:'error',error:'You are not allowed to delete this user'})
  
}
});


app.listen(port, () => console.log(`Server started on port  ${port}`));
