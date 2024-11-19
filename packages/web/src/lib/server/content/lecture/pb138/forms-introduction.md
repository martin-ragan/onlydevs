---
type: text
title: Úvod do formulářů
description: Formuláře jsou klíčovým prvkem skoro každé aplikace a existuje mnoho možností, jak je v Reactu
  řešit. Pojďme se podívat co si vůbec pod formuláři představit.
cover: "/assets/images/react-forms.webp"
badges:
  - 4 min
  - installation
---

## Co je naším cílem

Formuláře mají za úkol typicky předat nějaká data na server. Tedy ať už je to vyhledávání, kdy pošleme jeden string,
který mi něco vrátí, nebo je to založení entity, kdy pošlu komplexní datovou strukturu. V obou případech používáme
nějakým způsobem formuláře, abychom od uživatele získali informace co máme na server odeslat.

## Základní HTML elementy

Mezi základní elementy v HTML, díky kterým vůbec s formulářemi můžeme pracovat, patří určitě `<form>`, `<input>`,
`label` a `button`. Formulář nám obaluje všechny prvky, do inputů vepisuje uživatel co je potřeba a tlačítko typicky
pro resetování nebo odeslání. Label pomáhá párovat popisky k inputům. To se hodí buď pokud píšeme testy, nebo uživatel
špatně vidí a čtečky webových stránek mu pak umí sdělit co přesně daný input znamená.

## Jak fungovaly dříve formuláře

Dříve fomulář vypadal nějak takto:

```html
<form method="post" action="/registration">
  <label for="name-input">Name</label>
  <input id="name-input" name="name" />

  <label for="email-input">Email</label>
  <input id="email-input" name="email" />

  <button type="submit">Submit</button>
</form>
```

Pokud bychom kliknuli v tomto čistém HTML na "Odeslat", pak se všechny inputy z formuláře posbírali do datové struktury
`FormData`, což si v jednoduchosti můžeme představit jako strukturu klíč a hodnota. Klíčem je vždy `name` atribut u
inputu a hodnotou je hodnota konkrétního inputu. Takto zabalený formulář se pošle v `body` na server specifikovanou
metodou a na adresu definovanou v atributech formuláře.

To zní super jednoduše, ale například řešení validací bylo relativně komplikované. Museli jste vrátit uživateli ten
samý formulář s chybovými výpisy nebo například po úspěšném odeslání redirektovat na jiné části aplikace přes hlavičky
v HTTP dotazu.

## Jak vypadá formulář v Reactu

Úplně jednododuchý formulář by mohl vypadat takto:

```tsx
/* imports and other stuff */

const DummyForm: FC<Navlink> = (props) => {
  return (
    <form method="post" action="/registration">
      <label htmlFor="name-input">Name</label>
      <input id="name-input" name="name" />

      <label htmlFor="email-input">Email</label>
      <input id="email-input" name="email" />

      <button type="submit">Submit</button>
    </form>
  );
};
```

No a my si ukážeme, jak postupně předělat tento formulář v HTML na více moderní SPA formulář.
