---
type: text
title: Dynamické cesty
description: Poslední taková důležitá část routingu jsou dynamické adresy. Bez nich se nedá vystavět skoro žádná
  aplikace.
cover: "/assets/images/react-routing.webp"
badges:
  - 7 min
  - text
---

## Co je našim cílem

Představme si, že chceme mít stránku produktů a po poté stránku konkrétního produktu. Asi nejvíce jednoduché řešení
je udělat cestu `/products` a pro konkrétní product například `/products/351`. Číslo 351 je například ID produktu
v databázi. Ovšem pokud nechcete všem konkurentům sdělovat, kolik zboží celkem máte, je také možnost použít GUID v
databázi. Případně si také můžete psát nějaké kódy k produktům, které jsou unikátní v DB, ale zároveň se dají dobře
zobrazit v URL adrese. Například `/products/gray-coffee-mug` zní skoro i lépe než 351 a více to ukáže v URL adrese,
kam se asi bude uživatel proklikávat.

## Prekvizity

Předpokládejme, že máme komponentu `<ProductList />`, která renderuje všechny produkty, které máme. Druhá komponenta je
`<ProductDetail />`, která má zobrazit detail produktu. Naším cílem je tedy sdělit komponentě, která se stará o detail
produktu, jakou položku si má z DB vyžádat.

## Dynamická cesta

První zastávka je určitě v našem routeru. Bude vypadat nějak takto:

```tsx
const router = createBroswerRouter([
  /* ostatní cesty */
  {
    path: "/products",
    Component: ProductsLayout,
    children: [
      {
        index: true,
        Component: ProductList,
      },
      {
        path: ":productId",
        Component: ProductDetail,
      },
    ],
  },
]);
```

Máme tedy nějaký obecný layout, co nám řeší jak vypadají stránky s produkty. Na `/products` tak se zobrazí indexová
stránka `<ProductList />` a pokud bude cokoli za `/products/:productId` tak se zobrazí náš detail. Tady máme
vše hotové, teď už jen jak se dostat k té hodnotě.

## Přístup k parametrům z dynamické adresy

V detailu produktu můžeme použít hodnotu v dynamické adrese přes `useParams`, což je hook, který si importujeme z
`react-router-dom`. Ovšem pozor. Bohužel knihovna nemá až takovou typovou bezpečnost, takže musíme kontrolovat
undefined a hlavně pokud zavoláte na backend požadavek pro položku s daným ID tak určitě zde dobře kontrolujte,
pokud Vám z BE přijde chyba, že produkt neexistuje. Zde se Vám to bude dít velmi běžně.

```tsx
/* imports and other stuff */

const ProductDetail: FC<{}> = () => {
  const { productId } = useParams();

  return <> {/* nějaké vypsání detailu produktu */} </>;
};
```

## Záver k dynamickým adresám

Bez dynamických adresy bychom se daleko neodstali a určitě je v aplikaci budete používat velmi často. Dejte si
pozor na možné `undefined` hodnoty, které Vám vrátí hook a dejte pozor jaké identifikátory dáváte do URL.
