# CarLab - Application de Gestion de Réservations de Véhicules

Application full-stack développée pour la gestion de réservations de véhicules au sein d'une organisation. CarLab permet aux employés de réserver des véhicules pour leurs déplacements professionnels tout en garantissant la cohérence des réservations et la prévention des conflits.

## 📋 Table des matières

- [Contexte de l'application](#contexte-de-lapplication)
- [Choix techniques effectués](#choix-techniques-effectués)
- [Principales fonctionnalités implémentées](#principales-fonctionnalités-implémentées)
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

## 📖 Contexte de l'application

### Origine du projet

CarLab a été développé dans le cadre d'un test pratique pour le recrutement de stagiaire développeur full-stack au **Togo Data Lab**. L'objectif était de créer une application complète permettant aux employés d'une organisation de réserver des véhicules pour leurs déplacements professionnels.

### Problématique

Les organisations disposant d'un parc de véhicules ont besoin d'un système pour :
- Gérer les réservations de véhicules de manière centralisée
- Éviter les conflits et les chevauchements de réservations
- Faciliter la gestion administrative du parc automobile
- Offrir une expérience utilisateur moderne et intuitive

### Objectifs

CarLab répond à ces besoins en proposant :
- Une interface web moderne et responsive
- Un système de réservation avec validation automatique des conflits
- Un panneau d'administration complet
- Une fonctionnalité de recommandation intelligente basée sur l'IA

### Public cible

- **Employés** : Pour réserver des véhicules pour leurs déplacements professionnels
- **Administrateurs** : Pour gérer le parc de véhicules et superviser les réservations

## 🛠️ Choix techniques effectués

### Architecture Full-Stack avec Nuxt.js 3

**Choix** : Nuxt.js 3 comme framework principal

**Justification** :
- **Unification frontend/backend** : Nuxt.js permet de développer le frontend et le backend dans un même projet, simplifiant la structure et le déploiement
- **Server-Side Rendering (SSR)** : Améliore les performances et le SEO
- **API Routes intégrées** : Pas besoin d'un serveur backend séparé, les routes API sont directement dans le projet
- **TypeScript/JavaScript** : Support natif, développement rapide
- **Écosystème Vue.js** : Framework moderne et performant avec une grande communauté

### Base de données : MongoDB avec Mongoose

**Choix** : MongoDB (NoSQL) avec Mongoose comme ODM

**Justification** :
- **Flexibilité du schéma** : Permet d'ajouter facilement de nouveaux champs sans migrations complexes
- **Document-oriented** : Structure de données naturelle pour les réservations et véhicules
- **Scalabilité** : MongoDB est conçu pour la scalabilité horizontale
- **Mongoose** : Fournit un schéma, validation et méthodes utiles tout en gardant la flexibilité de MongoDB
- **MongoDB Atlas** : Solution cloud facile à déployer et maintenir

### Authentification : JWT (JSON Web Tokens)

**Choix** : JWT pour l'authentification

**Justification** :
- **Stateless** : Pas besoin de stocker les sessions côté serveur
- **Scalable** : Fonctionne bien avec plusieurs serveurs
- **Sécurisé** : Tokens signés et optionnellement chiffrés
- **Standard** : Protocole largement adopté et bien documenté
- **Cookies httpOnly** : Protection contre les attaques XSS

### Styling : Tailwind CSS

**Choix** : Tailwind CSS pour le styling

**Justification** :
- **Utility-first** : Développement rapide sans écrire de CSS personnalisé
- **Responsive** : Classes intégrées pour le responsive design
- **Personnalisable** : Configuration facile via `tailwind.config.js`
- **Performance** : Purge automatique du CSS non utilisé
- **Moderne** : Framework très populaire et maintenu activement

### State Management : Pinia

**Choix** : Pinia pour la gestion d'état

**Justification** :
- **Successeur de Vuex** : Recommandé par l'équipe Vue.js
- **TypeScript-friendly** : Meilleure intégration TypeScript
- **Plus simple** : API plus intuitive que Vuex
- **DevTools** : Support natif des Vue DevTools
- **Modulaire** : Stores séparés par domaine (auth, vehicles, reservations)

### Sécurité : bcryptjs pour le hachage

**Choix** : bcryptjs pour le hachage des mots de passe

**Justification** :
- **Sécurité** : Algorithme de hachage robuste et éprouvé
- **Salt automatique** : Protection contre les rainbow tables
- **Configurable** : Nombre de rounds ajustable selon les besoins de sécurité
- **Standard** : Solution standard de l'industrie

### Recommandations IA : Google Gemini

**Choix** : Google Gemini AI pour les recommandations

**Justification** :
- **Puissance** : Modèle de langage avancé pour comprendre les besoins
- **API simple** : Intégration facile via API REST
- **Gratuit** : Plan gratuit disponible pour le développement
- **Flexible** : Peut analyser des descriptions textuelles complexes

### Autres choix techniques

- **date-fns** : Manipulation moderne des dates (alternative à Moment.js)
- **Architecture modulaire** : Séparation claire entre composants, pages, stores, API
- **Middleware** : Protection des routes avec authentification et autorisation
- **Validation côté serveur** : Toutes les données validées avant traitement

## ✨ Principales fonctionnalités implémentées

### Priorité 1 : Fonctionnalités obligatoires ✅

#### 1. Système d'authentification complet
- **Inscription** : Création de compte avec validation des données
- **Connexion** : Authentification sécurisée avec JWT
- **Gestion de session** : Persistance de l'authentification
- **Déconnexion** : Nettoyage de la session
- **Protection des routes** : Middleware pour protéger les pages nécessitant une authentification

#### 2. Gestion des véhicules
- **Liste des véhicules** : Affichage de tous les véhicules avec pagination
- **Détails complets** : Informations détaillées (marque, modèle, année, type, etc.)
- **Recherche et filtres** : Filtrage par type, marque, couleur, disponibilité
- **Upload d'images** : Gestion des images pour chaque véhicule
- **Gestion administrative** : CRUD complet pour les administrateurs

#### 3. Création de réservations
- **Formulaire complet** : Dates, heures, lieux de prise en charge/retour
- **Validation des dates** : Vérification de cohérence (début < fin, pas de passé)
- **Raison de réservation** : Champ pour documenter le besoin
- **Interface intuitive** : Modal et page dédiée pour la réservation

#### 4. Validation des conflits de réservation
- **Détection automatique** : Vérification des chevauchements de périodes
- **Prévention des doubles réservations** : Un véhicule ne peut pas être réservé deux fois sur la même période
- **Vérification en temps réel** : API pour vérifier la disponibilité avant réservation
- **Messages d'erreur clairs** : Feedback utilisateur en cas de conflit

### Priorité 2 : Fonctionnalités recommandées ✅

#### 5. Liste des réservations utilisateur
- **Vue d'ensemble** : Toutes les réservations de l'utilisateur connecté
- **Filtrage par statut** : pending, confirmed, active, completed, cancelled
- **Détails complets** : Informations détaillées de chaque réservation
- **Cartes visuelles** : Interface moderne avec cartes de réservation

#### 6. Modification et annulation de réservations
- **Modification** : Mise à jour des dates, heures, lieux
- **Annulation** : Annulation avec confirmation
- **Validation** : Vérification des conflits lors de la modification
- **Mise à jour en temps réel** : Synchronisation immédiate des changements

#### 7. Filtrage avancé des véhicules
- **Recherche par dates** : Trouver les véhicules disponibles pour une période
- **Filtres multiples** : Type, marque, couleur, nombre de places
- **Recherche textuelle** : Recherche dans les marques, modèles, types
- **API dédiée** : Endpoint `/api/vehicles/available` pour la disponibilité

### Priorité 3 : Fonctionnalités bonus ✅

#### 8. Gestion des rôles (admin/utilisateur)
- **Système de rôles** : Distinction entre utilisateurs et administrateurs
- **Panneau d'administration** : Interface dédiée pour les admins
- **Permissions différenciées** : Accès restreint selon le rôle
- **Middleware d'autorisation** : Protection des routes admin

#### 9. Historique des réservations
- **Statuts multiples** : Gestion complète du cycle de vie des réservations
- **Historique accessible** : Consultation de toutes les réservations passées
- **Filtrage par statut** : Navigation facile dans l'historique

#### 10. Recommandation IA
- **Analyse intelligente** : Utilisation de Google Gemini AI
- **Suggestions personnalisées** : Recommandations basées sur la destination et la description
- **Scores de pertinence** : Chaque recommandation inclut un score
- **Explications détaillées** : Raisons de chaque recommandation

#### 11. Upload et gestion d'images
- **Upload depuis PC** : Sélection de fichiers locaux
- **Aperçu en temps réel** : Visualisation avant upload
- **Validation** : Vérification du type et de la taille
- **Stockage** : Gestion des images dans `public/uploads/vehicles/`

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



---

**CarLab** - Simplifiez la gestion de vos réservations de véhicules
