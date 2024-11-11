---
type: text
title: První routing s React router
description: Knihovna je nainstalovaná, pojďme na nějaké první naše routování a vytvoříme si nějaké naše první cesty.
cover: "@/assets/images/react-routing.webp"
badges:
  - 7 min
  - text
---

## Co je našim cílem

Náš cíl bude vytvořit dvě komponenty, kdy každá se bude vykresovat na jiné adrese. Nesnažíme se tedy nic složitého,
jen si vyzkoušet vůbec ten princip, kterým směrování v aplikaci vytváříme.

## Prekvizity

Abychom se více zabývali routingem a ne psaním komponent v Reactu tak budu předpokládat, že máte nějaké dvě komponenty,
které jste si vytvořili a chcete každou z nich dostat na jinou adresu. Dejme tomu, že tedy v projektu máte komponentu
`<Homepage />` a `<Preferences />`. Jednu chceme, aby byla to první, co uvidí uživatel, tedy na adrese `/` a druhou
na adrese `/preferences`.

## Vytvoření routeru

Abychom mohli začít vytvářet jednu cestu za druhou, musíme si zadefinovat router, který za nás odvede všechnu tu
složitou práci. Je to vlastně taková konfigurace a struktura naší aplikace. Takže skočme do souboru `index.tsx` a
vytvoříme zde proměnnou `router` do které si uložíme celý náš vybudovaný systém směrování. Komponentu `<App />` poté
nahradíme za komponentu <ReactProvider />, která dostane jako props náš router.

```tsx
/* imports and other stuff */

const router = createBroswerRouter([]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
```

## Zadefinování prvních cest

Super! Máme vytvořený náš router. Teď už je to všechno jednoduché. Stačí vždycky přidat cestu a k ní odpovídající
komponentu, která se má renderovat. Takže něco takového:

```tsx
const router = createBroswerRouter([
  {
    path: "/",
    Component: Homepage,
  },
  {
    path: "/preferences",
    Component: Preferences,
  },
]);
```

Nyní běžte do prohlížeče a měli byste na adrese `localhost:5173` vidět vaši componentu `Homepage` a na adrese
`localhost:5173/preferences` by se měla zobrazit Vaše komponenta `Preferences`.

Nic těžkého a máme první routing. No v příští kapitole si to jen o trochu zesložitíme. Čekají nás totiž zanořované
směrování a dynamické prvky adresy.
