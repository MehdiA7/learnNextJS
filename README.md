# HELLO!

Welcome to my learning project for learning Next.js!

# Why am I learning Next.js?

Because I love React, and the possibility of creating a Server-Side Rendering (SSR) application with React is so exciting!

# My notes

Bon je commence next ! 21/02/2025

Pour init un projet next il faut faire

```php
npx create-next-app
```

ça va télécharger la dernière version de next ! On peut aussi faire tout le temps `enter` car les propositions par défaut sont bonne.

# COMMENT IMPORTER UNE FONT ?

Avec `next` c’est pas aussi simple pourquoi ?

- Car on a pas de fichier `.html` et donc on peut pas importer une font avec `<link>`

Les étapes 

- Trouver le nom de la font que l’on veut importer sur `google font` pour l’exemple je vais prend `Space Mono` et 2 autres font
- importer les fonts dans `app/layout.tsx`

```tsx
import { Geist, Geist_Mono, Space_Mono } from "next/font/google";
```

- Après ça l’on crée une variable par font pour la stocker

```tsx
const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const spaceMono = Space_Mono({
    weight: ["400", "700"],
    variable: "--font-space-mono",
    subsets: ["latin"],
});
```

- Maintenant on doit l’exporter et ça se fait dans et dans le body sous forme de `className`

```tsx
return (
  <html lang="en">
      <body
          className={`
          ${geistSans.variable} 
          ${geistMono.variable} 
          ${spaceMono.variable} antialiased
          `}
      >
          {children}
      </body>
  </html>
);
```

Et voilà on a les 3 font qui sont disponible en css avec `var(--font-space-mono)`

- C’est quoi `subsets` et `antialiased` ?
    
    ### `antialisased`
    
    - **antialiased** est une classe utilitaire de Tailwind CSS qui applique le lissage des polices
    - Elle ajoute la propriété CSS `webkit-font-smoothing: antialiased` au texte
    - Cela rend le texte plus net et plus lisible, particulièrement sur les écrans modernes
    - C'est particulièrement utile sur macOS où le rendu des polices peut parfois paraître trop gras
    
    ### `subsets`
    
    - **subsets** est une option de Next.js pour l'optimisation des polices Google
    - Elle permet de ne charger que les caractères nécessaires pour une langue spécifique
    - `["latin"]` signifie que seuls les caractères latins seront chargés
    - Cela améliore les performances en réduisant la taille du fichier de police à télécharger

# ROUTING `/`

Alors c’est terriblement simple 

![image.png](image.png)

Voici le dossier `app` dedans on peut voir que il y’a plusieurs pages mais elle ne sont pas au même endroit, la page a la racine de `app` est le `/` et puis l’on vois le dossier `users` qui contient lui aussi une page, ce sera donc `/users` et si l’on va dans le dossier `new` pour affiché la page il faudra aller su `users/new` et ainsi de suite… C’est le routing dans `next` !

# CSR OU SSR COMMENT SWITCH ? `use client`

Pour switch le rendu du coté server au client on peut simplement utiliser `'use client'` 

```tsx
"use client";
import React from "react";

const AddToCard = () => {
    return (
        <div>
            <button onClick={() => console.log("Click")}>Add To Card</button>
        </div>
    );
};

export default AddToCard;
```

Ici ce `component` sera rendu au niveau du client car il est dynamique ! Maintenant l’avantage c’est que on peut l’appeler sur des pages statiques qui seront rendu coté `server`  !

```tsx
import AddToCard from "./AddToCard";

const ProductCard = () => {
    return (
        <div>
            <h1>This is SSR with CSR components</h1>
            <AddToCard />
        </div>
    );
};

export default ProductCard;
```

# IL SE PASSE QUOI QUAND ON `FETCH` ?

( Tout ce qui est la ne se vois pas en développement les changements apparaissent uniquement au moment du build )

Par défaut en `SSR` Next va stocker dans le cache toute les infos du component par défaut si il y’a un `fetch`.

Pour palier a ça il faut ajouté un argument au `fetch` 

```tsx
  const res = await fetch('https://jsonplaceholder.typicode.com/users', { cache: 'no-store' });
```

Ici on vois que j’ai mis `{ cache: 'no-store' }` comme argument et il sert a dire que il ne faut pas stocker des infos dans le cache mais les rerendre a chaque `rendu` !

# GERER LES DB AVEC `PRISMA`

Pour installer `prisma` il faut 

```bash
npm install prisma
npx prisma init
```

Un dossier `prisma` va être crée et dedans il y’aura `schema.prisma` également il y’aura un `.env` 

il faut modifier le `.env` avec les information de notre data bases, ici on fait un `issue Tracker` voici ce que j’ai entré dedans en utilisant `mysql` 

```bash
DATABASE_URL="mysql://root:YourPassword$@localhost:3306/issue-tracker"
```

Dans le fichier `schema.prisma` il faut juste changer le `provider` de `dataressource` avec la db que l’on va utilisé ( par défaut c’est `postgresql` )

```bash
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}
```

### MAINTENANT ON CRÉE LE SCHEMA D’UNE TABLE

Dans `schema.prisma`

```java
model issue {
  id Int @id @default(autoincrement())
	title String @db.VarChar(255)
	description String @db.Text
	status Status @default(OPEN)
	createdAt DateTime @default(now())
	updatedAt DateTime @updatedAt
}

enum Status {
	OPEN
	IN_PROGRESS
	CLOSED
}
```

Ici c’est +- comme si on le ferais dans une requête sql je te laisse check la [doc](https://www.prisma.io/docs) si tu a du mal avec ce qui est écrit ici 

Je vais juste revenir sur le `enum` qui permet de dire que cette column ne peut avoir que les 3 valeurs que je lui ai donné.

---

On peut aussi formatter le code  pour qu’il sois plus lisible avec 

```java
npx prisma format
```

Résultat

```java
model issue {
  id          Int      @id @default(autoincrement())
  title       String   @db.VarChar(255)
  description String   @db.Text
  status      Status   @default(OPEN)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

### MAINTENANT QUE TOUT EST BON ON VA `migrate`

Pour ce faire il faut 

```java
npx prisma migrate dev
```

Cela va crée a dossier `migrations`  qui va contenir un fichier sql avec notre table ce qui va permettre d’être bien synchronisé avec la data base vu que notre code va savoir quelle donnée elle attend !

### APRÈS ÇA ON VA CRÉE UNE REQUÊTE

Pour ça dans `app` on crée un dossier `api/issues` ça va contenir le fichier `route.ts` qui contient notre requête 

### ALORS COMMENT ON FAIT ?

On commence par les imports que l’on va avoir besoin

```tsx
npm install zod
```

```tsx
import { NextRequest, NextResponse } from "next/server";
// Zod is a TypeScript-first schema declaration and validation library.
import { z } from 'zod';
// for db interaction
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
```

Après l’on va mettre des règle sur le format de réponse que l’on attend avec `zod`

```tsx
// format de rule for the body request
const createIssueSchema = z.object({
    title: z.string().min(1).max(255),
    description: z.string().min(1)
});
```

Et puis on construit notre requête

```tsx
// create a post function
export async function POST(request: NextRequest) {
    // get the body
    const body = await request.json();
    // verify if the body are good
    const validation = createIssueSchema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json(validation.error.errors, { status: 400 });
    }
    // send the information to the database prisma.table.action({data: {}})
    const newIssue = await prisma.issue.create({
        data: { title: body.title, description: body.description },
    });
    // send the response and status
    return NextResponse.json(newIssue, { status: 201 });
}
```

Et voilà :)