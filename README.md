# hetic-console

Aggrégateur d'OSINT pour [l'intranet d'HETIC](https://outils.hetic.net/), OGP et OGI compris.

Cet outil en ligne de commande permet de collecter les données de l'intranet d'HETIC et de constituer une base de données alternative permettant le listing et l'analyse des étudiants. Cela nous permet d'obtenir l'ensemble des étudiants de l'école, classés par promotion avec leur photo, nom, prénom, promotion, adresse email et dans certains cas le numéro de téléphone. En collectant les données des entreprises et leur fiche, nous sommes en mesure de créer un nuage de mots clés par entreprise, ce qui permet d'observer les différents secteurs dans lesquels travaillent ou ont travaillés les héticiens. Cette chronologie nous permet de procéder à cette analyse et de l'étudier dans le temps.

Les données collectés nous permettent aussi d'effectuer des investigations de masse sur tous les étudiants d'HETIC. Notamment pour trouver leurs profils Linkedin, Twitter, ... Vérifier si leurs adresse emails se trouvent dans des bases de données de fuites de données.

Le shell d'**hetic-console** permet donc de :

- Collecter les données
- Trier les données avec une syntaxe SQL
- Exporter les données dans différents formats (sqlite, json, csv)

## Pourquoi ?

- Parce que le gros data c'est de l'argent
- Parce que l'OSINT c'est cool
- Parce qu'il serait temps qu'HETIC mette en place une API (?)
- Pour une conférence sur l'OSINT à HETIC ? :eyes:
- Pour sensibiliser à la protection des données personnelles

## Vue d'ensemble des données collectés

![](https://i.imgur.com/1Wj5Wco.png)

### Jeu de données

**Étudiants** :

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

- Nombre d'étudiants dans chaque promotins
- Nombre d'étudiants dans chaque secteur d'activité
- Moyenne d'âge dans chaque promotion
- Évolution du nombre d'étudiants par promotions (graphique)
- Évolution du nombre d'étudiants par cursus par promotions
- Évolution du nombre d'étudiants dans chaque secteur d'activité par promotions
- Répartition géographique des étudiants en entreprises toutes promotions confondues (puis évolution de la répartition par promotions) (heatmap)

## Installation

```
$ git clone https://github.com/sundowndev/hetic-console
$ npm install
```

## Usage

Launch the tool :

```
$ node index.js
```

The following help message should comes up :

```
help                      Display this help message
connect                   Log in to outils.hetic.net using email and password
disconnect                Log out from outils.hetic.net
status                    Check authentication status
pull                      Pull module data from outils.hetic.net
show <module>             Display modules list
export <type>             Export data to json or sql
select <statement>        Get data using sql statement
```

#### Examples :

Fetch all *students* :

```sql
pull students
```

Show *students* table structure :

```sql
show students
```

Export all *students* who are from 2015 promotion :

```sql
# select <fields> from <module> [conditions]
select * from students where promotion=2015
```
