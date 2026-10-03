# PetPrieteni

Un magazin demonstrativ pentru produse de animale, construit cu React și Vite.

## Rulare locală

```sh
pnpm install
pnpm dev
```

Pentru o compilare de producție:

```sh
pnpm build
```

## Publicare pe Vercel

Proiectul folosește `pnpm-lock.yaml` și produce site-ul static în `dist/client`. Fișierul `vercel.json` indică directorul pe care Vercel trebuie să îl publice. Conectează repository-ul GitHub la Vercel pentru publicare automată la fiecare actualizare.

## Funcționalități demonstrative

- Căutare și filtrare pe categorii
- Cantități, favorite și coș cu total și cost de livrare
- Formular de checkout cu opțiuni de livrare și plată

Checkout-ul este doar o simulare: nu procesează plăți și nu trimite comenzi sau date personale către un server.
