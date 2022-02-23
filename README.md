# Area

## Description

- **Taille du groupe** : 6
- **Compilation** : docker-compose build && docker-compose up
- **Langage** : <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/><img src="https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/><img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white"/>
<p>
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/>
  <img src="https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/>
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white"/>
</p>

## Groups

- Damien Maillard (Dev Fullstack)
- Ilian Baylon
- Jules Clerc
- Houssam El-affas 
-Gregoire Duhem

## Infrastructure

### Front
```mermaid
graph LR
A --> B
A((AREA)) --> C
B[App mobile] --> E{React native}
C[App web] --> D{React}
```

### Back
```mermaid
graph LR
A --> B
A((AREA)) --> C
B[App mobile] --> E{React native}
A --> F[Api]
F --> G{Node.js}
C[App web] --> D{React}
```

# Installation
- Prérequis.
  > Docker

- Run for release
  > docker-compose up --build
- Run for development
  > docker-compose -f docker-compose.dev.yml up --build
  > docker-compose -f docker-compose.dev.yml up --build <front|back|mobile>`

## Access to the back-end

http://localhost:8080/<route>

## Access to the front-end

http://localhost:3000

## Back

- [Back](back/README.md)
