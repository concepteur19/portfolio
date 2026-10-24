# Backlog des features

Découpage de l'audit du 2026-10-22 en features Spec Kit. Chaque ligne devient un dossier `specs/00X-<nom>/` créé par `/speckit-specify`, puis passe par `/speckit-plan`, `/speckit-tasks` et `/speckit-implement`.

| # | Feature | Contenu | Priorité | Statut |
|---|---|---|---|---|
| 001 | `content-refresh-fixes` | Bugs bloquants (lien Articles en 404, bouton CV inactif, liens imbriqués, icônes invisibles, thème non mémorisé, résolu par une classe `dark` sans clignotement), contenu aligné sur le CV générique (10-2026), fautes, CV téléchargeable | P1 | Tâches rédigées |
| 002 | `project-showcase` | Modèle de projet avec liens multiples et/ou captures, cartes, page détail (étude de cas), galerie, projets mis en avant, filtres, projets confidentiels | P1 | Spec rédigée |
| 003 | `seo-analytics` | Titres et descriptions par page, images de partage, sitemap, robots, données structurées, mesure d'audience respectueuse de la vie privée | P1 | À spécifier |
| 004 | `ui-ux-refresh` | Nouvel ordre de l'accueil, hero avec appels à l'action, menu mobile, animations sobres, images optimisées, polices | P2 | À spécifier |
| 005 | `contact-form` | Page contact, formulaire avec anti-spam, notification par e-mail | P2 | À spécifier |
| 006 | `quality-ci` | Tests utiles, CI (lint + tests + build + liens), nettoyage du code mort, README | P2 | À spécifier |
| 007 | `blog-mdx` | Articles en MDX, liste, page article, flux RSS ; réactive le menu « Articles » | P3 | À spécifier |
| 008 | `admin-cms` | Espace d'administration : projets, articles, messages de contact, statistiques, sans redéploiement de code | P3 | À spécifier |
| 009 | `i18n-en` | Version anglaise complète du site | P3 | À spécifier |

## Dépendances

- 002 s'appuie sur le contenu nettoyé par 001.
- 003 réutilise les métadonnées de projet définies par 002.
- 007 et 008 dépendent de 002 : l'administration édite le même modèle de projet.
- 009 arrive après 004 pour ne traduire qu'une seule fois les textes stabilisés.

## Références

- Principes : [.specify/memory/constitution.md](../.specify/memory/constitution.md)
- Contenu source : [docs/career-timeline.md](../docs/career-timeline.md)
