# Contract: surface publique (ajouts de la spec 002)

Complète [la surface de la spec 001](../../001-content-refresh-fixes/contracts/public-surface.md).

## Pages

| Route | Titre principal (`h1`) | Rendu |
|---|---|---|
| `/projects` | titre de la page Projets | statique ; filtrage dans le navigateur |
| `/projects/<id>` | titre du projet | statique, une page par projet non masqué (`fallback: false`) |

`/projects/<id>` d'un projet masqué ou inconnu répond 404.

## Paramètres d'adresse de `/projects`

| Paramètre | Valeurs | Effet |
|---|---|---|
| `cadre` | `orange-cameroun`, `employer`, `client`, `freelance`, `personal`, `challenge` | garde les projets de ce cadre |
| `tech` | slug canonique (`react`, `nextjs`, `aspnet-core`…) | garde les projets qui utilisent cette technologie |

Combinables (`/projects?cadre=freelance&tech=react`). Une valeur inconnue est ignorée. Le filtre est conservé au rechargement et au partage de l'adresse.

## Métadonnées de `/projects/<id>`

| Balise | Valeur |
|---|---|
| `<title>` | `{titre} · Zobel Nguening` |
| `meta[name=description]` | résumé |
| `og:title`, `og:description` | titre, résumé |
| `og:image` | URL absolue de la couverture (`siteUrl` + chemin de l'image), seulement si la couverture est une image |
| `og:type` | `article` |

## Fichiers servis

Seules les images importées par une fiche sont émises dans `/_next/static/media/`. Un projet confidentiel n'expose aucun lien ; ses captures sont toutes déclarées `approved: true`.
