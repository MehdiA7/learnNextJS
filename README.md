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