---
type: text
title: Odkazy v React router
description: S klasickým `<a>` byste se moc daleko v React routeru nedostali. Na odkazování v aplikaci má React
  router vlastní komponenty, které přímo komunikují s jeho interním stavem.
cover: "@/assets/images/react-routing.webp"
badges:
  - 3 min
  - text
---

## Co je našim cílem

Pokud byste v rámci aplikace použili `<a href="/preferences">`, řeknete tím prohlížeči, aby šel na server a tam našel
soubor `preferences`. Pokud tam bude tak ho má nějak zpracovat a ukázat. To je super v například SSR, nebo u klasických
webových stránek. Nicméně my máme všechny data už stažené. Náš odkaz musí jen React routeru říct, že uživatel chce jít
na nějakou podstránku a Router se už postará o vyrenderování správné komponenty a změnu URL adresy.

## Link vs. Navlink

Pro linkování v React routeru najdeme dvě komponenty. Link, který funguje na běžné přesměrování na jinou podstránku a
Navlink, který je obohacený o nějaké stavy jak `isActive`, pro lepší vizuální indikaci, že uživatel je právě na adrese
daného linku. Tedy Navlink chceme používat například v Navbaru, Menu a podobně. Link můžeme použít kdekoli jinde,
kde tato indikace není potřeba.

## Použití komponenty Link

Níže je uvedený kus kódu, který na příkladu ukazuje přesměrování na podstránku `preferences`.

```tsx
/* imports and other stuff */

const Page: FC<PageProps> = (props) => {
  return (
    <>
      <Link to="/preferences" />
    </>
  );
};
```

Link má nicméně ještě jednu zajímavou props a to je `replace`. Pokud byste dali Linku právě tuto props, tak React
router nepřidá toto přesměrování na zásobník navštívených podstránek v prohlížeči. Pokud by uživatel klikl v prohlížeči
"Zpět na předchozí stránku", tak by stránku, ze které se proklikával nenašel. Vlastně to udělá nahrazení původní stránky
za tu, kam se chceme dostat a tím pádem nejde na předchozí stránku použít "Zpět".

## Použití komponenty Navlink

Navlink má možnost použít v `className` funkci, která díky parametru `isActive` může vrátit různé třídy, které vizuálně
oddělí aktuálně navštívený prvek v navigaci.

```tsx
/* imports and other stuff */

const Navlink: FC<Navlink> = (props) => {
  return (
    <nav>
      <NavLink
        to="/preferences"
        className={({ isActive }) => (isActive ? "/* active styles */" : "/* common styles */")}
      />
    </nav>
  );
};
```

Díky tomu tak je psaní Navbarů, případně nějakých Menu velmi jednoduché a vývojářsky přívětivé.
