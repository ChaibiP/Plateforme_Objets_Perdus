const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
require('dotenv').config();  

const authRoutes = require('./routes/auth');
const itemRoutes = require('./routes/items');
const profileRoutes = require('./routes/profile');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(session({
  secret: process.env.SESSION_SECRET,  
  resave: false,
  saveUninitialized: true,
  cookie: { 
    secure: process.env.NODE_ENV 
    httpOnly: true,  
    maxAge: 1000 * 60 * 60 * 24  
  }
}));
app.use('/', authRoutes);
app.use('/', itemRoutes);
app.use('/', profileRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
