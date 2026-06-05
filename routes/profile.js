const express = require('express');
const router = express.Router();
const db = require('../config/db');
const layout = require('../views/layout');
const { isLoggedIn } = require('../middleware/auth');
router.get('/profile', isLoggedIn, (req, res) => {
  db.all("SELECT * FROM items WHERE user_id = ?", [req.session.user.id], (err, rows) => {
    let html = "<h1>Mes objets</h1>";
    rows.forEach(item => {
      html += `
        <div>
          <h3>${item.title}</h3>
          <p><strong>Statut :</strong> ${item.status}</p>
          <p><strong>Catégorie :</strong> ${item.category}</p>
          <p><strong>Lieu :</strong> ${item.location}</p>
          ${item.image ? `<img src="/uploads/${item.image}" width="200">` : ''}
          <a href="/items/${item.id}">Voir</a>
          <form method="POST" action="/items/${item.id}/resolve">
            <button>Marquer comme récupéré</button>
          </form>
          <form method="POST" action="/items/${item.id}/delete" onsubmit="return confirm('Supprimer cet objet ?')">
            <button>Supprimer</button>
          </form>
                    </form>
        </div>
      `;
    });
    res.send(layout(html, req));
  });
});
module.exports = router;