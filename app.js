const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const itemRoutes = require('./routes/items');
const profileRoutes = require('./routes/profile');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}));
app.use('/', authRoutes);
app.use('/', itemRoutes);
app.use('/', profileRoutes);
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});