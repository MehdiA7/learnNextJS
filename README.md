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

---

# ROUTING `/`

Alors c’est terriblement simple 

![routeStructures](./readmeAssets/routeStructures.png)

Voici le dossier `app` dedans on peut voir que il y’a plusieurs pages mais elle ne sont pas au même endroit, la page a la racine de `app` est le `/` et puis l’on vois le dossier `users` qui contient lui aussi une page, ce sera donc `/users` et si l’on va dans le dossier `new` pour affiché la page il faudra aller sur `users/new` et ainsi de suite… C’est le routing dans `next` !

## COMMENT ON FAIT DES ROUTE PERSONNALISÉ ? `page/id`

Pour ça il faut simplement crée un dosser avec des `[]` et ce que l’on attend dedans, par exemple si j’ai une page `issue` que je veux trouver une élément avec un `id` je crée un dossier `[id]` et a l’intérieur je suis la même structure que les autres route, juste avec un `props` `params` je vais pouvoir récupéré l’ ``id`` !

---

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
### Comment savoir si notre page est rendu coté client ?

C'est assez simple, si vous faite appel a des hooks `React` il doit être rendu de coté `client` par exemple le `useState();` 
La manière la plus simple de le voir c'est de mettre son component coté client quans votre site crash avec l'erreur en question.

---

# IL SE PASSE QUOI QUAND ON `FETCH` ?

( Tout ce qui est la ne se vois pas en développement les changements apparaissent uniquement au moment du build )

Par défaut en `SSR` Next va stocker dans le cache toute les infos du component par défaut si il y’a un `fetch`.

Pour palier a ça il faut ajouté un argument au `fetch` 

```tsx
  const res = await fetch('https://jsonplaceholder.typicode.com/users', { cache: 'no-store' });
```

Ici on vois que j’ai mis `{ cache: 'no-store' }` comme argument et il sert a dire que il ne faut pas stocker des infos dans le cache mais les rerendre a chaque `rendu` ! Ce qui peut être particulièrement utile quand on veut rendre des choses en temps réel.

---

# GERER LES DB AVEC `PRISMA`

Pour installer `prisma` il faut 

```bash
npm install prisma
npx prisma init
```
Également sur `VS CODE` vous pouvez installer l'extension `Prisma` pour avoir la coloration syntaxique 

Un dossier `prisma` va être crée et dedans il y’aura `schema.prisma` également il y’aura un `.env` 

il faut modifier le `.env` avec les information de notre data bases, ici on fait un `issue Tracker` voici ce que j’ai entré dedans en utilisant `mysql` 

```bash
DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE"
```

Dans le fichier `schema.prisma` il faut juste changer le `provider` de `dataressource` avec la db que l’on va utilisé ( par défaut c’est `postgresql` )

```bash
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}
```

## MAINTENANT ON CRÉE LE SCHEMA D’UNE TABLE

Dans `schema.prisma`

```java
model issue {
  id Int @id @default(autoincrement())
	title String @db.Char(255)
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

## MAINTENANT QUE TOUT EST BON ON VA `migrate`

Pour ce faire il faut 

```java
npx prisma migrate dev
```

Cela va crée a dossier `migrations`  qui va contenir un fichier sql avec notre table ce qui va permettre d’être bien synchronisé avec la data base vu que notre code va savoir quelle donnée elle attend !

### APRÈS ÇA ON VA CRÉE UNE REQUÊTE

Pour ça dans `app` on crée un dossier `api/issues` ça va contenir le fichier `route.ts` qui contient notre requête 

## ALORS COMMENT ON FAIT ?

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

---

# CONFIGURER `RADIX-UI`

Pour commencer c’est quoi `radix-ui` ? 

Radix UI est une bibliothèque de composants UI basés sur React, conçue pour être accessible, personnalisable et non-stylisée par défaut. Elle fournit des composants basiques et avancés comme des modals, des menus déroulants, des onglets, des popovers, etc., tout en respectant les bonnes pratiques d’accessibilité (ARIA).

## COMMENT ON INSTALLE ÇA ?

[Official Tutorial](https://www.radix-ui.com/themes/docs/overview/getting-started)

```tsx
npm install @radix-ui/themes
```

Ouvrez votre `layout.tsx` et importer `Theme`

```tsx
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
```

Dans le `return` vous pourriez maintenant mettre la balise `<Theme>` dans votre `<body>`

```tsx
    return (
        <html lang="en">
            <body>
                <Theme>
                    <NavBar />
                    <main>{children}</main>
                </Theme>
            </body>
        </html>
    );
```

Et maintenant vous pourriez utiliser les components de rudix directement dans votre code voici un exemple dans une `page.tsx` avec un `Button`

```tsx
import { Button } from "@radix-ui/themes";

const IssuesPage = () => {
    return (
        <div>
            <h1>Issues Page</h1>
            <Button>Add Issues</Button>
        </div>
    );
};
```

Hésitez pas a en apprendre plus sur [le site de radix](https://www.radix-ui.com/) et a selectionner ce que vous voulez importer dans la [doc officiel](https://www.radix-ui.com/themes/docs/components/button)

## CE QUI FAIT LA FORCE DE `RADIX` C’EST LE `PANEL`

Retournon sur `layout.tsx` et faison une modif dans la balise `<Theme>`

```tsx
<Theme>
    <NavBar />
    <main className="p-5">{children}</main>
    <ThemePanel />
</Theme>
```

J’ai ajouté `<ThemePanel />` et cela va nous permettre de personaliser notre thème 

![themePersonalisations](./readmeAssets/themePersonalisations.png)

Quand c’est fait il suffit de cliquer sur `Copy Theme` et de remplacer la première balise `Theme` et bien évidemment de retirer `<ThemePanel/>`

```tsx
<Theme accentColor="green">
    <NavBar />
    <main className="p-5">{children}</main>
</Theme>
```
---

# AJOUTER UN `MARKDOWN EDITOR`

Pour ça on va utiliser [**React SimpleMDE](https://www.npmjs.com/package/react-simplemde-editor)

/!\ oubliez pas de passer votre component en `'use client';` /!\

```tsx
npm install --save react-simplemde-editor easymde
```

Ensuite dans la page ou vous vouliez intégré le mdEditor

```tsx
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
```

Maitenant vous pouvez utiliser la balise qui vous permettera d’avoir votre `éditeur` !

```tsx
<SimpleMDE />
```

![image.png](./readmeAssets/mdDemonstration.png)

Pour plus de personalisation, [Lisez la doc !](https://www.npmjs.com/package/react-simplemde-editor)

---

# UTILISER `REACT HOOK FORM`

[La doc](https://react-hook-form.com/get-started)

Alors c’est très simple et a la fois compliqué…

`react hook form` va simplifié l’envoi de requête vers la db en formant directement un objet via les formulaires. 

voici un exemple simple 

```tsx
'use client';
import { useForm } from "react-hook-form";

type formInput = {
    name: string;
    country: string;
};

const FormComponent = () => {
    const { register, handleSubmit } = useForm<formInput>();
    return (
        <form className="space-y-5" onSubmit={handleSubmit((data) => console.log(data))}>
            <input type="text" placeholder="Your Name" {...register("name")} />
            <input type="text" placeholder="Your Country" {...register("country")} />
            <br />
            <button>Submit</button>
        </form>
    );
};
// exemple du log { name: "Mehdi", country: "Belgique" }\
export default FormComponent;
```

On crée donc `register` pour y stocker les valeurs que l’on veut `exporter sous forme d'objet` 

`register` permet uniquement de récupéré les valeurs d’une balise html, pour les components il faut utiliser le `Controller`

Maintenant voici un exemple avec plus de complexité car l’on fait appel a un component personnalisé externe

```tsx
"use client";
import React from "react";
import { Button, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";

type issueForm = {
    title: string;
    description: string;
};

const NewIssuePage = () => {
    const { register, control, handleSubmit } = useForm<issueForm>();

    return (
        <form
            className="max-w-xl space-y-3"
            onSubmit={handleSubmit((data) => console.log(data))}
        >
            <TextField.Root // élément html radix ui 
                placeholder="title"
                {...register("title")}
            ></TextField.Root>
            <Controller
                name="description"  // Le nom du champ dans votre formulaire
                control={control}   // L'objet control de useForm
                render={({ field }) => ( // Une fonction qui reçoit les props à passer au composant
                    <SimpleMDE placeholder="Description" {...field} /> // component personalisé 
                )}
            />
            <Button>Submit New Issue</Button>
        </form>
    );
};

export default NewIssuePage;
```

Que fait le `Controller` ? Il a va contrôler le component pour en extraire la valeurs qu’il retourne dans `field`  

Le `{...field}` transmet automatiquement :

- value (la valeur actuelle)
- onChange (fonction pour mettre à jour la valeur)
- onBlur (pour marquer le champ comme "touché")
- ref (référence au composant)
- name (nom du champ)
Le problème avec SimpleMDE est qu'il n'est pas un élément HTML standard - c'est un composant React complexe qui gère son propre état interne. Le `register` fonctionne en attachant directement des événements comme onChange, onBlur, etc. à des éléments DOM, mais SimpleMDE ne s'interface pas de cette façon.

Voici pourquoi vous devez utiliser Controller :

1. Le Controller agit comme un "adaptateur" entre react-hook-form et les composants tiers
2. Il prend le contrôle du composant et synchronise son état avec react-hook-form
3. Pour SimpleMDE, il transmet toutes les props nécessaires via l'objet "field" dans la fonction render

Ce qui fait que grâce au Controller on est pas limité que par des élément `html` !

---

# GÉRER LES ERREURS AVEC `zod` ET `react-hook-form`

La gestion d’erreur peut être parfois fastidieuse et complexe quand on a beaucoup de condition…

Avec `zod` et `react-hook-form` on va pouvoir gérer ça proprement et en directe !

Pour ça il faut les dépendances [zod](https://zod.dev/?id=installation) et [hookform resolvers](https://www.npmjs.com/package/@hookform/resolvers/v/1.3.7)

```tsx
npm install @hookform/resolvers
npm install zod
```

Maintenant que c’est fait l’on peut crée un fichier a la racine de `app` pour mettre tout nos condition de gestion d’erreur perso je l’ai appelé `validationSchema.ts` et voici pour le formulaire que vous aviez pu voir avant ce que j’ai fait comme schéma et import 

```tsx
// Zod is a TypeScript-first schema declaration and validation library.
import { z } from "zod";

const createIssueSchema = z.object({
    title: z.string().min(1, "Title is required !").max(255),
    description: z.string().min(1, "Description is required !"),
});

export default createIssueSchema;
```

L’avantage de `zod` c’est que c’est assez simple et claire de comprendre la syntaxe a utiliser !

Maintenant que le schémas est crée on va aller dans le fichier ou le `form` se trouve.

Voici les imports a faire 

```tsx
// Form error checker
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
// Schema for checker
import createIssueSchema from "@/app/validationSchemas";
```

Avec le schéma que l’on vient de faire on peut aussi `type` nos éléments pour éviter la répétition

```tsx
type issueForm = z.infer<typeof createIssueSchema>;
```

Après ça l’on va devoir ajouté des arguments a notre `useForm` 

```tsx
const { register, control, handleSubmit, formState: {errors} } = useForm<issueForm>({
    resolver: zodResolver(createIssueSchema)
});
```

On ajoute donc `fromState: {errors}` qui permet de simplement de récupéré les informations des forms pour les gérés faite un `ctrl+espace` quand vous ouvrez les `{}` vous allez voir les possibilité qu’il offre !

Après ça on passe en argument a `useForm` un objet avec le `resolver` et le schéma que l’on veut utiliser.

Quand tout cela est fait on peut l’écrire dans notre `jsx`

```tsx
{errors.title && <Text color="red" as="p">{errors.title.message}</Text>}
```

Ce snippet veut simplement dire que si il y’a une erreur sur `title` affiche moi le message d’erreur correspondant

( la balise `<Text>` viens de [Radix-Ui](https://www.radix-ui.com/) )

Et voilà ! On a maintenant une gestion d’erreur en béton coté Client !

---

# COMMENT FAIRE UN BEAU `CHARGEMENT` FACILEMENT ?

![image.png](./readmeAssets/submitButtonLoading.png)

Voici une ressource précieuse pour trouver [facilement des components modifiable](https://tw-elements.com/docs/standard/components/spinners/)

 Ici je vais prendre le basic

```tsx
<div
  class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
  role="status">
  <span
    class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
    >Loading...</span
  >
</div>
```

Il faut juste modifier les `class=` par `className` et vous aviez votre loading il peut être bien évidemment modifier via `tailwindcss`

Maintenant on le met dans un composant et peut l’importer dans notre boutton et on va gérer l’affichage avec un `useState` 

```tsx
<Button disabled={isSubmit}>Submit New Issue{!isSubmit && <Spinner/>}</Button>
```

Comme vous pouvez le voir j’ai mis un disabled quand `isSubmit` est `true` comme ça l’utilisateur peux cliqué qu’une seule fois sur le boutton et évite l’envoi de 2 requêtes
