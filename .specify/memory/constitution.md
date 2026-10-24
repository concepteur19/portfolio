# Portfolio Zobel Nguening Constitution

Portfolio personnel de **Zobel Ulrich Nguening Tchomgui**, ingénieur informaticien et développeur fullstack basé à Douala. Le site sert trois publics, dans cet ordre : les **recruteurs** (France, Canada, Cameroun), les **clients freelance** et les **pairs développeurs**. Il doit répondre en moins de 10 secondes à trois questions : *qui est-il, qu'a-t-il construit, comment le contacter*. Cette constitution fixe les principes que toute spec, tout plan et toute tâche doivent respecter.

## Core Principles

### I. À jour ou absent
Une information périmée coûte plus cher qu'une information manquante. Le parcours, le poste actuel, la stack et les projets reflètent le dernier CV validé (`docs/career-timeline.md` est la source de vérité). Aucune année, durée ou mention « actuellement » n'est écrite en dur quand elle peut être calculée. Un lien qui ne mène nulle part (page absente, bouton sans action, démo hors ligne) est retiré ou masqué, jamais laissé en place.

### II. Specification-first
Aucune implémentation ne commence sans une spec validée (`specs/00X-*/spec.md`). Les ambiguïtés sont documentées comme hypothèses marquées, jamais tranchées en silence dans le code. Une spec décrit le *quoi* et le *pourquoi* ; le *comment* vit dans `plan.md`.

### III. Le contenu est de la donnée, pas du code (NON-NEGOTIABLE)
Projets, expériences, formations, compétences et textes vivent dans des fichiers de contenu typés et validés par un schéma au build. Ajouter un projet (avec ou sans liens, avec ou sans captures) ne modifie jamais un composant. Un contenu invalide (champ obligatoire manquant, URL malformée, image sans texte alternatif) fait échouer le build avec un message qui nomme le fichier et le champ.

### IV. Mobile-first, accessible, rapide
Chaque écran est conçu pour 360 px d'abord. Navigation clavier complète, WCAG 2.2 AA, `prefers-reduced-motion` respecté, contraste valide dans les deux thèmes. Un seul `<h1>` par page. Budgets : Lighthouse ≥ 90 sur les quatre catégories ; aucune image servie au-delà de sa taille d'affichage ; LCP < 2,5 s en 4G.

### V. Visible et mesurable
Chaque page a un titre, une description et une image de partage propres. Le site expose un sitemap, un `robots.txt` et des données structurées `Person`. La mesure d'audience respecte la vie privée (pas de cookie tiers, pas de bannière nécessaire) et suit au minimum : pages vues, provenance, clics sur les projets, téléchargements du CV, contacts.

### VI. Simple d'abord
Site statique tant qu'aucune fonctionnalité n'exige un serveur. Le formulaire de contact, l'espace d'administration et le blog arrivent chacun par leur propre spec, quand le besoin est démontré. Aucune dépendance, abstraction ou dossier n'est ajouté pour un besoin futur hypothétique.

### VII. Confidentialité
L'adresse précise et tout document d'identité ne sont jamais publiés. Le numéro de téléphone n'apparaît ni dans les pages ni dans les fichiers de contenu du site ; il figure seulement dans le CV PDF téléchargeable, par choix de Zobel. Les fichiers publiés ne révèlent aucune candidature en cours (nom de fichier, métadonnées, texte). Les projets réalisés pour un employeur ou un client (notamment en mission chez Orange Cameroun) sont décrits au niveau public du produit : pas d'URL interne, pas de capture contenant des données réelles, pas de détail d'architecture non public. En cas de doute, le projet est marqué « confidentiel » et présenté sans lien ni capture.

## Constraints

- Stack : Next.js 16 (Pages Router, migration App Router par spec dédiée), React, TypeScript strict, Tailwind CSS 4, Vitest. Tout écart exige une décision tracée dans le `plan.md` concerné.
- Node 22 LTS, npm avec lockfile. Déploiement Vercel.
- Langue : documentation et specs en français ; code, identifiants et commits en anglais (Conventional Commits). Le site est en français ; l'anglais arrive par une spec dédiée.
- Aucun secret dans le dépôt ; variables d'environnement documentées dans le README.

## Development Workflow

1. `/speckit-specify` produit `spec.md` et sa checklist qualité.
2. `/speckit-clarify` si la spec contient des `[NEEDS CLARIFICATION]`.
3. `/speckit-plan` produit `plan.md`, `research.md`, `data-model.md`, `quickstart.md` ; le Constitution Check est bloquant.
4. `/speckit-tasks` produit `tasks.md` organisé par user story.
5. `/speckit-implement` sur une branche `00X-<feature>` ; PR vers `master` avec lint, tests et build verts.
6. Terminé = critères de succès de la spec vérifiés, aucun lien cassé, Lighthouse dans les budgets.

## Governance

Cette constitution prime sur toute autre pratique. Un amendement modifie ce fichier, incrémente la version (MAJOR : principe retiré ou redéfini ; MINOR : principe ou section ajoutés ; PATCH : clarification) et explique le changement dans le message de commit. Chaque plan vérifie la conformité aux principes I à VII ; toute violation est justifiée dans la section Complexity Tracking du plan.

**Version**: 1.1.0 | **Ratified**: 2026-10-22 | **Last Amended**: 2026-10-24
