# hetic-console

Agrégateur d'OSINT pour [l'intranet d'HETIC](https://outils.hetic.net/), OGP et OGI compris.

Cet outil en ligne de commande permet de collecter les données de l'intranet d'HETIC et de constituer une base de données alternative permettant le listing et l'analyse des étudiants. Cela nous permet d'obtenir l'ensemble des étudiants de l'école, classés par promotion avec leur photo, nom, prénom, promotion, adresse email et dans certains cas le numéro de téléphone. En collectant les données des entreprises et leur fiche, nous sommes en mesure de créer un nuage de mots clés par entreprise, ce qui permet d'observer les différents secteurs dans lesquels travaillent ou ont travaillés les héticiens. Cette chronologie nous permet de procéder à cette analyse et de l'étudier dans le temps.

Les données collectés nous permettent aussi d'effectuer des investigations de masse sur tous les étudiants d'HETIC. Notamment pour trouver leurs profils Linkedin, Twitter, ... Ou encore vérifier si leurs adresse emails se trouvent dans des bases de données de fuites de données.

Le shell d'hetic-console permet donc de :

- Collecter les données
- Trier les données avec une syntaxe SQL
- Exporter les données dans différents formats (json, csv)

## Pourquoi ?

- Parce que la data c'est de l'argent
- Parce que l'OSINT c'est cool
- Parce qu'il serait temps qu'HETIC mette en place une API (?)
- Pour une conférence sur l'OSINT à HETIC ? :eyes:
- Pour sensibiliser à la protection des données personnelles

## Vue d'ensemble des données collectés

![](https://i.imgur.com/1Wj5Wco.png)

### Jeu de données

**Étudiants :**

- uid
- lastName
- heticEmail
- email
- phone
- cursus
- birthdate
- picture
- promotion
- enterprise
- country

### Visualisation de données

- Évolution du nombre d'étudiants dans chaque promotions
- Moyenne d'âge dans chaque promotion
- Évolution du nombre d'étudiants dans chaque secteur d'activité
- Évolution du nombre d'étudiants dans chaque secteur d'activité par promotions
- Répartition géographique des étudiants en entreprises toutes promotions confondues, puis évolution par promotions (heatmap)

<div align="center">
    <img src="https://i.imgur.com/qBP4uH7.png" />
    <p><i>Évolution du nombre d'étudiants dans chaque promotions (échantillon: Bachelor Web)</i></p>
</div>

### Investigations OSINT

- Présence des adresses email personnelles dans les fuites de données
- Présence des adresses email *hetic.net* dans les fuites de données
- Profils Linkedin des étudiants

<div align="center">
    <img src="https://i.imgur.com/KcTproT.png" />
</div>

## Installation

```
$ git clone https://github.com/sundowndev/hetic-console
$ npm install
```

## Usage

Lancer le programme :

```
$ node index.js
```

Utilisez `help` pour afficher les commandes disponibles :

```
help                      Display this help message
connect                   Log in to outils.hetic.net using email and password
disconnect                Log out from outils.hetic.net
status                    Check authentication status
pull                      Pull module data from outils.hetic.net
show <module>             Display modules list
export <type>             Export data to json or sql
```

Commencez par vous connecter :

```
hconsole > connect
```

Récupérez les données :

```
hconsole > pull
```

Afficher le dataset *students* :

```
hconsole > show students
```

Exporter les données :

```
# Les données se trouveront dans le dossier data
hconsole > export json
```