# Feature Specification: Contenu à jour et corrections bloquantes

**Feature Branch**: `001-content-refresh-fixes`

**Created**: 2026-10-22

**Status**: Draft

**Input**: User description: "Corriger les bugs relevés par l'audit, mettre le contenu à jour à partir du CV en vigueur (CV générique d'octobre 2026) et de l'historique de carrière, rendre le CV téléchargeable."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Un recruteur voit un profil à jour (Priority: P1)

Un recruteur arrive sur l'accueil depuis un lien de candidature. Il lit le titre, le poste actuel, les années d'expérience, la stack et le parcours. Tout correspond au CV qu'il a reçu.

**Why this priority**: le site n'a pas changé depuis octobre 2024. Il annonce « 18 mois d'expérience » et un poste terminé en janvier 2025. Chaque candidature envoyée avec ce lien affaiblit le dossier.

**Independent Test**: comparer, champ par champ, l'accueil et la page À propos avec `docs/career-timeline.md`.

**Acceptance Scenarios**:

1. **Given** l'accueil, **When** le recruteur lit l'en-tête, **Then** il voit « Ingénieur Logiciel Fullstack » (spécialités React, ASP.NET Core, Laravel) et le poste actuel (Développeur d'Applications Fullstack, INGSi (Sprint Pay), en mission chez Orange Cameroun).
2. **Given** la section Expérience, **When** il la parcourt, **Then** les postes, structures et périodes correspondent au parcours consolidé, du plus récent au plus ancien, et seul le poste en cours porte la mention « aujourd'hui ».
3. **Given** n'importe quelle page, **When** il lit la durée d'expérience ou l'année du pied de page, **Then** ces valeurs sont calculées à partir de la date du jour.
4. **Given** n'importe quel texte du site, **When** il est relu, **Then** il ne contient aucune faute d'orthographe ou d'accord.

---

### User Story 2 - Aucun chemin ne mène à une impasse (Priority: P1)

Un visiteur clique sur chaque élément interactif : menu, boutons, cartes de projet, icônes sociales. Chaque clic produit le résultat attendu.

**Why this priority**: un 404 dans le menu principal et un bouton « Télécharger mon CV » qui ne fait rien sont les deux défauts les plus visibles du site.

**Independent Test**: parcourir toutes les pages et activer chaque lien et bouton, à la souris et au clavier, dans les deux thèmes.

**Acceptance Scenarios**:

1. **Given** le menu principal, **When** le visiteur l'utilise, **Then** chaque entrée mène à une page existante ; l'entrée « Articles » est masquée tant que le blog n'existe pas.
2. **Given** le bouton « Télécharger mon CV », **When** le visiteur l'active, **Then** le CV PDF en vigueur se télécharge, sous un nom de fichier lisible.
3. **Given** la page Projets, **When** le visiteur active une carte, **Then** une seule destination s'ouvre et aucun projet sans destination ni contenu n'est affiché.
4. **Given** le thème clair, **When** le visiteur regarde les liens sociaux de la page À propos, **Then** les icônes sont visibles avec un contraste suffisant.

---

### User Story 3 - Le thème choisi est respecté (Priority: P2)

Un visiteur dont le système est en mode clair arrive sur le site, passe en sombre, puis recharge la page ou y revient le lendemain.

**Why this priority**: le thème repasse aujourd'hui en sombre à chaque chargement et ignore la préférence du système. C'est gênant, mais ça ne bloque pas.

**Independent Test**: tester une première visite (système clair, puis système sombre), un basculement et un rechargement.

**Acceptance Scenarios**:

1. **Given** une première visite sans choix enregistré, **When** la page s'affiche, **Then** le thème suit la préférence du système.
2. **Given** un thème choisi manuellement, **When** le visiteur recharge ou revient plus tard, **Then** ce thème est appliqué dès le premier affichage, sans clignotement.

---

### User Story 4 - Le site est lisible par tous et par les moteurs (Priority: P3)

Un visiteur qui utilise un lecteur d'écran, ou un moteur de recherche, parcourt les pages.

**Why this priority**: c'est un prérequis de qualité, avec un impact direct limité tant que la spec 003 n'est pas livrée.

**Independent Test**: audit d'accessibilité automatisé et lecture au lecteur d'écran de l'accueil.

**Acceptance Scenarios**:

1. **Given** n'importe quelle page, **When** elle est analysée, **Then** la langue déclarée est le français et il y a un seul titre principal.
2. **Given** n'importe quelle image porteuse de sens, **When** elle est lue par un lecteur d'écran, **Then** elle a un texte alternatif descriptif ; les images décoratives sont ignorées.
3. **Given** les liens vers des sites externes, **When** ils sont annoncés, **Then** leur libellé indique la destination (par exemple « GitHub de Zobel »), pas seulement une icône.

### Edge Cases

- Le CV PDF n'est pas présent au moment du build : le build échoue avec un message explicite plutôt que de publier un bouton cassé.
- Une démo de projet passe hors ligne après publication : elle est détectée par la vérification des liens de la spec 006 ; d'ici là, la vérification manuelle avant mise en ligne fait foi.
- Un poste n'a pas de date de fin : il est affiché comme « aujourd'hui » et compte dans la durée d'expérience jusqu'à la date du jour.
- Deux postes se chevauchent (Phibrain et Orange) : la durée d'expérience totale ne compte pas deux fois la même période.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Le site MUST afficher le titre du CV générique, « Ingénieur Logiciel Fullstack \| React, ASP.NET Core, Laravel », et le poste actuel tel que défini dans `docs/career-timeline.md`.
- **FR-002**: La section Expérience MUST lister les postes du parcours consolidé, triés du plus récent au plus ancien, avec structure, intitulé, période et 1 à 3 réalisations par poste.
- **FR-003**: La section Formation MUST corriger les périodes (ENSP Douala 2018 → 2023, Baccalauréat C 2016) et être placée après les projets et l'expérience.
- **FR-004**: La section Compétences MUST refléter le CV en vigueur, regroupées par domaine comme dans ce CV (backend, frontend, données, DevOps, tests et qualité, sécurité, IA, méthodes), et retirer les technologies que le CV n'affiche plus.
- **FR-005**: La durée d'expérience et l'année du pied de page MUST être calculées, jamais écrites en dur.
- **FR-006**: L'identité affichée MUST être unique sur tout le site (nom complet ; « Concepteur JS » retiré ou présenté comme pseudonyme GitHub).
- **FR-007**: Le menu MUST ne contenir que des entrées menant à une page existante ; « Articles » est masqué jusqu'à la livraison de la spec 007.
- **FR-008**: Le bouton « Télécharger mon CV » MUST télécharger le CV générique en vigueur. Le numéro de téléphone peut y figurer, mais n'apparaît dans aucune page du site ; les métadonnées du PDF ne mentionnent aucune candidature (constitution 1.1.0, principe VII).
- **FR-009**: Une carte de projet MUST avoir une seule zone cliquable menant à une seule destination ; les projets marqués non visibles ou sans destination ni contenu MUST être masqués.
- **FR-010**: Les icônes et textes MUST respecter un contraste WCAG AA dans les deux thèmes.
- **FR-011**: Le thème MUST suivre la préférence système à la première visite, mémoriser le choix manuel et s'appliquer sans clignotement.
- **FR-012**: Chaque page MUST déclarer la langue française et contenir un seul titre principal ; chaque image porteuse de sens MUST avoir un texte alternatif.
- **FR-013**: Tous les textes MUST être relus et corrigés (liste minimale : « trabaillé », « joeurs », « évolurion », « indiene », « tenis », « Recheche », « Je me défini », « etre », « en tant développeur », « Expériences Professionnelle », « créations », « établissment »).
- **FR-014**: Aucun message de débogage MUST apparaître dans la console du navigateur en production.
- **FR-015**: Les mentions dont le statut est « ⚠️ à valider » dans le parcours consolidé MUST être tranchées avant publication. Choix par défaut : les stages LUGAR (2021) et Gloom (2022) restent affichés dans une section repliée « Débuts » ; l'enseignement de l'informatique en collèges et lycées (2024-02 → 2025-05) figure dans l'Expérience, comme dans le CV en vigueur ; PhiBrain est présenté avec l'intitulé « Co-fondateur · Développeur ».

### Key Entities

- **Experience** : structure, intitulé du poste, date de début, date de fin facultative (absente si en cours), lieu ou mode (sur site, mission, freelance), réalisations, technologies.
- **Education** : diplôme, établissement, année de début, année de fin.
- **SkillGroup** : domaine, liste de compétences.
- **Profile** : nom affiché, titre, accroche, poste actuel, liens sociaux, e-mail public, fichier CV.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100 % des postes, dates et diplômes affichés correspondent à `docs/career-timeline.md`.
- **SC-002**: 0 lien ou bouton sans effet ou menant à une erreur, sur l'ensemble des pages, dans les deux thèmes.
- **SC-003**: Un visiteur obtient le CV en 1 clic depuis l'accueil.
- **SC-004**: Le score d'accessibilité automatisé est ≥ 90 sur chaque page.
- **SC-005**: 0 faute relevée lors d'une relecture complète des textes.
- **SC-006**: Le thème choisi est conservé dans 100 % des rechargements, sans clignotement visible.

## Assumptions

- Le contenu de référence est le CV « NGUENING TCHOMGUI Zobel Ulrich CV-générique », repris dans `docs/career-timeline.md`. Les CV ciblés pour une candidature précise n'en sont pas la source.
- La version publique du CV est le CV générique fourni par Zobel, numéro inclus, avec des métadonnées neutres (titre et auteur).
- La refonte visuelle (ordre complet de l'accueil, menu mobile, animations) relève de la spec 004 ; cette spec ne déplace que la section Formation et corrige les défauts.
- La migration Next 16 / Tailwind 4 de la branche `test/next-16` est le point de départ.
- Les projets ne sont touchés ici que pour corriger les défauts ; leur nouveau modèle relève de la spec 002.
