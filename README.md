# Area

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#about-the-project">Description</a>
    </li>
    <li><a href="#members">Members</a></li>
    <li>
      <a href="#infrastructure">Infrastructure</a>
      <ul>
        <li><a href="#front">Front</a></li>
        <li><a href="#back">Back</a></li>
      </ul>
    </li>
    <li>
      <a href="#installation">Installation</a>
      <ul>
        <li><a href="#prerequis">Prerequis</a></li>
        <li><a href="#release">Run for release</a></li>
        <li><a href="#dev">Run for development</a></li>
      </ul>
    </li>
  </ol>
</details>

## About The Project


## Description

- **Taille du groupe** : 6
- **Compilation** : docker-compose build && docker-compose up
- **Langage** :
<p>
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/>
  <img src="https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/>
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white"/>
</p>

## Members

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
A --> F[API]
F --> G{Node.js}
C[App web] --> D{React}
```

# Installation
- Prérequis.
  > Docker

- Run for release
  > docker-compose up --build
- Run for development
  > docker-compose -f docker-compose.dev.yml up --build <front|back|mobile>

## Access to the back-end

http://localhost:8080/<route>

## Access to the front-end

http://localhost:8081
