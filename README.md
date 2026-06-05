# 📦 Plateforme Objets Perdus

Une plateforme web pour signaler et retrouver des objets perdus facilement.

## 🚀 Installation Rapide

### Prérequis
- Node.js (v14 ou supérieur)
- npm ou yarn

### Étapes

1. **Cloner le repository**
```bash
git clone https://github.com/ChaibiP/Plateforme_Objets_Perdus.git
cd Plateforme_Objets_Perdus
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configurer les variables d'environnement**
```bash
cp .env.example .env
```
Puis éditer `.env` avec vos valeurs personnelles

4. **Démarrer le serveur**
```bash
npm start
```

Le serveur sera accessible sur `http://localhost:3000`

---

## 📋 Fonctionnalités

- ✅ **Authentification** - Créer un compte et se connecter
- ✅ **Signaler un objet perdu** - Publier des annonces d'objets perdus
- ✅ **Rechercher des objets** - Trouver des objets disponibles
- ✅ **Profil utilisateur** - Gérer son profil et ses annonces

---

## 🏗️ Architecture Technique

### Stack
- **Backend** : Express.js
- **Frontend** : EJS (templates HTML)
- **Database** : SQLite
- **Sessions** : express-session

### Structure du Projet
```
.
├── app.js                 # Fichier principal
├── package.json           # Dépendances
├── database.db            # Base de données SQLite
├── config/                # Configuration
├── middleware/            # Middlewares personnalisés
├── routes/                # Routes API
│   ├── auth.js           # Authentification
│   ├── items.js          # Gestion des objets
│   └── profile.js        # Profil utilisateur
├── views/                # Templates EJS
└── public/               # Fichiers statiques (CSS, JS, images)
```

---

## 🔒 Configuration de Sécurité

### Variables d'environnement obligatoires
```env
PORT=3000                                    # Port du serveur
NODE_ENV=development                         # development ou production
SESSION_SECRET=clé_secrète_très_sécurisée   # Clé pour les sessions
DB_PATH=./database.db                        # Chemin de la base de données
```

### ⚠️ Points de sécurité importants
- ✅ Ne jamais commiter `.env` sur GitHub
- ✅ Utiliser une clé secrète forte en production
- ✅ Toujours utiliser HTTPS en production
- ✅ Valider tous les inputs utilisateur

---

## 📝 Scripts NPM

```bash
# Démarrer le serveur
npm start

# Démarrer en mode développement avec hot-reload
npm run dev

# Linter le code
npm run lint

# Tester l'application
npm test
```

---

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

---

## 📄 Licence

Ce projet est sous licence MIT - voir le fichier `LICENSE` pour plus de détails.

---

## 👨‍💻 Auteur

**ChaibiP** - [GitHub Profile](https://github.com/ChaibiP)

---

## 📞 Support

Pour toute question ou problème, ouvrez une [issue](https://github.com/ChaibiP/Plateforme_Objets_Perdus/issues) sur GitHub.

---

## 🎯 Prochaines étapes

- [ ] Ajouter des tests unitaires
- [ ] Améliorer la validation des inputs
- [ ] Ajouter plus de fonctionnalités de recherche
- [ ] Améliorer le design UI/UX
- [ ] Ajouter système de notifications
- [ ] Configurer CI/CD avec GitHub Actions
