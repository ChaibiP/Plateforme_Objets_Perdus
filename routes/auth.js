const express = require('express');
const router = express.Router();
const db = require('../config/db');
const layout = require('../views/layout');
const bcrypt = require('bcrypt');
router.get('/register', (req, res) => {
  res.send(layout(`
    <form method="POST">
      <input name="name" placeholder="Nom" required />
      <input name="email" placeholder="Email" required />
      <input name="password" type="password" required />
      <button>Register</button>
    </form>
  `, req));
});
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  db.get("SELECT * FROM users WHERE email = ?", [email], async (err, user) => {
    if (err) {
      return res.send("Erreur serveur");
    }
    if (user) {
      return res.send(layout(`
        <h1>Inscription</h1>
        <p>Cet email est déjà utilisé</p>
        <form method="POST">
          <input name="name" placeholder="Nom" required />
          <input name="email" placeholder="Email" required />
          <input name="password" type="password" required />
          <button>Register</button>
        </form>
      `, req));
    }
    const hashed = await bcrypt.hash(password, 10);
    db.run(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashed],
      function (err) {
        if (err) {
          return res.send("Erreur lors de l'inscription");
        }
        res.redirect('/login');
      }
    );
  });
});
router.get('/login', (req, res) => {
  res.send(layout(`
    <h1>Connexion</h1>
    <form method="POST">
      <input name="email" required />
      <input name="password" type="password" required />
      <button>Login</button>
    </form>
  `, req));
});
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  db.get("SELECT * FROM users WHERE email = ?", [email], async (err, user) => {
    if (user && await bcrypt.compare(password, user.password)) {
      req.session.user = {
        id: user.id,
        name: user.name,
        email: user.email
      };
      res.redirect('/');
    } else {
      res.send("Erreur login");
    }
  });
});
router.get('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/'));
});
module.exports = router;