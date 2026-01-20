# CarLab - Application de Gestion de Réservations de Véhicules

Application full-stack développée pour la gestion de réservations de véhicules au sein d'une organisation. CarLab permet aux employés de réserver des véhicules pour leurs déplacements professionnels tout en garantissant la cohérence des réservations et la prévention des conflits.

## 📋 Table des matières

- [Aperçu](#aperçu)
- [Fonctionnalités](#fonctionnalités)
- [Technologies utilisées](#technologies-utilisées)
- [Installation](#installation)
- [Configuration](#configuration)
- [Utilisation](#utilisation)
- [Structure du projet](#structure-du-projet)
- [API](#api)
- [Sécurité](#sécurité)
- [Design](#design)

## 🎯 Aperçu

CarLab est une application web moderne qui simplifie la gestion des réservations de véhicules. Elle offre :

- **Interface utilisateur intuitive** : Design moderne et responsive avec Tailwind CSS
- **Gestion complète des réservations** : Création, modification, annulation avec validation des conflits
- **Système d'authentification sécurisé** : JWT avec gestion de session
- **Panneau d'administration** : Gestion complète des véhicules et réservations
- **Recommandation IA** : Suggestions de véhicules adaptés basées sur l'IA (Google Gemini)

## ✨ Fonctionnalités

### 🔐 Authentification
- ✅ Inscription et connexion sécurisées
- ✅ Gestion de session avec JWT
- ✅ Rôles utilisateur (user/admin)
- ✅ Protection des routes avec middleware

### 🚗 Gestion des Véhicules
- ✅ Liste des véhicules avec recherche et filtres
- ✅ Détails complets de chaque véhicule
- ✅ Upload d'images pour les véhicules
- ✅ Filtrage par disponibilité, type, marque, couleur
- ✅ Gestion complète par les administrateurs (CRUD)

### 📅 Gestion des Réservations
- ✅ Création de réservations avec validation
- ✅ Prévention automatique des conflits de disponibilité
- ✅ Modification et annulation de réservations
- ✅ Filtrage par statut (pending, confirmed, active, completed, cancelled)
- ✅ Historique complet des réservations

### 🤖 Recommandation IA
- ✅ Suggestions de véhicules basées sur la destination et la description du trajet
- ✅ Analyse intelligente avec Google Gemini AI
- ✅ Scores de recommandation pour chaque véhicule

### 👨‍💼 Administration
- ✅ Dashboard administrateur avec statistiques
- ✅ Gestion complète des véhicules (ajout, modification, suppression)
- ✅ Vue d'ensemble de toutes les réservations
- ✅ Création de compte administrateur

## 🛠️ Technologies utilisées

### Frontend
- **Nuxt.js 3** - Framework Vue.js full-stack
- **Vue 3** - Framework JavaScript progressif
- **Tailwind CSS** - Framework CSS utility-first
- **Pinia** - State management pour Vue.js

### Backend
- **Nuxt.js Server API** - API routes intégrées
- **MongoDB** - Base de données NoSQL
- **Mongoose** - ODM pour MongoDB
- **JWT** - Authentification par tokens
- **bcryptjs** - Hachage des mots de passe

### Utilitaires
- **date-fns** - Manipulation des dates
- **Google Gemini AI** - Recommandations intelligentes

## 🚀 Installation

### Prérequis

- **Node.js** 18+ et npm (ou yarn)
- **MongoDB** (local ou MongoDB Atlas)
- **Git**

### Étapes d'installation

1. **Cloner le dépôt**
```bash
git clone <url-du-depot>
cd carLab
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configurer les variables d'environnement**

Créez un fichier `.env` à la racine du projet (optionnel, des valeurs par défaut sont définies dans `nuxt.config.js`) :

```env
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/carLab?retryWrites=true&w=majority
JWT_SECRET=votre-secret-jwt-changez-en-production
```

4. **Lancer l'application en mode développement**
```bash
npm run dev
```

L'application sera accessible sur `http://localhost:3000`

5. **Initialiser les données de test** (optionnel)

Après vous être connecté en tant qu'admin, vous pouvez appeler l'endpoint `/api/seed` pour créer des données de test.

## ⚙️ Configuration

### Variables d'environnement

Les variables suivantes peuvent être configurées dans un fichier `.env` :

- `MONGO_URI` : URI de connexion MongoDB
- `JWT_SECRET` : Secret pour signer les tokens JWT

### Configuration MongoDB

L'application utilise MongoDB pour stocker les données. Vous pouvez :
- Utiliser MongoDB Atlas (cloud)
- Installer MongoDB localement
- Utiliser la connexion par défaut fournie dans `nuxt.config.js`

## 📖 Utilisation

### Premier lancement

1. **Créer un compte administrateur**

Accédez à `/api/admin/init` pour créer le compte admin par défaut :
- Email : `admin@carlab.com`
- Mot de passe : `admin123`

2. **Créer un compte utilisateur**

Inscrivez-vous via la page `/register` ou utilisez les données de test après avoir appelé `/api/seed`.

3. **Se connecter**

Connectez-vous avec vos identifiants sur la page `/login`.

### Utilisation en tant qu'utilisateur

- **Parcourir les véhicules** : Accédez à `/vehicles` pour voir tous les véhicules disponibles
- **Réserver un véhicule** : Cliquez sur "Voir détails" puis "Réserver" ou utilisez la page de réservation
- **Consulter vos réservations** : Accédez à `/reservations` pour voir toutes vos réservations
- **Obtenir des recommandations IA** : Utilisez la page `/ai-recommend` pour des suggestions personnalisées

### Utilisation en tant qu'administrateur

- **Dashboard** : Vue d'ensemble sur `/admin`
- **Gestion des véhicules** : Ajout, modification, suppression sur `/admin/vehicles`
- **Gestion des réservations** : Vue complète sur `/admin/reservations`

## 📁 Structure du projet

```
carLab/
├── assets/              # Assets statiques (CSS, images)
│   ├── css/            # Styles globaux
│   └── logo/           # Logos de l'application
├── components/         # Composants Vue réutilisables
│   ├── Header.vue
│   ├── Sidebar.vue
│   ├── VehicleCard.vue
│   ├── VehicleDetailsModal.vue
│   └── ...
├── layouts/            # Layouts de page
│   └── default.vue
├── middleware/         # Middleware de route
│   ├── auth.js        # Protection par authentification
│   └── admin.js       # Protection par rôle admin
├── pages/             # Pages Vue (routing automatique)
│   ├── admin/         # Pages d'administration
│   ├── vehicles/      # Pages des véhicules
│   ├── reservations/   # Pages des réservations
│   └── ...
├── plugins/           # Plugins Nuxt
│   ├── auth.client.js # Plugin d'authentification client
│   └── fetch.client.js # Intercepteur fetch
├── public/            # Fichiers publics statiques
│   └── uploads/       # Images uploadées
├── server/            # Code serveur
│   ├── api/           # Routes API
│   │   ├── auth/      # Authentification
│   │   ├── vehicles/   # Véhicules
│   │   ├── reservations/ # Réservations
│   │   ├── admin/     # Administration
│   │   └── ai/        # Recommandations IA
│   ├── models/        # Modèles Mongoose
│   │   ├── User.js
│   │   ├── Vehicle.js
│   │   └── Reservation.js
│   ├── utils/         # Utilitaires serveur
│   │   ├── auth.js    # Utilitaires d'authentification
│   │   └── db.js      # Connexion base de données
│   └── plugins/       # Plugins serveur
│       └── mongodb.js # Plugin MongoDB
├── stores/            # Stores Pinia
│   ├── auth.js       # Store d'authentification
│   ├── vehicles.js    # Store des véhicules
│   └── reservations.js # Store des réservations
├── app.vue           # Composant racine
├── nuxt.config.js    # Configuration Nuxt
├── tailwind.config.js # Configuration Tailwind
└── package.json      # Dépendances et scripts
```

## 🔌 API

### Authentification

| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| POST | `/api/auth/register` | Inscription d'un nouvel utilisateur | Non |
| POST | `/api/auth/login` | Connexion | Non |
| GET | `/api/auth/me` | Informations de l'utilisateur connecté | Oui |
| POST | `/api/auth/logout` | Déconnexion | Oui |

### Véhicules

| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| GET | `/api/vehicles` | Liste des véhicules (avec filtres) | Oui |
| GET | `/api/vehicles/:id` | Détails d'un véhicule | Oui |
| GET | `/api/vehicles/available` | Véhicules disponibles pour une période | Oui |
| POST | `/api/vehicles` | Créer un véhicule | Admin |
| PATCH | `/api/vehicles/:id` | Modifier un véhicule | Admin |
| DELETE | `/api/vehicles/:id` | Supprimer un véhicule | Admin |

### Réservations

| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| GET | `/api/reservations` | Liste des réservations (avec filtres) | Oui |
| GET | `/api/reservations/:id` | Détails d'une réservation | Oui |
| POST | `/api/reservations` | Créer une réservation | Oui |
| PATCH | `/api/reservations/:id` | Modifier une réservation | Oui |
| POST | `/api/reservations/:id/cancel` | Annuler une réservation | Oui |

### Administration

| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| POST | `/api/admin/init` | Créer le compte admin | Non |
| POST | `/api/admin/create` | Créer un utilisateur | Admin |
| POST | `/api/upload/image` | Upload d'image | Admin |

### Recommandations IA

| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| POST | `/api/ai/recommend` | Obtenir des recommandations IA | Oui |

## 🔒 Sécurité

### Mesures de sécurité implémentées

- **Hachage des mots de passe** : Utilisation de bcrypt avec 10 rounds de salt
- **JWT sécurisés** : Tokens signés avec expiration (7 jours)
- **Validation des entrées** : Validation côté serveur pour toutes les données
- **Protection des routes** : Middleware d'authentification et d'authorisation
- **Gestion des rôles** : Vérification des permissions admin
- **Upload sécurisé** : Validation des types et tailles de fichiers
- **Prévention des conflits** : Validation des chevauchements de réservations

### Bonnes pratiques

- Ne jamais exposer les secrets JWT dans le code client
- Utiliser des variables d'environnement pour les configurations sensibles
- Valider toutes les entrées utilisateur
- Implémenter des limites de taux (rate limiting) en production
- Utiliser HTTPS en production

## 🎨 Design

### Charte graphique

L'application utilise une palette de couleurs cohérente :

- **Primary (Jaune)** : `#eab308` - Actions principales, boutons primaires
- **Secondary (Vert)** : `#22c55e` - Éléments secondaires, confirmations
- **Accent (Orange)** : `#f97316` - Accents, badges, scores

### Caractéristiques du design

- **Responsive** : Adapté à tous les écrans (mobile, tablette, desktop)
- **Moderne** : Interface épurée avec animations fluides
- **Accessible** : Contraste et lisibilité optimisés
- **Intuitif** : Navigation claire et logique

## 📝 Règles métier

### Réservations

1. **Unicité temporelle** : Un véhicule ne peut pas être réservé par plusieurs personnes sur des périodes qui se chevauchent
2. **Validation des dates** :
   - Date de début < Date de fin
   - Pas de réservation dans le passé
   - Heure de début < Heure de fin
3. **Disponibilité** : Vérification de disponibilité avant création de réservation
4. **Statuts** : Gestion des statuts avec transitions appropriées
   - `pending` : En attente de confirmation
   - `confirmed` : Confirmée
   - `active` : En cours
   - `completed` : Terminée
   - `cancelled` : Annulée

### Véhicules

1. **Statuts** : `available`, `unavailable`, `maintenance`
2. **Validation** : Tous les champs requis doivent être remplis
3. **Images** : Formats acceptés : JPEG, PNG, GIF, WebP (max 5MB)

## 🧪 Tests

### Comptes de test

Après avoir appelé `/api/seed`, vous pouvez utiliser :

**Administrateur :**
- Email : `admin@carlab.com`
- Mot de passe : `admin123`

**Utilisateur :**
- Email : `user@carlab.com`
- Mot de passe : `user123`

### Scénarios de test

1. **Authentification** : Inscription, connexion, déconnexion
2. **Véhicules** : Parcourir, filtrer, rechercher
3. **Réservations** : Créer, modifier, annuler
4. **Conflits** : Tenter de réserver un véhicule déjà réservé
5. **Administration** : Gérer les véhicules et voir toutes les réservations
6. **Recommandations IA** : Obtenir des suggestions personnalisées

## 📦 Build pour production

```bash
# Build de l'application
npm run build

# Prévisualisation du build
npm run preview

# Génération statique (si nécessaire)
npm run generate
```

## 🚀 Déploiement

### Variables d'environnement en production

Assurez-vous de configurer :
- `MONGO_URI` : URI de connexion MongoDB sécurisée
- `JWT_SECRET` : Secret JWT fort et unique
- `NODE_ENV=production`

### Recommandations

- Utiliser HTTPS
- Configurer un reverse proxy (Nginx)
- Mettre en place un monitoring
- Configurer des sauvegardes MongoDB régulières
- Implémenter un rate limiting

## 🤝 Contribution

Ce projet a été développé dans le cadre d'un test pratique. Pour toute question ou amélioration :

1. Ouvrir une issue pour discuter des changements
2. Créer une branche pour votre fonctionnalité
3. Soumettre une pull request

## 📄 Licence

Ce projet est développé pour le Togo Data Lab dans le cadre d'un processus de recrutement.

## 👨‍💻 Auteur

Développé avec ❤️ pour le Togo Data Lab

---

**CarLab** - Simplifiez la gestion de vos réservations de véhicules
