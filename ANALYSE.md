# Analyse du Test Pratique - Gestion de Réservations de Véhicules

## 1. Contexte et Objectifs

### Contexte
- **Organisation** : Togo Data Lab
- **Poste** : Stagiaire Développeur Full-Stack
- **Type de projet** : Application web de gestion de réservations de véhicules pour une organisation

### Objectif Principal
Développer une application full-stack permettant aux employés d'une organisation de réserver des véhicules pour leurs déplacements professionnels, en évitant les conflits d'usage et les chevauchements de réservations.

## 2. Exigences Fonctionnelles

### 2.1 Authentification
- ✅ Système d'authentification des utilisateurs
- Les utilisateurs doivent pouvoir se connecter à l'application

### 2.2 Gestion des Véhicules
- ✅ Consultation de la liste des véhicules disponibles
- Affichage des véhicules du parc

### 2.3 Gestion des Réservations
- ✅ Création de réservations par les utilisateurs
- ✅ Prévention des conflits de disponibilité
- ✅ Empêcher les chevauchements de périodes pour un même véhicule
- Validation de la cohérence des réservations

## 3. Contraintes Techniques Minimales

### Architecture Requise
- **Frontend** : Interface utilisateur
- **Backend** : API/Service backend
- **Authentification** : Mécanisme d'authentification obligatoire

### Liberté Technique
- Le candidat est libre dans ses choix techniques
- Liberté dans la profondeur fonctionnelle
- Focus sur la structuration, les règles métier, la sécurité et la documentation

## 4. Livrables Attendus

### 4.1 Code Source
- ✅ Dépôt Git contenant l'ensemble du code source
- ✅ Application exécutable localement
- ✅ Instructions de lancement incluses

### 4.2 Documentation
- ✅ README avec :
  - Contexte de l'application
  - Choix techniques effectués
  - Principales fonctionnalités implémentées

## 5. Analyse des Règles Métier

### 5.1 Règles Critiques Identifiées
1. **Unicité temporelle** : Un véhicule ne peut pas être réservé par plusieurs personnes sur des périodes qui se chevauchent
2. **Validation des dates** : 
   - Date de début < Date de fin
   - Pas de réservation dans le passé (sauf peut-être pour historique)
3. **Disponibilité** : Vérifier la disponibilité avant de créer une réservation

### 5.2 Entités Probables
- **User/Utilisateur** : Employés de l'organisation
- **Vehicle/Véhicule** : Voitures du parc
- **Reservation** : Réservations effectuées
  - Relation : User → Reservation ← Vehicle
  - Attributs : date_debut, date_fin, statut, etc.

## 6. Recommandations Techniques

### 6.1 Stack Technique Suggérée

#### Frontend
- **Framework moderne** : React, Vue.js, ou Angular
- **UI Library** : Material-UI, Ant Design, ou Tailwind CSS
- **Gestion d'état** : Redux, Zustand, ou Context API
- **Routing** : React Router, Vue Router, etc.

#### Backend
- **Langage** : Node.js/Express, Python/Django/Flask, Java/Spring Boot, ou autre
- **Base de données** : PostgreSQL, MySQL, ou MongoDB
- **ORM/ODM** : Selon le choix (Sequelize, Prisma, Mongoose, etc.)

#### Authentification
- **JWT** (JSON Web Tokens) pour l'authentification stateless
- **Sessions** avec cookies sécurisés
- **OAuth2** si besoin d'intégration externe

### 6.2 Fonctionnalités à Implémenter

#### Priorité 1 (Obligatoires)
- [x] Authentification (login/register ou login uniquement)
- [x] Liste des véhicules
- [x] Création de réservation
- [x] Validation des conflits de réservation

#### Priorité 2 (Recommandées)
- [ ] Liste des réservations de l'utilisateur
- [ ] Modification/Annulation de réservation
- [ ] Filtrage des véhicules par disponibilité
- [ ] Calendrier de visualisation des réservations

#### Priorité 3 (Bonus)
- [ ] Gestion des rôles (admin/utilisateur)
- [ ] Historique des réservations
- [ ] Notifications
- [ ] Export des données

### 6.3 Sécurité à Considérer
- Validation des entrées utilisateur
- Protection CSRF
- Hachage des mots de passe (bcrypt, argon2)
- Validation des tokens JWT
- Rate limiting sur les API
- Sanitization des données

## 7. Structure de Projet Recommandée

```
carLab/
├── frontend/          # Application frontend
│   ├── src/
│   ├── public/
│   └── package.json
├── backend/           # API backend
│   ├── src/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── package.json
├── database/          # Scripts de migration/seed
├── docs/              # Documentation supplémentaire
├── README.md          # Documentation principale
└── .gitignore
```

## 8. Points d'Attention

### 8.1 Gestion des Conflits de Réservation
- **Critique** : Implémenter une logique robuste pour détecter les chevauchements
- **Algorithme** : Vérifier si (date_debut_reservation < date_fin_existante) ET (date_fin_reservation > date_debut_existante)
- **Transaction** : Utiliser des transactions DB pour éviter les race conditions

### 8.2 Validation des Dates
- Vérifier que date_debut < date_fin
- Gérer les fuseaux horaires
- Validation côté client ET serveur

### 8.3 Expérience Utilisateur
- Messages d'erreur clairs
- Feedback visuel lors des actions
- Gestion des états de chargement

## 9. Plan d'Implémentation Suggéré

### Phase 1 : Setup et Infrastructure
1. Initialiser les projets frontend et backend
2. Configurer la base de données
3. Mettre en place l'authentification de base

### Phase 2 : Modèles et API de Base
1. Créer les modèles (User, Vehicle, Reservation)
2. Implémenter les routes CRUD de base
3. Tester les endpoints

### Phase 3 : Règles Métier
1. Implémenter la logique de détection de conflits
2. Ajouter les validations nécessaires
3. Tester les cas limites

### Phase 4 : Interface Utilisateur
1. Pages d'authentification
2. Liste des véhicules
3. Formulaire de réservation
4. Liste des réservations

### Phase 5 : Finalisation
1. Tests
2. Documentation
3. Instructions de déploiement

## 10. Questions à Clarifier (Optionnel)

- Les utilisateurs peuvent-ils modifier/annuler leurs réservations ?
- Y a-t-il des rôles différents (admin, utilisateur) ?
- Les véhicules ont-ils des attributs spécifiques (marque, modèle, capacité) ?
- Y a-t-il des restrictions de durée de réservation ?
- Faut-il gérer les statuts de réservation (en attente, confirmée, annulée) ?
