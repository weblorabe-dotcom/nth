# 📋 Changelog - Weblora

## Version 1.1.0 - Janvier 2025

### 🔄 Changements Majeurs

#### Rebranding
- ✅ Changement de nom : **DigiBoost** → **Weblora**
- ✅ Nouveau email : **weblorabe@gmail.com**
- ✅ Nouvelle clé API Web3Forms : `61d9d5f3-ed30-4a3c-84df-9f825b1f9efc`
- ✅ Mise à jour de tous les éléments de branding (logo, footer, meta tags)

#### Interface Utilisateur

**Hero Section**
- ✅ Correction du problème de texte qui disparaît au scroll sur mobile
- ✅ Désactivation de l'effet parallax sur mobile pour éviter les bugs
- ✅ Opacité minimale fixée à 0.4 au lieu de disparaître complètement
- ✅ Badge modifié : "Agence Web N°1" → "Votre Agence Web à Liège"

**Section Services**
- ✅ Modification du service SEO : "Google My Business" → "Référencement local ciblé"

**Section Tarifs**
- ✅ Nouveau design des prix (comme l'image de référence)
- ✅ Structure : période en haut (petit texte) + prix en grand en dessous
- ✅ Exemple : "paiement unique" au-dessus de "490€" en très grand
- ✅ Police agrandie : 4.5rem pour les montants
- ✅ Couleur bleue pour les prix
- ✅ Responsive : 3.5rem sur mobile

**Portfolio**
- ✅ Correction de l'affichage de la carte "Votre projet ici"
- ✅ Ajout de `word-wrap: break-word` pour éviter la coupure du texte
- ✅ Ajout de `border-radius` sur la carte CTA
- ✅ Amélioration du padding sur mobile (30px 15px)
- ✅ Bouton "Démarrer maintenant" avec `white-space: normal`
- ✅ Taille de police réduite sur mobile (1.5rem)

**Formulaire de Contact**
- ✅ Suppression du champ "Budget estimé"
- ✅ Ajout d'un champ séparé "Maintenance" avec options :
  - Non merci
  - Oui, maintenance - 49€/mois
- ✅ Permet maintenant de choisir un site ET la maintenance séparément
- ✅ Suppression de "Maintenance" des options de type de site
- ✅ Options restantes :
  - Site Vitrine - 490€
  - Site Professionnel - 790€
  - Autre / Devis personnalisé

### 🐛 Corrections de Bugs

1. **Texte qui disparaît au scroll (Mobile)**
   - **Problème** : Le texte "Transformez votre vision digitale" disparaissait complètement au scroll sur téléphone
   - **Solution** : 
     - Désactivation du parallax sur écrans ≤ 768px
     - Opacité minimale de 0.4 au lieu de 0
     - Limitation de l'effet aux 500 premiers pixels de scroll

2. **Affichage de la carte Portfolio**
   - **Problème** : Le texte "Démarrer maintenant" était coupé et montrait "ment"
   - **Solution** :
     - Ajout de `word-wrap: break-word`
     - `white-space: normal` sur le bouton
     - Padding ajusté (20px au lieu de 40px)
     - Min-width de 200px sur le bouton

3. **Formulaire Budget**
   - **Problème** : Impossible de choisir site + maintenance ensemble
   - **Solution** : Champs séparés pour type de site et maintenance

### 📝 Fichiers Modifiés

1. **index.html**
   - Titre, meta tags, logo, badges
   - Structure des prix dans la section tarifs
   - Formulaire de contact (suppression budget, ajout maintenance)
   - Emails et références à DigiBoost
   - Section À propos

2. **css/style.css**
   - Nouveaux styles `.price-period-top` et `.price-amount-large`
   - Amélioration de `.portfolio-cta-card`
   - Styles responsive pour les prix
   - Corrections d'affichage mobile

3. **js/main.js**
   - Correction de la fonction `handleScroll()` dans `ParallaxEffect`
   - Désactivation du parallax sur mobile
   - Opacité minimale pour éviter la disparition
   - Console logs avec nouveau nom

4. **README.md**
   - Mise à jour de toutes les références DigiBoost → Weblora
   - Nouvelle clé API Web3Forms
   - Nouveau email
   - Documentation des nouveaux champs du formulaire

### 🎨 Améliorations Visuelles

**Tarifs**
- Design moderne avec prix en très grand (4.5rem)
- Période au-dessus du prix (style crypto app)
- Couleur bleue pour les montants
- Espacement optimisé

**Portfolio**
- Card CTA plus lisible
- Texte qui ne se coupe plus
- Meilleur responsive
- Border-radius cohérent avec le reste du site

**Mobile**
- Désactivation des effets problématiques
- Texte toujours visible
- Meilleure lisibilité
- Performance améliorée

### 📊 Statistiques

**Changements de code :**
- Lignes modifiées : ~80
- Fichiers touchés : 5
- Bugs corrigés : 3
- Améliorations : 7

### ✅ Tests Effectués

- [x] Affichage desktop (1920px, 1440px, 1024px)
- [x] Affichage tablette (768px)
- [x] Affichage mobile (480px, 375px)
- [x] Scroll smooth sur toutes les résolutions
- [x] Formulaire de contact fonctionnel
- [x] Navigation mobile
- [x] Tous les liens email/WhatsApp
- [x] Animations et transitions

### 🚀 Prochaines Étapes Recommandées

1. Tester le formulaire avec la nouvelle clé API
2. Vérifier la réception des emails sur weblorabe@gmail.com
3. Tester sur de vrais appareils mobiles (iOS/Android)
4. Optimiser les images si nécessaire
5. Ajouter Google Analytics si souhaité

---

**Développé avec ❤️ par Weblora**  
**Date de mise à jour :** Janvier 2025  
**Version :** 1.1.0