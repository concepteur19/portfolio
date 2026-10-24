# Contract: surface publique du site

Ce que le site expose aux visiteurs, aux navigateurs et aux autres specs. Tout changement de cette surface passe par une spec.

## Pages

| Route | Titre principal (`h1`) | Rendu |
|---|---|---|
| `/` | titre du profil | statique, `revalidate: 86400` (durée d'expérience) |
| `/about` | « À propos » | statique |
| `/projects` | titre de la page Projets | statique |
| `/404` | page d'erreur | statique |

Toutes les pages : `<html lang="fr">`, un seul `h1`, titres de section en `h2`.

Le menu ne contient que `/about` et `/projects`. `/blog` n'existe pas et n'est référencé nulle part (FR-007).

## CV

| Élément | Valeur |
|---|---|
| URL | `/cv/zobel-nguening-cv.pdf` (stable, suivie par la spec 003) |
| Nom de téléchargement | `Zobel-Nguening-CV.pdf` |
| Contenu | CV générique sans numéro de téléphone (principe VII) |
| Absence du fichier | le build échoue : `CV introuvable : public/cv/zobel-nguening-cv.pdf` |

## Thème

| Élément | Valeur |
|---|---|
| Classe | `dark` sur `<html>` ; absente = thème clair |
| `localStorage` | clé `theme`, valeurs `"light"` ou `"dark"` ; absente = suivre le système |
| Initialisation | script inline dans `<head>`, exécuté avant le premier affichage |
| Propriété CSS | `color-scheme` aligné sur le thème |

## Liens externes

Chaque lien externe porte `target="_blank"` et `rel="noopener noreferrer"`. Un lien qui n'affiche qu'une icône porte un `aria-label` qui nomme la destination.
