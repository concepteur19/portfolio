# Feature Specification: Vitrine de projets avec liens et captures

**Feature Branch**: `002-project-showcase`

**Created**: 2026-10-22

**Status**: Draft

**Input**: User description: "L'ajout d'un projet peut avoir des liens et/ou des captures/images. Passer d'une liste de liens à des études de cas, mettre en avant les meilleurs projets, filtrer, gérer les projets confidentiels."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Zobel ajoute un projet en un seul endroit (Priority: P1)

Zobel termine un projet. Il crée une fiche avec le titre, le résumé, le cadre, son rôle, la période et les technologies. Il ajoute ensuite les liens disponibles (zéro, un ou plusieurs) et les captures disponibles (zéro, une ou plusieurs). Le projet apparaît sur le site sans qu'il touche à l'affichage.

**Why this priority**: c'est la demande explicite. Aujourd'hui, un projet n'a qu'un seul lien, un logo et une image facultative. Ajouter un projet oblige à modifier un fichier de code et à gérer des imports d'images à la main.

**Independent Test**: ajouter quatre fiches (liens et captures, liens seuls, captures seules, ni l'un ni l'autre), puis vérifier que chacune s'affiche correctement sans modification de composant.

**Acceptance Scenarios**:

1. **Given** une fiche avec 3 liens (démo, code front-end, code back-end) et 4 captures, **When** le site est construit, **Then** la carte montre la couverture et les 3 liens, libellés selon leur type, et la page du projet affiche la galerie complète.
2. **Given** une fiche avec seulement des captures, **When** le site est construit, **Then** aucun bouton de lien vide n'est affiché, et la galerie est accessible.
3. **Given** une fiche avec seulement des liens, **When** le site est construit, **Then** la carte utilise une couverture de repli (logo du projet, ou initiales sur la couleur du type) et les liens sont affichés.
4. **Given** une fiche sans lien ni capture, **When** le site est construit, **Then** le projet s'affiche avec sa couverture de repli et la mention « Projet non public ».
5. **Given** une fiche invalide (titre manquant, URL malformée, capture sans texte alternatif, fichier image introuvable), **When** le site est construit, **Then** la construction échoue en nommant la fiche et le champ fautif.

---

### User Story 2 - Un recruteur juge un projet en 30 secondes (Priority: P1)

Un recruteur ouvre la page Projets. Chaque carte lui montre ce qu'est le projet, dans quel cadre il a été fait, avec quelles technologies, et ce qu'il peut ouvrir.

**Why this priority**: la page Projets est la preuve du savoir-faire. Aujourd'hui, elle montre un logo et un nom de domaine.

**Independent Test**: un testeur extérieur, à qui l'on montre la page Projets, résume 3 projets (cadre, rôle, stack) en moins de 30 secondes chacun.

**Acceptance Scenarios**:

1. **Given** une carte de projet, **When** elle s'affiche, **Then** elle montre couverture, titre, résumé d'une phrase, cadre (Orange, client, freelance, personnel, challenge), période, 3 à 5 technologies, et les actions disponibles.
2. **Given** une carte, **When** le visiteur active le titre ou la couverture, **Then** il arrive sur la page du projet ; les liens externes s'ouvrent depuis leurs propres boutons, dans un nouvel onglet.

---

### User Story 3 - Une page par projet, en étude de cas (Priority: P2)

Le visiteur ouvre la page d'un projet. Il lit le contexte, le problème, son rôle, la solution, les résultats et les apprentissages. Il fait défiler les captures en grand.

**Why this priority**: c'est ce qui distingue un portfolio d'ingénieur d'une liste de démos. Mais la valeur de base (US1, US2) existe déjà sans cette page.

**Independent Test**: ouvrir la page d'un projet complet et d'un projet minimal ; naviguer dans la galerie au clavier et au doigt.

**Acceptance Scenarios**:

1. **Given** un projet avec des sections d'étude de cas renseignées, **When** sa page s'affiche, **Then** chaque section renseignée apparaît dans l'ordre contexte → problème → rôle → solution → résultats → apprentissages ; les sections vides ne sont pas affichées.
2. **Given** la galerie, **When** le visiteur ouvre une capture, **Then** elle s'affiche en grand avec sa légende ; il passe à la suivante avec les flèches du clavier ou un balayage, et ferme avec Échap ou un bouton.
3. **Given** des captures d'écran mobiles (format portrait) et d'ordinateur (format paysage), **When** elles s'affichent, **Then** chacune garde ses proportions, sans recadrage qui masque le contenu.
4. **Given** l'adresse de la page d'un projet, **When** elle est partagée, **Then** l'aperçu montre le titre, le résumé et la couverture du projet.

---

### User Story 4 - Mettre en avant et filtrer (Priority: P2)

Zobel choisit les 3 ou 4 projets qui le représentent le mieux. Ils apparaissent sur l'accueil. Sur la page Projets, le visiteur filtre par cadre ou par technologie.

**Why this priority**: avec plus de 15 projets connus, le volume noie les meilleurs.

**Independent Test**: marquer 4 projets « mis en avant », vérifier l'accueil ; filtrer par « React » puis par « Client », et vérifier le résultat.

**Acceptance Scenarios**:

1. **Given** des projets marqués « mis en avant » avec un ordre, **When** l'accueil s'affiche, **Then** ils apparaissent dans cet ordre, au maximum 4.
2. **Given** la page Projets, **When** le visiteur choisit un cadre ou une technologie, **Then** seuls les projets correspondants restent visibles, le nombre de résultats est annoncé, et le filtre est conservé dans l'adresse de la page.
3. **Given** des projets de type challenge, **When** la page Projets s'affiche, **Then** ils sont regroupés dans une section « Labs » distincte, après les projets principaux.

---

### User Story 5 - Montrer un projet confidentiel sans rien divulguer (Priority: P3)

Zobel veut montrer son travail chez Orange Cameroun (mini-apps Max it) sans publier de lien interne, de donnée réelle ni de détail non public.

**Why this priority**: c'est son expérience la plus récente et la plus forte, mais elle ne peut être montrée que dans un cadre maîtrisé (constitution, principe VII).

**Independent Test**: créer une fiche marquée confidentielle avec des liens et des captures, puis vérifier que ni les uns ni les autres ne sont publiés tant que le marquage le demande.

**Acceptance Scenarios**:

1. **Given** une fiche marquée « confidentielle », **When** le site est construit, **Then** le projet affiche cadre, rôle, technologies et étude de cas, avec la mention « Projet confidentiel », et aucun lien.
2. **Given** une fiche confidentielle contenant des captures non marquées « validées pour publication », **When** le site est construit, **Then** ces captures ne sont pas publiées.
3. **Given** plusieurs livrables liés (par exemple les mini-apps Max it), **When** Zobel les regroupe, **Then** ils apparaissent comme une seule étude de cas qui liste les sous-projets.

### Edge Cases

- Capture très haute (page entière défilée) : elle est affichée réduite dans la galerie et consultable en entier dans la vue agrandie.
- Plus de 12 captures : la carte n'en utilise qu'une (la couverture) ; la page projet charge les suivantes au fil du défilement.
- Lien de démo connu pour être hors ligne : la fiche peut marquer le lien « archivé ». Il est alors affiché comme non cliquable, avec la mention « démo hors ligne », ou masqué si la fiche le demande.
- Deux projets portent le même identifiant : la construction échoue.
- Une technologie est écrite différemment selon les fiches (« Nextjs », « Next js », « Next.js ») : les filtres les regroupent sous un nom canonique unique.
- Aucun projet ne correspond au filtre : un message l'indique, avec une action pour réinitialiser.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Chaque projet MUST être décrit par une fiche de contenu unique ; l'ajouter, le modifier ou le retirer MUST NOT nécessiter de modifier un composant d'affichage.
- **FR-002**: Une fiche MUST contenir : identifiant unique, titre, résumé (≤ 160 caractères), cadre (Orange Cameroun, employeur, client, freelance, personnel, challenge), structure ou client, période (début, fin facultative), rôle, technologies.
- **FR-003**: Une fiche MAY contenir de 0 à N liens. Chaque lien a un type parmi : démo / site, code front-end, code back-end, code, maquette, article, store mobile, vidéo, autre. Il porte aussi une URL, un libellé facultatif (sinon libellé par défaut du type) et un état facultatif « archivé ».
- **FR-004**: Une fiche MAY contenir de 0 à N captures. Chaque capture a un fichier image, un texte alternatif obligatoire, une légende facultative, un format (ordinateur, mobile, autre) et un indicateur « validée pour publication » (vrai par défaut, sauf pour les projets confidentiels).
- **FR-005**: Une fiche MAY désigner une capture comme couverture ; à défaut, la première capture publiable sert de couverture ; à défaut encore, une couverture de repli est générée (logo du projet s'il existe, sinon initiales sur la couleur du cadre).
- **FR-006**: Une fiche MAY contenir les sections d'étude de cas : contexte, problème, rôle détaillé, solution, résultats, apprentissages.
- **FR-007**: Une fiche MAY être marquée « mise en avant » avec un ordre, « masquée », « confidentielle » ou « challenge ».
- **FR-008**: La construction du site MUST échouer, avec un message nommant la fiche et le champ, pour : champ obligatoire absent, URL invalide, identifiant dupliqué, image introuvable, capture sans texte alternatif.
- **FR-009**: Les cartes MUST n'afficher que les actions disponibles ; aucun bouton vide ou sans destination.
- **FR-010**: Chaque projet non masqué MUST avoir sa propre page avec une adresse stable dérivée de son identifiant.
- **FR-011**: La galerie MUST être utilisable au clavier (flèches, Échap, ordre de tabulation) et au toucher (balayage), et MUST respecter la préférence de réduction des animations.
- **FR-012**: Les images MUST être servies dans des formats et des tailles adaptés à l'écran ; seule la couverture du premier écran est chargée immédiatement.
- **FR-013**: L'accueil MUST afficher au plus 4 projets mis en avant, dans l'ordre défini.
- **FR-014**: La page Projets MUST permettre de filtrer par cadre et par technologie, refléter le filtre dans l'adresse de la page et grouper les challenges dans une section « Labs ».
- **FR-015**: Les noms de technologies MUST être normalisés vers une liste canonique, afin que les filtres ne présentent aucun doublon.
- **FR-016**: Pour un projet confidentiel, les liens et les captures non validées MUST NOT être publiés, ni dans la page, ni dans les fichiers servis.
- **FR-017**: Un projet MAY regrouper des sous-projets (nom, résumé court), affichés dans sa page.
- **FR-018**: Les projets existants MUST être migrés vers le nouveau modèle, et les nouveaux projets du parcours consolidé ajoutés selon les décisions prises dans `docs/career-timeline.md`.

### Key Entities

- **Project** : identifiant, titre, résumé, cadre, structure ou client, période, rôle, technologies, liens, captures, couverture, logo, sections d'étude de cas, sous-projets, marqueurs (mis en avant + ordre, masqué, confidentiel, challenge).
- **ProjectLink** : type, URL, libellé, archivé.
- **ProjectImage** : fichier, texte alternatif, légende, format (ordinateur, mobile, autre), validée pour publication.
- **Technology** : nom canonique, variantes acceptées, catégorie (front-end, backend, données, DevOps).
- **ProjectContext** : valeur parmi Orange Cameroun, employeur, client, freelance, personnel, challenge, avec un libellé et une couleur.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Ajouter un projet avec 2 liens et 3 captures prend moins de 10 minutes et ne modifie aucun composant.
- **SC-002**: 100 % des captures publiées ont un texte alternatif ; 0 bouton de lien vide sur le site.
- **SC-003**: La page d'un projet avec 10 captures affiche son contenu principal en moins de 2,5 s sur une connexion 4G.
- **SC-004**: Un testeur extérieur identifie le cadre, le rôle et la stack de 3 projets en moins de 30 secondes chacun.
- **SC-005**: 0 lien interne ni capture non validée d'un projet confidentiel dans les fichiers publiés.
- **SC-006**: Les 10 projets existants et au moins 3 nouveaux projets (Connecteur360, Koli, mini-apps Max it) sont publiés dans le nouveau modèle.

## Assumptions

- Les fiches de projet sont des fichiers dans le dépôt ; leur édition depuis une interface d'administration relève de la spec 008, qui réutilisera ce modèle.
- Les médias se limitent aux images (PNG, JPG, WebP, AVIF, GIF). Les vidéos sont des liens de type « vidéo » ; leur lecture intégrée est hors périmètre.
- Les études de cas sont rédigées par Zobel ; la spec fournit la structure, pas le texte.
- Les images de partage générées automatiquement par page relèvent de la spec 003 ; cette spec fournit seulement titre, résumé et couverture.
- Ordre par défaut de la page Projets : mis en avant, puis du plus récent au plus ancien, puis Labs.
