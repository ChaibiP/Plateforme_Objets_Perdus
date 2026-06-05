function layout(content, req) {
  const user = req.session ? req.session.user : null;
  return `
  <html>
  <head>
    <title>Objets trouvés</title>
    <link rel="stylesheet" href="/css/style.css">
  </head>
  <body>
    <nav class="nav">
      <div>
        <a href="/">Accueil</a>
        <a href="/items/new">Ajouter</a>
        <a href="/profile">Profil</a>
      </div>
      <div>
        ${
          user
            ? `${user.name} | <a href="/logout">Logout</a>`
            : `<a href="/login">Login</a> <a href="/register">Register</a>`
        }
      </div>
    </nav>
    <div class="container">
      ${content}
    </div>
  </body>
  </html>
  `;
}
module.exports = layout;