---
type: text
title: Úvod do client-side směrování
description: Řešení směrování u SPA aplikací a také jeho výhody a nevýhody.
cover: "@/assets/images/react-routing.webp"
badges:
  - 5 min
  - text
  - úvod
---

## Jak mohu používat u SPA aplikací navigaci v adresném řádku?

Určitě si někdo z Vás všiml, že pokud se psaly doteď nějaké jednostránkové webové aplikace, tak jsme
nepoužívali žádné odkazy a adresný řádek prohlížeče. Pojďme se tedy pustit do této sekce, kde si probereme
vše k této problematice.

## Routing a jeho využití

Pokud děláme SSR aplikaci tak jsme do routingu nuceni a bez něj by se nám aplikace budovala velmi špatně.
U SPA aplikací je to pojem, který hodně vývojářů uslyší později, než by měli, případně to berou jako nějaký
nadstanrad a nepřistupují k němu se správnou dávkou důležitosti.

U SSR aplikací nás k použití různých cest za doménou směruje přímo framwork, který používáme, nebo je řešený
složkovou strukturou. Složka, v takovém případě, odpovídá vždy jednomu segmentu mezi lomítky. Routing na straně
serveru je první věc se kterou se potkáte u SSR aplikace, nebo psaní nějakého backendu. Nicméně jak je to
routingem na straně klienta?

Routing na straně klienta je důležitý nejen z uživatelského pohledu, ale i z pohledu vývojáře.

Představte si, že píšete aplikaci, která již potřebuje mít několik stránek, případně záložky. Potřebujete
tím pádem skrývat velké komponenty podle toho, kde je uživatel v zakliknutý v menu. Ano, šlo by to vyřešit
nějakým voláním `useState`, který by se nastavoval kliknutím v menu a poté v podmínce vrátit zpět komponentu,
která odpovídá aktuálnímu stavu. Nicméně umíte si představit, že řešit něco takového ve velké aplikaci musí
být zážitek a to ne zrovna v pozitivním smyslu.

Pokud Vás nepřesvědčil pohled vývojáře tak si představte pohled uživatele. Řeknu kolegovi: "Hele pošlu
ti okaz do aplikace, tak se koukni do té tabulky co tam je.", nicméně potom co pošlu odkaz tak se kolegovi zobrazí
pouze homepage, protože v adrese `example.com/` není moc prostoru, kde si předat nějaké informace, do jaké
části aplikace skočit.

Cílem směrování není jen rozdělit naši aplikaci z pohledu vývoje na celky a nechat management těchto
celků na nějaké externí knihovně. Také chceme udělat aplikaci více uživatelsky přívětivou. Snažíme se tedy
vždy reflektovat stav URL adresy v rámci aplikace, aby po otevření na určité URL adrese vypadala vždy stejně.

## Ukázky

Zkusme si tedy představit jak to může vypadat:

- `https://userman.app` X `https://userman.app/users`
- `https://userman.app` X `https://userman.app/product/3205`
- `https://userman.app` X `https://userman.app/products&filter=price~gt~400`
- `https://userman.app` X `https://userman.app/preferences`

Kdy si není pochyb o tom, že druhá varianta s routováním v rámci aplikace je určitě mnohem lepší.

## Závěr

V projektech může být routing hodně podceňovaný a v mnoha případech to velmi sníží použitelnost aplikace. Dá se přitom
s dobrou knihovnou a několika radami zvládnou hravě a není vůbec náročný. Právě knihovny, tipy a triky si probereme
v této kapitole.
