# 🌟 JoJo's Bizarre Adventure - Base de Données Personnages

Un site web interactif pour suivre et organiser vos personnages préférés de JoJo's Bizarre Adventure !

## ✨ Fonctionnalités

- ➕ **Ajouter des personnages** avec leurs informations complètes
- ✏️ **Modifier** les informations des personnages existants
- 🗑️ **Supprimer** des personnages
- 🔍 **Rechercher** dans la base de données
- 🎯 **Filtrer** par partie, alignement et statut
- 📥 **Exporter** les données en JSON
- 📤 **Importer** des données JSON
- 💾 **Stockage local** dans le navigateur (localStorage)

## 📋 Informations stockées pour chaque personnage

- Nom du personnage
- Photo (URL)
- Partie de JoJo
- Nom du Stand
- Alignement (Gentil, Méchant, Neutre, Anti-héros)
- Statut (Vivant, Mort, Inconnu)
- Relations et parenté
- Notes personnelles

## 🚀 Installation et déploiement sur GitHub Pages

### 1. Créer un nouveau dépôt GitHub

1. Allez sur [GitHub](https://github.com) et créez un nouveau dépôt
2. Nommez-le par exemple : `jojo-characters-database`
3. Rendez-le public (nécessaire pour GitHub Pages gratuit)

### 2. Cloner et uploader les fichiers

```bash
# Cloner votre dépôt (remplacez USERNAME et REPO_NAME)
git clone https://github.com/USERNAME/REPO_NAME.git
cd REPO_NAME

# Copier tous les fichiers du projet dans ce dossier
# (index.html, style.css, script.js, README.md, data.json)

# Ajouter les fichiers
git add .

# Commit
git commit -m "Initial commit: JoJo Characters Database"

# Push
git push origin main
```

### 3. Activer GitHub Pages

1. Allez dans les **Settings** de votre dépôt GitHub
2. Dans le menu de gauche, cliquez sur **Pages**
3. Sous **Source**, sélectionnez la branche **main** (ou **master**)
4. Dans le dossier, sélectionnez **/ (root)**
5. Cliquez sur **Save**
6. Votre site sera disponible à l'adresse : `https://USERNAME.github.io/REPO_NAME/`

### 4. Mettre à jour le site

Chaque fois que vous modifiez les fichiers :

```bash
git add .
git commit -m "Description de vos modifications"
git push origin main
```

Les modifications seront automatiquement disponibles sur GitHub Pages après quelques minutes.

## 📝 Mise à jour des données pour tous les utilisateurs

### Option 1 : Utiliser l'export/import local

Actuellement, les données sont stockées dans le navigateur de chaque utilisateur (localStorage). Pour partager vos données :

1. **Exportez** vos données via le bouton "Exporter les données (JSON)"
2. **Ajoutez** le fichier `jojo-characters.json` à votre dépôt GitHub
3. Les autres utilisateurs peuvent **importer** ce fichier dans leur navigateur

### Option 2 : Fichier data.json partagé (à venir)

Pour une synchronisation automatique, vous pouvez :

1. Exporter vos données et les sauvegarder dans `data.json` dans le dépôt
2. Les nouveaux visiteurs chargeront automatiquement ces données
3. Chacun pourra ensuite personnaliser sa propre copie locale

## 🎨 Personnalisation

### Changer les couleurs

Modifiez les variables CSS dans `style.css` :

```css
:root {
    --primary-color: #ff6b35;
    --secondary-color: #004e89;
    --accent-color: #f77f00;
    /* ... */
}
```

### Ajouter des parties de JoJo

Dans `index.html`, ajoutez des options dans les `<select>` pour les parties :

```html
<option value="Part X: Nom de la partie">Part X: Nom de la partie</option>
```

## 📱 Compatibilité

- ✅ Compatible avec tous les navigateurs modernes
- ✅ Responsive (fonctionne sur mobile, tablette et desktop)
- ✅ Fonctionne hors ligne une fois chargé

## 🛠️ Technologies utilisées

- HTML5
- CSS3 (avec variables CSS et animations)
- JavaScript (vanilla, pas de dépendances)
- localStorage pour le stockage local
- GitHub Pages pour l'hébergement

## 📄 Licence

Libre d'utilisation et de modification !

## 🙏 Contribution

N'hésitez pas à améliorer ce projet et à partager vos suggestions !

---

**Fait avec ❤️ pour les fans de JoJo's Bizarre Adventure**

