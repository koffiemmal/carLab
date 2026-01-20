# Guide de Déploiement sur Vercel

Ce guide vous explique comment déployer CarLab sur Vercel.

## 📋 Prérequis

- Un compte Vercel (gratuit disponible)
- Un compte MongoDB Atlas (ou MongoDB local)
- Un dépôt Git (GitHub, GitLab, Bitbucket)

## 🚀 Déploiement

### 1. Préparer le projet

Assurez-vous que votre projet est prêt :

```bash
# Vérifier que tout fonctionne localement
npm run build
npm run preview
```

### 2. Connecter le projet à Vercel

1. Allez sur [vercel.com](https://vercel.com)
2. Connectez votre compte Git (GitHub, GitLab, etc.)
3. Importez votre projet CarLab
4. Vercel détectera automatiquement Nuxt.js

### 3. Configurer les variables d'environnement

**⚠️ IMPORTANT** : Configurez ces variables dans les paramètres du projet Vercel :

1. Allez dans **Settings** → **Environment Variables**
2. Ajoutez les variables suivantes :

| Variable | Description | Exemple |
|----------|-------------|---------|
| `MONGO_URI` | URI de connexion MongoDB | `mongodb+srv://user:pass@cluster.mongodb.net/carLab?retryWrites=true&w=majority` |
| `JWT_SECRET` | Secret pour signer les tokens JWT | `votre-secret-jwt-tres-securise-changez-en-production` |

**⚠️ SÉCURITÉ** : 
- Ne jamais commiter les secrets dans le code
- Utilisez un JWT_SECRET fort et unique en production
- Changez les identifiants MongoDB par défaut

### 4. Déployer

Vercel déploiera automatiquement à chaque push sur la branche principale.

Pour déployer manuellement :
```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Déployer
vercel --prod
```

## 🔧 Configuration Vercel

### Fichier vercel.json

Le fichier `vercel.json` est déjà configuré pour optimiser le déploiement :

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nuxtjs",
  "outputDirectory": ".output"
}
```

### Configuration Nuxt

Le fichier `nuxt.config.js` inclut le preset Vercel pour Nitro :

```javascript
nitro: {
  preset: process.env.NITRO_PRESET || 'vercel'
}
```

## 📝 Notes importantes

### Variables d'environnement

- Les variables d'environnement doivent être configurées dans Vercel
- Elles sont disponibles côté serveur via `runtimeConfig`
- Ne pas utiliser de valeurs par défaut en production

### Upload d'images

Les images uploadées sont stockées dans `public/uploads/vehicles/`. 

**⚠️ ATTENTION** : Sur Vercel, les fichiers uploadés ne persistent pas entre les redéploiements car le système de fichiers est en lecture seule.

**Solutions** :
1. Utiliser un service de stockage externe (AWS S3, Cloudinary, etc.)
2. Stocker les images dans MongoDB (GridFS)
3. Utiliser Vercel Blob Storage

### Base de données

- Utilisez MongoDB Atlas (recommandé pour la production)
- Configurez les IPs autorisées dans MongoDB Atlas pour inclure les IPs de Vercel
- Ou autorisez toutes les IPs (0.0.0.0/0) pour le développement

### Build et Performance

- Le build prend généralement 2-3 minutes
- Les warnings de dépendances dépréciées n'empêchent pas le déploiement
- Vercel optimise automatiquement les assets

## 🐛 Dépannage

### Erreur de build

Si le build échoue :

1. Vérifiez les logs dans Vercel Dashboard
2. Testez localement : `npm run build`
3. Vérifiez que toutes les dépendances sont dans `package.json`

### Erreur de connexion MongoDB

1. Vérifiez que `MONGO_URI` est correctement configurée
2. Vérifiez les IPs autorisées dans MongoDB Atlas
3. Testez la connexion avec un client MongoDB

### Images ne s'affichent pas

1. Vérifiez que les images sont bien uploadées
2. Vérifiez les permissions du dossier `public/uploads`
3. Considérez utiliser un service de stockage externe

### Erreur JWT

1. Vérifiez que `JWT_SECRET` est configuré
2. Utilisez un secret fort et unique
3. Ne partagez jamais le secret

## 📊 Monitoring

Vercel fournit :
- Logs en temps réel
- Analytics de performance
- Monitoring des erreurs
- Métriques de déploiement

## 🔄 Déploiements automatiques

Par défaut, Vercel déploie automatiquement :
- Chaque push sur `main` → Production
- Chaque push sur autres branches → Preview

Vous pouvez configurer cela dans **Settings** → **Git**.

## 📚 Ressources

- [Documentation Vercel](https://vercel.com/docs)
- [Documentation Nuxt](https://nuxt.com/docs)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

---

**Bon déploiement ! 🚀**
