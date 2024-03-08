# .ENV

```
MONGO_URI="mongodb+srv://johnkta7:ZXszu1tH2JPUyJUb@firstapp.gghbhen.mongodb.net/"
JWT_SECRET="sjhozeuiohxwjbvnoherhiuyqvcbsbcksbcj"
ORIGIN="*"
``` 

# QUESTIONS

## PUT & PATCH

- PUT est généralement utilisé pour changer la ressource entière
- PATCH est généralement utilisé pour changer certaines propriétés de la ressource

## FETCH/AXIOS

La configuration cors empêche les navigateurs non autorisés à accéder à la ressource. Pour y remédier, il faut soit tout acccepter avec "*" ou les urls requises.

## NGINX/APACHE
Pour gérer un grand nombre de requêtes http et avoir des options de sécurité et d'hébergement supplémentaire.

## PERFORMANCES
- Mettre en place un cache
- Faire des tests de charges et optimiser le code en conséquence
- Utiliser de l'asynchrone
