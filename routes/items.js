const express = require('express');
const router = express.Router();
const db = require('../config/db');
const layout = require('../views/layout');
const { isLoggedIn } = require('../middleware/auth');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });
router.get('/', (req, res) => {
  const { q, status, category } = req.query;
  let query = "SELECT * FROM items WHERE 1=1";
  let params = [];
  if (q) {
    query += " AND title LIKE ?";
    params.push(`%${q}%`);
  }
  if (status) {
    query += " AND status = ?";
    params.push(status);
  }
  if (category) {
    query += " AND category LIKE ?";
    params.push(`%${category}%`);
  }
  db.all(query, params, (err, rows) => {
    let html = `
      <h1>Objets perdus / trouvés Saint-Charles : Si vous avez perdu ou trouvé un objet a la faculté , signalez le ici !</h1>
      <form method="GET" action="/" class="form">
        <input name="q" value="${q || ''}" placeholder="Rechercher un objet..." />
        <select name="status">
          <option value="">Tous</option>
          <option value="Perdu" ${status === 'Perdu' ? 'selected' : ''}>Perdu</option>
          <option value="Trouvé" ${status === 'Trouvé' ? 'selected' : ''}>Trouvé</option>
          <option value="Récupéré" ${status === 'Récupéré' ? 'selected' : ''}>Récupéré</option>
        </select>
        <input name="category" value="${category || ''}" placeholder="Catégorie..." />
        <button>Filtrer</button>
      </form>
      <br>
    `;
    if (rows.length === 0) {
        html += `<p>Aucun objet trouvé...</p>`;
    } else {
        rows.forEach(item => {
        html += `
            <div class="card">
            <h3>${item.title}</h3>
            <p><strong>Statut :</strong> ${item.status}</p>
            <p><strong>Catégorie :</strong> ${item.category}</p>
            <p><strong>Lieu :</strong> ${item.location}</p>
            ${item.image ? `<img src="/uploads/${item.image}" width="200">` : ''}
            <a href="/items/${item.id}">Voir</a>
            </div>
        `;
      });
    }
    res.send(layout(html, req));
  });
});
router.get('/items/new', isLoggedIn, (req, res) => {
  res.send(layout(`
    <form method="POST" enctype="multipart/form-data">
      <label>Titre : </label>
      <input name="title" placeholder="Ex : Clé perdue, iPhone..." required />
      <br>
      <label>Description : </label>
      <br>
      <textarea name="description" placeholder="Décrivez l'objet..." required></textarea>
      <br>
      <label>Type d'objet / Catégorie : </label>
      <input name="category" placeholder="Ex : téléphone, clé, sac..." required />
       <br>
      <label>Lieu : </label>
      <input name="location" placeholder="Où l'objet a été perdu/trouvé ?" required />
      <br>
      <label>Contact : </label>
      <input name="contact" placeholder="Email, téléphone..." required />
      <br>
      <label>Image : </label>
      <input type="file" name="image" />
      <br>
      <label>Statut : </label>
      <select name="status" required>
        <option value="">-- Choisir --</option>
        <option value="Perdu">Perdu</option>
        <option value="Trouvé">Trouvé</option>
      </select>
      <button>Ajouter</button>
    </form>
  `, req));
});
router.post('/items/new', isLoggedIn, upload.single('image'), (req, res) => {
  const { title, description, category, location, status, contact } = req.body;
  const image = req.file ? req.file.filename : null;
  db.run(`
    INSERT INTO items (title, description, category, date, location, status, contact, image, user_id)
    VALUES (?, ?, ?, datetime('now'), ?, ?, ?, ?, ?)
  `,
  [title, description, category, location, status, contact, image, req.session.user.id],
  () => res.redirect('/')
  );
});
router.get('/items/:id', (req, res) => {
  db.get(`
    SELECT items.*, users.name as user_name
    FROM items
    JOIN users ON items.user_id = users.id
    WHERE items.id = ?
  `, [req.params.id], (err, item) => {

    const isMine = req.session.user && req.session.user.id === item.user_id;

    res.send(layout(`
      <h1>${item.title}</h1>
      <p><strong>Statut :</strong> ${item.status}</p>
      <p><strong>Catégorie :</strong> ${item.category}</p>
      <p><strong>Lieu :</strong> ${item.location}</p>
      ${item.image ? `<img src="/uploads/${item.image}" width="300">` : ''}
      <p><strong>Description : </strong>${item.description}</p>
      <p><strong>Contact : </strong>${item.contact}</p>
      <p><strong>Annonce publiée par :</strong> ${
      isMine ? "Moi" : item.user_name}</p>
      <a href='/'>Accueil</a>
    `, req));
  });
});

router.post('/items/:id/delete', isLoggedIn, (req, res) => {
  db.get("SELECT * FROM items WHERE id = ?", [req.params.id], (err, item) => {
    if (!item) return res.send("Objet introuvable")
    if (item.user_id !== req.session.user.id) {
      return res.send("Non autorisé");
    }
    db.run("DELETE FROM items WHERE id = ?", [req.params.id], () => {
      res.redirect('/profile');
    });
  });
});
router.post('/items/:id/resolve', isLoggedIn, (req, res) => {
  db.get("SELECT * FROM items WHERE id = ?", [req.params.id], (err, item) => {
    if (!item) return res.send("Objet introuvable");
    if (item.user_id !== req.session.user.id) {
      return res.send("Non autorisé");
    }
    db.run("UPDATE items SET status = 'Récupéré' WHERE id = ?", [req.params.id], () => {
      res.redirect('/profile');
    });
  });
});
module.exports = router;