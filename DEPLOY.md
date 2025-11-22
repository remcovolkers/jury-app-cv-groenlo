# Deployment Guide

De makkelijkste manier om je app online te zetten is via **Vercel** of **Netlify**. Beide zijn gratis voor hobby-projecten en werken direct samen met je GitHub repository.

## Optie 1: Vercel (Aanbevolen voor React)

Vercel is gemaakt door de makers van Next.js en werkt perfect met React apps.

1.  Ga naar [vercel.com](https://vercel.com) en maak een account aan (kies "Continue with GitHub").
2.  Klik op **"Add New..."** -> **"Project"**.
3.  Kies bij "Import Git Repository" voor je **jury-app-cv-groenlo** repository en klik op **Import**.
4.  Vercel herkent automatisch dat het een Create React App is.
5.  Klik op **Deploy**.

Binnen 1-2 minuten is je app live op een URL zoals `https://jury-app-cv-groenlo.vercel.app`.
Elke keer als je een wijziging naar GitHub pusht, wordt de site automatisch bijgewerkt.

## Optie 2: Netlify

Netlify is een uitstekend alternatief.

1.  Ga naar [netlify.com](https://www.netlify.com) en log in met GitHub.
2.  Klik op **"Add new site"** -> **"Import an existing project"**.
3.  Kies **GitHub**.
4.  Selecteer je repository.
5.  Klik op **Deploy site**.

## Belangrijk voor PWA (Offline Gebruik)

Omdat je app een Progressive Web App (PWA) is, moet hij via **HTTPS** draaien om de Service Worker te laten werken. Zowel Vercel als Netlify regelen dit automatisch voor je (je krijgt een veilig slotje in de browser).
