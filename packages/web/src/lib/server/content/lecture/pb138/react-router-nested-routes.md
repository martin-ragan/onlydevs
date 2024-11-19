---
type: text
title: Zanořené cesty v React Routeru
description: Asi si umíme představit, že přístup co jsme se naučili v předchozí kapitole je super jednoduchý,
  ale nechce se nám pořád načítat celá stránka. Zkusíme si tedy nějakou práci se zanořenými cestami.
cover: "/assets/images/react-routing.webp"
badges:
  - 7 min
  - text
---

## Co je našim cílem

Nyní jsme vytvořili dvě oddělené stránky, mezi kterými můžeme překlikávat. Co když ale máme stránku, kde nahoře
je nějaký navigační prvek a ve zbytku stránky se mění obsah podle cesty. Mohli bychom udělat pro každou stránku
nahoře navigační komponentu, ale to nezní úplně jako SPA přístup a také je to pěkně otravné.

Zkusme tedy jiný přístup, který bude mnohem přívětivější na programování.

## Prekvizity

Budeme vycházet z předchozí kapitoly, kde už máme nadefinované základní směrování. Kromě toho si však rozepišme,
jak vypadá naše komponenta `<Preferences />` z minulé lekce. Dejme tomu, že vypadá nějak takto:

```tsx
/* imports and other stuff */

const Preferences: FC<{}> = () => {
  return (
    <div>
      <p>Hello world from Preferences</p> {/* toto mohou být třeba záložky, tedy chceme je vidět pořád */}
      {/* tady chceme zobrazit komponenty, které souvisí se stránkou Preferences */}
    </div>
  );
};

export default Preferences;
```

## Outlet

V prvním kroku jednoduše vyřešíme v komponentě `Preferences` co se zde má vyrenderovat podle určité cesty. Protože
tato naše komponenta neví, jaká cesta je aktivní a co má tedy zobrazit, necháme to na našem routeru. Ten má všechny
potřebné informace a rozhodne za nás, co zde bude za komponentu. Řešení je tedy:

```tsx
/* imports and other stuff */

const Preferences: FC<{}> = () => {
  return (
    <div>
      <p>Hello world from Preferences</p>
      <Outlet /> {/* toto si improtujeme z react-router-dom */}
    </div>
  );
};

export default Preferences;
```

No a v této komponentě máme hotovo. V rámci komponenty `<Outlet />` nám náš router bude renderovat to, co bude zrovna
aktivní.

## Definování zanořených cest

Nyní, už stačí jen udělat definici v routeru, abychom vytvořili strukturu cest, kterou chceme. Může to vypadat nějak
takto:

```tsx
const router = createBroswerRouter([
  { /* definition of the Homepage route */ },
  {
    path: "/preferences",
    Component: Preferences,
    children: [
        {
            path: "user",
            Component: UserPreferences
        }
        {
            path: "admin",
            Component: AdminPreferences
        }
    ]
  },
]);
```

No a máme hotovo. Nyní zkuste stránky jako `/preferences/user` nebo `/preferences/admin` a uvidíte nejen text
`Hello world from Preferences`, ale pod ním budou i vaše komponenty. Konkrétně `UserPreferences` nebo
`AdminPreferences`.

## Index route

Zdá se, že je vyhráno, ale zkusme schválně cestu `/preferences`. Co se Vám vyrenderuje v prohlížeči. Nejspíše nic.
Je to tím, že v Outlet nenašel žádnou cestu, která souhlasí s tím co je zadané v adresném řádku, takže nevypíše nic.

Co když chceme dát pro tuto defaultní stránku nějakou speciální komponentu? Co když chceme redirektovat uživatele
v takovém případě na nějakou konkrétní podstránku? No i s takovým případem počítali tvůrci knihovny a řešením je
použití atributu index:

```tsx
const router = createBroswerRouter([
  { /* definition of the Homepage route */ },
  {
    path: "/preferences",
    Component: Preferences,
    children: [
        {
            index: true,
            element: <Navigate to="user"/> {/* importovaná komponenta z react-router-dom */}
        },
        {
            path: "user",
            Component: UserPreferences
        }
        {
            path: "admin",
            Component: AdminPreferences
        }
    ]
  },
]);
```

Použitím index route můžeme například jako v tomto případě vykreslit komponentu `Navigate`, která redirektuje
uživatele na správnou podstránku. Místo `Navigate` může být klidně naše komponenta, která se vykreslí právě, když
bude cesta pouze `/preferences`.

Skvělé. Nyní umíme nejen definovat cesty, ale vytvářet celé struktury cest, které se sami budou vykreslovat a my
nemusíme řešit žádné složité logiky.
