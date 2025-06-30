# fastory-test-technique

## Commandes pour lancer le projet

- ouvrir un terminale pour le front et un terminal pour le back
- npm i
- npm run dev 

Ces commandes sont les mêmes pour le frontend et le backend.

Voici le lien du projet déployé (Vercel pour le front et Railway pour le back) 
- [Mon super site](https://frontend-gsn1etfr9-gauthier13s-projects.vercel.app/)
- Il faut un compte Vercel pour y accéder... je pense que je me suis loupé quelque part dans les paramètres du déploiement

Les identifiants de login une fois sur le site sont: Luke et password: DadSucks

## Choix technique

### Backend
Je ne connaissais pas Hapi donc j'ai choisi de l'utiliser pour découvrir cette techno et je dois reconnaître que j'ai apprécié malgré l'aspect peu attrayante de sa doc au départ. Et pour aller à fond dans le sens de hapi, j'ai choisi d'utiliser le plus possible ses outils. Je passe par hapi/jwt pour générer le token jwt, Joi pour valider les données et Lab pour les tests unitaires. Tout ce qui se trouve dans la doc de hapi, je prends !

Mon travail sur la backend est passé par plusieurs étapes, notamment pour l'auth. J'ai d'abord utilisé un middleware avec preHandler pour gérer les routes protégées pour ensuite l'abandonner et utiliser hapi/jwt et le définir comme strategy d'auth pour le serveur et ensuite définir à la main quelle route est protégée ou non via ses options (en lui passant jwt_strategy), c'est fonctionnel mais je ne pense pas que cela scale bien sur des projets plus gros à cause du risque d'oublie.

Pour la récupération des données de la SWAPI, j'ai pris soin de faire une boucle sur les données pour leur ajouter un id avec uuid v4 dans le but de m'aider avec le front et avoir une route unique /search/:category/:id qui gérera l'affichage des données selon les types de catégorie mais aussi offrir un meilleur historique de navigation ou un partage d'url. 

### Frontend
Beaucoup de nouvelles techno pour moi, je n'avais jamais utilisé react query, ni react hook form, ni redux.

Mon objectif pour ce front était de gérer au mieux possible les appels au backend car on peut mettre en cache les données retournées par le back sans problème. Que ce soit avec Redux ou avec react query. La difficulté a été de réafficher les données de la recherche précédente après avoir consulté le détail d'une carte. Je trouvais ça dommage de devoir refaire un appel au back juste pour retrouver la liste des starships alors que je venais de lire les infos d'un vaisseau et que que je suis retourné en arrière (dans la navigation).
Au début j'ai stocké les données renvoyées par le back dans redux au moment de recevoir les données et ensuite les sortir du store si l'utilisateur retourne sur la route /search et détecter quelle était sa dernière recherche (via les searchParams) pour lui réafficher la liste des données mais depuis le store. 

> [!NOTE]
>  Vous pouvez voir mon travail avec Redux sur la branche Redux du repo (ou pas, je suis pas le plus fier de ce code je me suis égaré) 
> 

J'ai fini par abandonner Redux car un peu galère pour un si petit projet alors j'ai plongé plus en profondeur dans la doc de react query pour me rendre compte que c'est largement suffisant pour mes besoins. Dans la branche no-redux (qui est déployée et est le reflet de main), j'ai supprimé Redux et exploité le cache des query. J'ai défini deux query avec la même queryKey pour exploiter leur données cachées. Une query définie dans le hook useSearch qui récupère toutes les données d'une catégorie et un hook useItemFromCache qui a une props "select" parfaite pour récupérer une donnée précise dans le cache en se basant sur l'id de la donnée qui est dans l'url.

> [!NOTE] 
> Il y a donc une requête vers le back par catégorie si l'on veut récupérer toutes les données de l'api, ensuite, le front distribue les données aux composants uniquement à partir du cache des query

Pour l'auth coté front, j'ai créé un context qui me retourne des méthodes à appeler. Combiné à un composant ProtectedRoute qui exploite le context pour vérifier si l'utilisateur est authentifié et si non: le rediriger vers la sortie. A noter que cela fonctionne parfaitement en local mais une fois déployé non, je me suis loupé quelque part. Il en est de même avec ma route * pour protéger des erreurs dans l'url et afficher le composant NotFound mais il ne fonctionne pas en prod... Désolé

## Améliorations

- Ajouter un SSO et rendre l'auth plus robuste (en utilisant les cookies plutôt que le local storage par exemple)
- Le design hiddeux que j'ai fait pour ne pas perdre de temps (je m'en sors mieux avec un figma, promis)
- Régler les problèmes sur le site déployé (je comprends pas pourquoi certaines choses ne fonctionnent pas sur le site déployé mais oui en local)
- Ajouter les données sensibles dans un .env 
- J'ai utilisé Zod (coté front) pour valider les données renvoyées par le back avant d'afficher la liste des données pour vérifier leur intégrité mais il aurait été plus intéressant de le faire coté back 
- Mon typage n'a pas été assez rigoureux je trouve, notamment avec Joi dans le back où je ne peux pas faire d'inférence de type à partir du schéma (ou alors on peut le faire mais j'ai pas trouvé) mais une assertion et j'ai trouvé ça bizarre 
- Je n'ai pas tiré l'avantage d'avoir un monorepo, j'aurais pu faire des workspaces et centraliser du typage, des helpers, ou tout autre chose commune au front et au back 
- Ajouter une CI/CD (au push sur staging et main, avec un workflow qui run les tests par exemple et push une une image docker si le projet était dockerisé)
- Je n'ai pas exploité le file base routing alors que j'aurais pu
- Séparer la déclaration des routes dans une variable routes et utiliser createBrowserRouter pour gagner en lisibilité car mes routes sont stackées avec les provider et c'est pas le plus lisible je trouve
- Ajouter un logger comme Datadog par exemple
- Un meilleur nommage des variables et props, je me suis retrouvé avec un data.data et c'est pas beau
- hasher le password avec argon2
- faire de la pagination car l'api renvoit beaucoup de données

