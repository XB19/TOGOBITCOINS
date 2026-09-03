# Togo Bitcoin Community

Refonte du site [togobitcoin.org](https://togobitcoin.org/) en React (Vite + Tailwind CSS + Framer Motion).

## Développement

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Tableau de bord administrateur

Le contenu modifiable du site (événements, partenaires, textes des pages, coordonnées)
vit dans `src/data/*.json` et les images correspondantes dans `src/assets/events/` et
`src/assets/partners/`. Un tableau de bord local permet de le modifier sans toucher au
code : il écrit directement dans ces fichiers, sans base de données — le site reste
100 % statique.

**Premier lancement :**

```bash
npm run admin:install   # installe les dépendances du tableau de bord (une seule fois)
npm run start            # démarre le site + le serveur (API) + l'admin, tous ensemble
```

Tout est servi depuis la même adresse :

- Site : [http://localhost:5173](http://localhost:5173)
- Admin : [http://localhost:5173/admin](http://localhost:5173/admin)

Le mot de passe est généré automatiquement au premier lancement et affiché dans le
terminal (aussi enregistré dans `server/.admin-password`, non versionné) — vous pouvez
le changer depuis le tableau de bord une fois connecté.

(`npm run dev` seul ne démarre que le site, sans l'admin ; `npm run admin` seul ne
démarre que l'admin, accessible alors sur son propre port `5175`.)

**Publier vos changements :** une fois vos modifications faites dans le tableau de bord,
elles sont déjà enregistrées sur disque. Il reste à les envoyer sur GitHub pour que
Vercel redéploie le site :

```bash
git add -A
git commit -m "mise à jour du contenu"
git push
```

## Docker

```bash
docker compose up --build
```

Le site est servi sur [http://localhost:8080](http://localhost:8080).
