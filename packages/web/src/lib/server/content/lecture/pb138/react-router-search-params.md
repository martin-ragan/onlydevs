---
type: text
title: React router search params
description: Poslední část z routingu je možná trochu více pokročilá, ale i tak by ji měl ovládat každý. Jedná
  se o použití Search parametrů.
cover: "/assets/images/react-routing.webp"
badges:
  - 4 min
  - text
---

## Co je našim cílem

Představme si nějakou stránku s výpisem článků. Chtěli bychom udělat u každého článku akci, na kterou když klikne
uživatel, tak se mu otevře dialog, ve kterém má možnost dostat se k detailu článku. Nicméně co se stane, pokud by
uživatel chtěl někomu poslat odkaz, na kterém bude právě aktuální detail tak musíme dostat tuto informaci do
adresy.

## Možné přístupy

Asi dvě takové používané varianty jsou buď udělat další část cesty, která podmíněně vyrenderuje dialog, případně
použít URL Seach parametry. Tedy ve výsledku by to mohlo vypadat nějak takto:

Další část cesty:

```
/articles/{id}/detail
```

Search parametry

```
/articles?detail={id}
```

Obě varianty jsou možné, nicméně pojďme se zaměřit na tu druhou. Nejen, protože se díky tomu můžeme naučit něco
nového, ale osobně mi přijde tato varianta o něco lepší pokud se detail zobrazuje v dialogu. Dialogy jsou ze
struktury stránky vždy tak trochu bokem tak ať je to oddělené i zde.

## Jak přistupovat k Search parametrům

Díky `useSearchParams` můžeme přistupovat k Search parametrům. Funguje to trochu jako `useState`, ale není to až tak
přímočaré. `searchParams` zde nejsou jen jako nějaký dummy objekt, ale je to `URLSearchParams` třída, která je
poskytnutá přímo prohlížečem. Více info [zde](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams).

Druhá návratová hodnota `setSearchParams` tak samozřejmě nastaví `searchParams`, ale buď chce na vstupu
třídu `URLSearchParams`, nebo objekt s klíči a hodnotami, co poté transformuje.

Protože toto není uplně jednoduché na spravování. Moje doporučení je udělat si nějaký vlastní hook, který bude řešit
právě nějaké Vaše konkrétní požadavky na práci s search parametry.

```tsx
/* imports and other stuff */

const Articles: FC<PageProps> = (props) => {
  cosnt [searchParams, setSearchParams] = useSearchParams(); /* importované z React router DOM */

  return ( /* výpis článků */ );
};
```

## Ukázka dialogu

Tady je návrh, jak by zhruba mohlo vypadat výše zmíněné řešení dialogu.

Takto bychom podmíněně mohli ukazovat dialog:

```tsx
/* imports and other stuff */

const Articles: FC<PageProps> = (props) => {
  cosnt [searchParams,] = useSearchParams(); /* importované z React router DOM */

  const detailId = searchParams.get("detail");

  return <>{detailId ?? <ArticleDetailDialog id={detailId} />}</>;
};
```

Takto bychom ho mohli otevřít:

```tsx
/* imports and other stuff */

const ArticleCard: FC<PageProps> = (props) => {
  const { id, title, descritpion } = props;

  return (
    <div>
      /* nějaký výpis informací */
      <Link to={{ search: `detail=${id}` }}> Detail </Link>
    </div>
  );
};
```
