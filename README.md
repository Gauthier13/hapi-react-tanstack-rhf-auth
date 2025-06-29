# fastory-test-technique

## Commandes pour lancer le projet

- **npm i
- **npm run dev 

Ces commandes sont les mêmes pour le frontend et le backend.

Voici le lien du projet déployé (Vercel pour le front et Railway pour le back) 
- [Mon super site](https://frontend-gsn1etfr9-gauthier13s-projects.vercel.app/) 

Les identifiants sont:  Luke et password: DadSucks
## Choix technique

### Backend
Je ne connaissais pas Hapi donc j'ai choisi de l'utiliser pour découvrir cette techno et je dois reconnaître que j'ai apprécié malgré l'aspect peu attrayante de sa doc. Et pour aller à fond dans le sens de hapi, j'ai choisi d'utiliser le plus possible ses outils. Je passe par hapi/jwt pour générer le token jwt, Joi pour valider les données et Lab pour les tests unitaires. Tout ce qui se trouve dans la doc de hapi, je prends !

Mon travail sur la backend est passé par plusieurs étapes, notamment pour l'auth. J'ai d'abord utilisé un middleware avec preHandler pour gérer les routes protégées pour ensuite l'abandonner et utiliser hapi/jwt et le définir comme strategy d'auth pour le serveur et ensuite définir à la main quelle route est protégée ou non via ses options (en lui passant jwt_strategy), c'est fonctionnel mais je ne pense pas que cela scale bien sur des projets plus gros à cause du risque d'oublie.

Pour la récupération des données de la SWAPI, j'ai pris soin de faire une boucle sur les données pour leur ajouter un id avec uuid v4 dans le but de m'aider avec le front et avoir une route unique /search/:category/:id qui gérera l'affichage des données selon les types de catégorie mais aussi offrir un meilleur historique de navigation ou un partage d'url. 

### Frontend
La partie plus compliquée... Beaucoup de nouvelles techno pour moi, je n'avais jamais utilisé react query, ni react hook form, ni redux.

Mon objectif pour ce front était de gérer au mieux possible les appels au backend car on peut mettre en cache les données retournées par le back sans problème. Que ce soit avec Redux ou avec react query. La difficulté a été de réafficher les données de la recherche précédente après avoir consulté le détail d'une carte. Je trouvais ça dommage de devoir refaire un appel au back juste pour retrouver la liste des starships alors que je venais de lire les infos d'un vaisseau et que que je suis retourné en arrière.
Au début j'ai stocké les données renvoyées par le back dans redux au moment de recevoir les données et ensuite les sortir du store si l'utilisateur retourne sur le route /search et détecter quelle était sa dernière recherche pour lui réafficher la liste des données mais depuis le store. 

> [!NOTE]
>  Vous pouvez voir mon travail avec Redux sur la branche Redux du repo  
> 

Mais j'ai fini par abandonner Redux car trop de galère pour un si petit projet alors j'ai plongé plus en profondeur dans la doc de react query et me rendre compte que c'est largement suffisant pour mes besoins. Dans la branche no-redux (qui est déployée), j'ai supprimé Redux et exploité le cache des query. J'ai défini deux query avec la même queryKey pour exploiter leur données cachées. Une query définie dans le hook useSearch qui récupère toutes les données d'une catégorie et un hook useItemFromCache qui a un prop select parfaite pour récupérer une donnée dans le cache en se basant sur l'id de la donnée qui est dans l'url.

> [!NOTE] 
> Il y a donc une requête vers le back par catégorie si l'on veut récupérer toutes les données de l'api, ensuite, le front distribue les données aux composants uniquement à partir du cache des query

Pour l'auth coté front, j'ai crée un context qui me retourne des méthodes à appeler. Combiné à un composant ProtectedRoute qui exploite le context pour vérifier si l'utilisateur est authentifié et si non: le rediriger vers la sortie. A noter que cela fonctionne parfaitement en local mais une fois déployé non, je me suis loupé quelque part. Il en est de même avec ma route * qui affiche un composant d'erreur pour protéger des erreurs dans l'url et afficher <NotFound /> mais il ne fonctionne pas en prod...

J'ai utilisé Zod pour valider les données renvoyées par le back avant d'afficher la liste des données, 


## Améliorations

- Ajouter un SSO et rendre l'auth plus robuste
- Le design hiddeux que j'ai fait pour ne pas perdre de temps (je m'en sors mieux avec un figma)
- Régler les problèmes sur le site déployé (je comprends pas pourquoi certaines choses ne fonctionnent pas sur le site déployé mais oui en local)
- Il a y des choses sur lesquelles je n'ai pas été rigoureux car c'est un exercice et non pas un vrai projet mais il y a des choses que j'aurais dû cacher dans un point .env et ne pas laisser hardcodé
- J'ai utilisé Zod (coté front) pour valider les données renvoyées par le back avant d'afficher la liste des données pour vérifier leur intégrité mais il aurait été plus intéressant de le faire coté back 
- Mon typage n'a pas été assez rigoureux je trouve, notamment avec Joi dans le back où je ne peux pas faire d'inférence de type à partir du schéma (ou alors on peut le faire mais j'ai pas trouvé)
- Je n'ai pas tiré l'avantage d'avoir un monorepo, j'aurais pu faire des workspace et centralisé du typage, des helpers, ou tout autre chose commune au front et au back
- Pas de CI ni de CD alors ça manque 

